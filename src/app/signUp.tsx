import { useState } from "react"
import { View, Text, Image, ImageSourcePropType, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import {  User, Mail, Lock, Eye, EyeOff, Phone, Shield } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"

//image Imports
const logo : ImageSourcePropType = require("../assets/images/shield.png");

// JSON Server API URL
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://192.168.1.108:3010";

export default function SignupScreen() {
  //router
  const router = useRouter();
  
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })
  const [submitError, setSubmitError] = useState("")

  // Function to format name (lowercase with first letter capitalized)
  const formatName = (name: string): string => {
    if (!name) return "";
    name = name.trim().toLowerCase();
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Validate and format first name
  const handleFirstNameChange = (text: string) => {
    const trimmedText = text.trim();
    
    if (trimmedText.includes(" ")) {
      setErrors({...errors, firstName: "Please enter only one word for first name"});
    } else {
      setErrors({...errors, firstName: ""});
    }
    
    setFirstName(text);
  }

  // Validate and format last name
  const handleLastNameChange = (text: string) => {
    const trimmedText = text.trim();
    
    if (trimmedText.includes(" ")) {
      setErrors({...errors, lastName: "Please enter only one word for last name"});
    } else {
      setErrors({...errors, lastName: ""});
    }
    
    setLastName(text);
  }

  // Check if email already exists in the database
  const checkEmailExists = async (email: string) => {
    try {
      const response = await fetch(`${API_URL}/users?email=${email}`)
      const data = await response.json()
      return data.length > 0
    } catch (error) {
      console.error("Error checking email:", error)
      return false
    }
  }

  // Check password strength
  const checkPasswordStrength = (pass : string ) => {
    if (!pass) return ""
    
    const hasLength = pass.length >= 6
    const hasLetter = /[a-zA-Z]/.test(pass)
    const hasNumber = /\d/.test(pass)
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)
    
    // Count requirements met
    const requirements = [hasLength, hasLetter, hasNumber, hasSymbol].filter(Boolean).length
    
    if (requirements <= 1) return "weak"
    if (requirements === 2) return "medium"
    if (requirements >= 3) return "strong"
    
    return ""
  }
  
  // Update password strength whenever password changes
  const handlePasswordChange = (pass : string) => {
    setPassword(pass)
    setPasswordStrength(checkPasswordStrength(pass))
  }
  
  // Get color for lock icon based on password strength
  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case "weak": return "#FF6B6B" // red
      case "medium": return "#FFD166" // yellow
      case "strong": return "#06D6A0" // green
      default: return "#9CA3AF" // default gray
    }
  }

  // Validate form fields
  const validateForm = async () => {
    let isValid = true
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    }

    // First name validation
    if (!firstName) {
      newErrors.firstName = "First name is required"
      isValid = false
    } else if (firstName.trim().includes(" ")) {
      newErrors.firstName = "Please enter only one word for first name"
      isValid = false
    }

    // Last name validation
    if (!lastName) {
      newErrors.lastName = "Last name is required"
      isValid = false
    } else if (lastName.trim().includes(" ")) {
      newErrors.lastName = "Please enter only one word for last name"
      isValid = false
    }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    } else if (await checkEmailExists(email)) {
      newErrors.email = "Email already exists"
      isValid = false
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^0\d{9}$/.test(phone)) {
      newErrors.phone = "Phone number must start with 0 and be 10 digits";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    } else if (passwordStrength === "weak") {
      newErrors.password = "Password too weak. Include letters, numbers, and symbols"
      isValid = false
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle signup
  const handleSignup = async () => {
    setSubmitError("")
    setIsLoading(true)
    
    try {
      if (await validateForm()) {
        // Format names before creating user
        const formattedFirstName = formatName(firstName);
        const formattedLastName = formatName(lastName);
        
        // Create new user object according to DB structure
        const newUser = {
          name: `${formattedFirstName} ${formattedLastName}`,
          email: email,
          password: password,
          phone: phone,
          devices: [] // New user has no devices yet
        }
        
        // Post to JSON server
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        })
        
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        
        const data = await response.json()
        console.log("User created:", data)
        
        // Navigate to success screen with user data
        console.log("User created successfully: ", data)
        router.push('/SignUpSuccess') // Navigate to the success screen
      }
    } catch (error) {
      console.error("Error creating user:", error)
      setSubmitError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate progress for the progress bar
  const totalFields = 6 // Updated to include firstName and lastName as separate fields
  const filledFields = [firstName, lastName, email, phone, password, confirmPassword].filter((field) => field).length
  const progress = filledFields / totalFields

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView className="flex-1">
          <View className="p-6">

            {/* Logo placeholder */}
            <View className="items-center mt-6 mb-5">
              <Image
                source={logo}
                style={{ width: 100, height: 100 }} // Adjust size as needed
                resizeMode="contain"
              />
            </View>
              
            
            <View className="items-center">
            {/* Welcome text with requested colors */}
            <Text className="text-green-500 text-3xl font-bold mb-2">Join Us</Text>
            <Text className="text-yellow-400 text-lg mb-8">Create your SafeZone account</Text>
            </View>


            {/* Signup form in a nice container */}
            <View className="bg-gray-800/30 rounded-xl p-6 shadow-lg">
              {/* Progress bar */}
              <View className="h-2 bg-gray-700 rounded-full mb-4">
                <View className="h-2 bg-green-500 rounded-full" style={{ width: `${progress * 100}%` }} />
              </View>
              <Text className="text-gray-400 text-right mb-6">
                {filledFields}/{totalFields} fields completed
              </Text>

              {/* First Name field */}
              <View className="mb-4">
                <Text className="text-white text-lg mb-2">First Name</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <User size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Enter your first name"
                    placeholderTextColor="#9CA3AF"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                    onBlur={() => {
                      if (firstName && !firstName.trim().includes(" ")) {
                        setFirstName(formatName(firstName));
                      }
                    }}
                  />
                </View>
                {errors.firstName ? <Text className="text-red-500 mt-1">{errors.firstName}</Text> : null}
              </View>

              {/* Last Name field */}
              <View className="mb-4">
                <Text className="text-white text-lg mb-2">Last Name</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <User size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Enter your last name"
                    placeholderTextColor="#9CA3AF"
                    value={lastName}
                    onChangeText={handleLastNameChange}
                    onBlur={() => {
                      if (lastName && !lastName.trim().includes(" ")) {
                        setLastName(formatName(lastName));
                      }
                    }}
                  />
                </View>
                {errors.lastName ? <Text className="text-red-500 mt-1">{errors.lastName}</Text> : null}
              </View>

              {/* Email field */}
              <View className="mb-4">
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
                  />
                </View>
                {errors.email ? <Text className="text-red-500 mt-1">{errors.email}</Text> : null}
              </View>

              {/* Phone field */}
              <View className="mb-4">
                <Text className="text-white text-lg mb-2">Phone Number</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <Phone size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#9CA3AF"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
                {errors.phone ? <Text className="text-red-500 mt-1">{errors.phone}</Text> : null}
              </View>

              {/* Password field */}
              <View className="mb-4">
                <Text className="text-white text-lg mb-2">Password</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <Lock size={20} color={getPasswordStrengthColor()} />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Create a password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                  </TouchableOpacity>
                </View>
                {passwordStrength && (
                  <View className="flex-row items-center mt-2">
                    <Text className={`${
                      passwordStrength === "weak" ? "text-red-500" : 
                      passwordStrength === "medium" ? "text-yellow-400" : 
                      "text-green-500"
                    } mr-2`}>
                      Password strength: {passwordStrength}
                    </Text>
                  </View>
                )}
                <View className="mt-2 bg-gray-700 p-4 rounded-lg">
                  <Text className="text-white text-sm">Your password must:</Text>
                  <View className="mt-2">
                    <Text className={`text-sm ${password.length >= 6 ? "text-green-500" : "text-white"}`}>• Be at least 6 characters long</Text>
                    <Text className={`text-sm ${/[a-zA-Z]/.test(password) ? "text-green-500" : "text-white"}`}>• Include at least one letter</Text>
                    <Text className={`text-sm ${/\d/.test(password) ? "text-green-500" : "text-white"}`}>• Include at least one number</Text>
                    <Text className={`text-sm ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "text-green-500" : "text-white"}`}>• Include at least one symbol (e.g., !@#$%)</Text>
                  </View>
                </View>
                {errors.password ? <Text className="text-red-500 mt-1">{errors.password}</Text> : null}
              </View>

              {/* Confirm Password field */}
              <View className="mb-6">
                <Text className="text-white text-lg mb-2">Confirm Password</Text>
                <View className="flex-row items-center border border-gray-600 rounded-lg px-4 py-3 bg-gray-800/30">
                  <Lock size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-white ml-3"
                    placeholder="Confirm your password"
                    placeholderTextColor="#9CA3AF"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} color="#9CA3AF" /> : <Eye size={20} color="#9CA3AF" />}
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword ? <Text className="text-red-500 mt-1">{errors.confirmPassword}</Text> : null}
              </View>

              {/* Signup button */}
              <TouchableOpacity 
                className={`${isLoading ? 'bg-gray-500' : 'bg-green-500'} py-4 rounded-lg`} 
                onPress={handleSignup}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Text>
              </TouchableOpacity>
              
              {/* Error message */}
              {submitError ? (
                <View className="mt-4 bg-red-500/20 p-3 rounded-lg">
                  <Text className="text-red-400 text-center">{submitError}</Text>
                </View>
              ) : null}
            </View>

            {/* Login link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-400">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace('/signIn')}>
                <Text className="text-green-500 font-bold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}