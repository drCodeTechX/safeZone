import { useContext, useEffect } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { CheckCircle } from "lucide-react-native"
import { useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"
import { AuthContext } from "@/context/AuthContext"

export default function LoginSuccessScreen() {
  const navigation = useNavigation()
  const authState = useContext(AuthContext);

  useEffect(() => {
    // Automatically navigate to main app after 2 seconds
    const timer = setTimeout(() => {
      authState.logIn();
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <View className="flex-1 justify-center items-center p-6">
        <CheckCircle size={80} color="#10B981" className="mb-6" />
        <Text className="text-white text-3xl font-bold mb-4 text-center">Login Successful!</Text>
        <Text className="text-gray-400 text-lg mb-8 text-center">
          You have successfully logged in to your SafeZone account
        </Text>
        <ActivityIndicator size="large" color="#10B981" />
        <Text className="text-gray-400 mt-4">Redirecting to dashboard...</Text>
      </View>
    </SafeAreaView>
  )
}
