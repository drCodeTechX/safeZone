import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PlusCircle, Scan } from "lucide-react-native"

export default function AddDeviceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-white text-3xl font-bold mb-6">Add New Device</Text>

          <View className="bg-gray-800/50 p-6 rounded-xl mb-6">
            <Text className="text-white text-xl font-bold mb-4">Connect a Device</Text>
            <Text className="text-gray-400 mb-6">
              Add a new IoT device to your SafeZone network to monitor for potential dangers.
            </Text>

            <TouchableOpacity className="bg-green-500 p-4 rounded-lg flex-row items-center justify-center mb-4">
              <Scan size={24} color="white" className="mr-2" />
              <Text className="text-white font-bold text-lg">Scan QR Code</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border border-green-500 p-4 rounded-lg flex-row items-center justify-center">
              <PlusCircle size={24} color="#10B981" className="mr-2" />
              <Text className="text-green-500 font-bold text-lg">Manual Setup</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-gray-800/50 p-6 rounded-xl">
            <Text className="text-white text-xl font-bold mb-4">Compatible Devices</Text>
            <Text className="text-gray-400">
              SafeZone works with a variety of IoT sensors including smoke detectors, motion sensors, water leak
              detectors, and more.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
