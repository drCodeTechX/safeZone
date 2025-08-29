import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shield, Bell, AlertTriangle, CheckCircle } from "lucide-react-native"
import { authUser } from "@/context/AuthContext"
import { useSystemStatus } from "@/hooks/useSystemStatus"
import SystemStatusCircle from "@/components/SystemStatusCircle"

export default function HomeScreen() {
  const { status, loading, error } = useSystemStatus();
  
  const auth = authUser();
  const user = auth ? auth : null; // Replace 'user' with the correct property name

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Header with user greeting */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-gray-400">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">{user?.name}</Text>
            </View>
            <View className="bg-green-500 p-2 rounded-full">
              <Shield size={24} color="white" />
            </View>
          </View>

          {/* Hero section with status circle */}
          <View className="bg-gray-800/30 rounded-xl overflow-hidden mb-6">
            <SystemStatusCircle isSystemSafe={status.isSystemSafe} />
          </View>

          {/* Status overview */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold mb-4">System Status</Text>
            {loading ? (
              <View className="items-center justify-center p-8">
                <ActivityIndicator size="large" color="#10B981" />
              </View>
            ) : error ? (
              <View className="bg-red-500/20 p-4 rounded-xl">
                <Text className="text-red-400 text-center">{error}</Text>
              </View>
            ) : (
              <View className="bg-gray-800/30 rounded-xl p-5">
                <View className="flex-row justify-between mb-4">
                  <View className="items-center">
                    <Text className="text-green-400 text-2xl font-bold">{status.online}</Text>
                    <Text className="text-gray-400">Online</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-red-400 text-2xl font-bold">{status.offline}</Text>
                    <Text className="text-gray-400">Offline</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-yellow-400 text-2xl font-bold">{status.alerts}</Text>
                    <Text className="text-gray-400">Alerts</Text>
                  </View>
                </View>

                <View className="bg-gray-700/50 h-2 rounded-full w-full mb-2">
                  <View 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(status.online / (status.online + status.offline) * 100)}%` 
                    }} 
                  />
                </View>
                <Text className="text-gray-400 text-right text-xs">
                  {Math.round((status.online / (status.online + status.offline) * 100))}% devices online
                </Text>
              </View>
            )}
          </View>

          {/* Recent activity */}
          <View className="mb-32">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-bold">Recent Activity</Text>
              <TouchableOpacity>
                <Text className="text-green-400">View All</Text>
              </TouchableOpacity>
            </View>

            <View className="space-y-3">
              <View className="bg-gray-800/30 p-4 rounded-lg flex-row items-center">
                <View className="bg-green-500/20 p-2 rounded-full mr-3">
                  <CheckCircle size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Living Room Sensor</Text>
                  <Text className="text-gray-400">Device connected successfully</Text>
                </View>
                <Text className="text-gray-500 text-xs">2h ago</Text>
              </View>

              <View className="bg-gray-800/30 p-4 rounded-lg flex-row items-center">
                <View className="bg-yellow-500/20 p-2 rounded-full mr-3">
                  <Bell size={20} color="#F59E0B" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">System Update</Text>
                  <Text className="text-gray-400">New firmware available for 2 devices</Text>
                </View>
                <Text className="text-gray-500 text-xs">5h ago</Text>
              </View>

              <View className="bg-gray-800/30 p-4 rounded-lg flex-row items-center">
                <View className="bg-red-500/20 p-2 rounded-full mr-3">
                  <AlertTriangle size={20} color="#EF4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-white font-medium">Kitchen Sensor</Text>
                  <Text className="text-gray-400">Device disconnected</Text>
                </View>
                <Text className="text-gray-500 text-xs">1d ago</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
