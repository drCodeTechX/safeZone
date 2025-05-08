"use client"

import { useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CheckCircle } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"

export default function SignupSuccessScreen() {
  const navigation = useNavigation()
  const router = useRouter();

  useEffect(() => {
    // Automatically navigate to main app after 2 seconds
    const timer = setTimeout(() => {
      // navigation.navigate("MainApp" as never)
      router.replace('/(tabs)');
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <View className="flex-1 justify-center items-center p-6">
        <CheckCircle size={80} color="#10B981" className="mb-6" />
        <Text className="text-white text-3xl font-bold mb-4 text-center">Account Created!</Text>
        <Text className="text-gray-400 text-lg mb-8 text-center">
          You have successfully created your SafeZone account
        </Text>
        <ActivityIndicator size="large" color="#10B981" />
        <Text className="text-gray-400 mt-4">Setting up your dashboard...</Text>
      </View>
    </SafeAreaView>
  )
}
