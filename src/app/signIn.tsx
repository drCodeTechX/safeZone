"use client"

import { useState, useContext } from "react"
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ImageSourcePropType, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Mail, Lock, Eye, EyeOff} from "lucide-react-native"
import { useRouter } from "expo-router"
import { AuthContext } from "@/context/AuthContext" 

//Import Images
const logo: ImageSourcePropType = require("../assets/images/shield.png");

// JSON Server API URL
const API_URL = "http://192.168.1.100:3000";

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  //router 
  const router = useRouter();

  //authContext
  const auth = useContext(AuthContext);

  // Validate form fields
  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle login with JSON server
  const handleLogin = async () => {
    if (validateForm()) {
      setIsLoading(true)
      setLoginError("")
      
      try {
        // Query JSON server for the user
        const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`)
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        
        const users = await response.json()

        // Check if user exists and password matches
        const user = users.find((user: { email: string; password: string }) => user.email === email && user.password === password)
        
        if (user) {
          // Set the current user in context
          // setCurrentUser(user)
          auth.logIn(user)

          // navigation.navigate("LoginSuccess" as never)
          
          router.replace('/LoginSuccess');
        } else {
          setLoginError("Invalid email or password")
        }
      } catch (error) {
        console.error("Login error:", error)
        setLoginError("Connection error. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Calculate progress for the progress bar
  const totalFields = 2
  const filledFields = [email, password].filter((field) => field).length
  const progress = filledFields / totalFields

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView className="flex-1">
          <View className="p-6">

            {/* Logo placeholder */}
            <View className="items-center mb-8 mt-6">
              <Image
                source={logo}
                style={{ width: 100, height: 100 }} // Adjust size as needed
                resizeMode="contain"
              />
            </View>

            {/* Welcome text with requested colors */}
            <View className="flex-col items-center mb-2">
              <Text className="text-green-500 text-3xl font-bold mb-2">Welcome</Text>
              <Text className="text-yellow-400 text-lg mb-8">Login to your SafeZone account</Text>
            </View>

            {/* Login form in a nice container */}
            <View className="bg-gray-800/30 rounded-xl p-6 shadow-lg mb-6">
              {/* Progress bar */}
              <View className="h-2 bg-gray-700 rounded-full mb-6">
                <View className="h-2 bg-green-500 rounded-full" style={{ width: `${progress * 100}%` }} />
              </View>

              {/* Login error message */}
              {loginError ? (
                <View className="bg-red-500/20 p-3 rounded-lg mb-4">
                  <Text className="text-red-400 text-center">{loginError}</Text>
                </View>
              ) : null}

              {/* Email field */}
              <View className="mb-6">
                <Text className="text-white text-lg mb-2">Email</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <Mail size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                </View>
                {errors.email ? <Text className="text-red-500 mt-1">{errors.email}</Text> : null}
              </View>

              {/* Password field */}
              <View className="mb-6">
                <Text className="text-white text-lg mb-2">Password</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <Lock size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    editable={!isLoading}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
                    {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                  </TouchableOpacity>
                </View>
                {errors.password ? <Text className="text-red-500 mt-1">{errors.password}</Text> : null}
              </View>

              {/* Login button */}
              <TouchableOpacity 
                className={`${isLoading ? 'bg-gray-500' : 'bg-green-500'} py-4 rounded-lg mb-4`} 
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <View className="flex-row justify-center items-center">
                    <ActivityIndicator color="white" size="small" />
                    <Text className="text-white text-center font-bold text-lg ml-2">Logging in...</Text>
                  </View>
                ) : (
                  <Text className="text-white text-center font-bold text-lg">Login</Text>
                )}
              </TouchableOpacity>

              {/* Forgot password link */}
              <TouchableOpacity className="mb-4" disabled={isLoading}>
                <Text className="text-green-400 text-center">Forgot your password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign up link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/signUp')} disabled={isLoading}>
                <Text className="text-green-500 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* Server info */}
            <View className="mt-8 p-3 bg-gray-800/30 rounded-lg">
              <Text className="text-gray-400 text-xs">Connected to JSON Server at:</Text>
              <Text className="text-green-400 text-xs">{API_URL}</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}