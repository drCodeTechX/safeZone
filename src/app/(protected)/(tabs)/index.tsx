import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shield } from "lucide-react-native"

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          <View className="flex-row items-center mb-6">
            <Shield size={24} color="#10B981" />
            <Text className="text-white text-2xl font-bold ml-2">SafeZone</Text>
          </View>

          <Text className="text-white text-3xl font-bold mb-6">Welcome to SafeZone</Text>

          <View className="bg-gray-800/50 p-6 rounded-lg mb-6">
            <Text className="text-white text-xl font-bold mb-2">All Systems Operational</Text>
            <Text className="text-gray-400">Your IoT devices are connected and monitoring for potential dangers.</Text>
          </View>

          <Text className="text-white text-xl font-bold mb-4">Recent Activity</Text>
          <View className="space-y-4">
            <View className="bg-gray-800/30 p-4 rounded-lg">
              <Text className="text-white font-bold">No recent alerts</Text>
              <Text className="text-gray-400">Your environment is currently safe</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
