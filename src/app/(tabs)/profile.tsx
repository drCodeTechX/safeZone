import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { User, Settings, Bell, HelpCircle, LogOut } from "lucide-react-native"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

export default function ProfileScreen() {
  const authState = useContext(AuthContext);

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-white text-3xl font-bold mb-6">Profile</Text>

          <View className="items-center mb-8">
            <View className="bg-gray-700 p-6 rounded-full mb-4">
              <User size={60} color="white" />
            </View>

            <Text className="text-white text-xl font-bold">User Name</Text>
            <Text className="text-gray-400">user@example.com</Text>
          </View>

          <View className="space-y-4">
            <TouchableOpacity className="flex-row items-center bg-gray-800/50 p-4 rounded-lg">
              <Settings size={24} color="#10B981" className="mr-4" />
              <Text className="text-white text-lg">Account Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-gray-800/50 p-4 rounded-lg">
              <Bell size={24} color="#10B981" className="mr-4" />
              <Text className="text-white text-lg">Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-gray-800/50 p-4 rounded-lg">
              <HelpCircle size={24} color="#10B981" className="mr-4" />
              <Text className="text-white text-lg">Help & Support</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center bg-gray-800/50 p-4 rounded-lg"
              onPress={authState.logOut}
              >
              <LogOut size={24} color="#F43F5E" className="mr-4" />
              <Text className="text-red-400 text-lg">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
