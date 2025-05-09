import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Shield, Bell, AlertTriangle, CheckCircle } from "lucide-react-native"
import { authUser } from "@/context/AuthContext"

export default function HomeScreen() {

  // Mock data for device status
  const deviceStatus = {
    online: 3,
    offline: 1,
    alerts: 0,
  }
  
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

          {/* Hero section with image option */}
          <View className="bg-gray-800/30 rounded-xl overflow-hidden mb-6">
            {/* Option for custom hero image */}
            {/* <Image 
              source={require('../assets/hero-image.jpg')} 
              style={{ width: '100%', height: 150 }} 
              resizeMode="cover"
            /> */}

            {/* Placeholder for hero image */}
            <View className="h-[150px] bg-gray-700/50 items-center justify-center">
              <Text className="text-gray-400">Place for Hero Image</Text>
            </View>

            <View className="p-5">
              <Text className="text-white text-xl font-bold mb-2">SafeZone Security Dashboard</Text>
              <Text className="text-gray-300 mb-4">
                Monitor and manage your IoT security devices from one central location. Get real-time alerts and
                comprehensive analytics.
              </Text>
              <TouchableOpacity className="bg-green-500/20 py-2 px-4 rounded-lg self-start">
                <Text className="text-green-400 font-medium">View Analytics</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Status overview */}
          <View className="mb-6">
            <Text className="text-white text-xl font-bold mb-4">System Status</Text>
            <View className="bg-gray-800/30 rounded-xl p-5">
              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-green-400 text-2xl font-bold">{deviceStatus.online}</Text>
                  <Text className="text-gray-400">Online</Text>
                </View>
                <View className="items-center">
                  <Text className="text-red-400 text-2xl font-bold">{deviceStatus.offline}</Text>
                  <Text className="text-gray-400">Offline</Text>
                </View>
                <View className="items-center">
                  <Text className="text-yellow-400 text-2xl font-bold">{deviceStatus.alerts}</Text>
                  <Text className="text-gray-400">Alerts</Text>
                </View>
              </View>

              <View className="bg-gray-700/50 h-2 rounded-full w-full mb-2">
                <View className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }} />
              </View>
              <Text className="text-gray-400 text-right text-xs">75% devices online</Text>
            </View>
          </View>

          {/* Recent activity */}
          <View className="mb-6">
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

          {/* Quick actions */}
          <View>
            <Text className="text-white text-xl font-bold mb-4">Quick Actions</Text>
            <View className="flex-row flex-wrap justify-between">
              <TouchableOpacity className="bg-gray-800/30 p-4 rounded-lg w-[48%] items-center mb-3">
                <Text className="text-white font-medium">Add Device</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-800/30 p-4 rounded-lg w-[48%] items-center mb-3">
                <Text className="text-white font-medium">Run Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-800/30 p-4 rounded-lg w-[48%] items-center">
                <Text className="text-white font-medium">View Reports</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-800/30 p-4 rounded-lg w-[48%] items-center">
                <Text className="text-white font-medium">Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
