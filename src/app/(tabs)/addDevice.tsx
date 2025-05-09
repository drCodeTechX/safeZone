import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PlusCircle, Scan, Search, Wifi, Bluetooth } from "lucide-react-native"

export default function AddDeviceScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-white text-3xl font-bold mb-6">Add New Device</Text>

          {/* Connection methods */}
          <View className="bg-gray-800/40 p-6 rounded-xl mb-6">
            <Text className="text-white text-xl font-bold mb-4">Connect a Device</Text>
            <Text className="text-gray-300 mb-6">
              Add a new safeZone device to your SafeZone network to monitor for potential dangers.
            </Text>

            <TouchableOpacity className="bg-green-500 p-4 rounded-lg flex-row items-center justify-center mb-4">
              <Scan size={24} color="white" className="mr-2" />
              <Text className="text-white font-bold text-lg">Scan QR Code</Text>
            </TouchableOpacity>

          </View>

          {/* Compatible devices */}
          <View className="bg-gray-800/40 p-6 rounded-xl mb-6">
            <Text className="text-white text-xl font-bold mb-4">Getting a New device</Text>

            <View className="space-y-3">
              <View className="bg-gray-700/30 p-4 rounded-lg">
                <View className="flex-row">
                  <Text className="text-gray-300 font-medium">1. Contact </Text>
                  <Text className="text-yellow-300"> sales@safeZone.co.tz</Text>
                </View>
                <Text className="text-gray-300 font-medium">2. Place your order</Text>
                <Text className="text-gray-300 font-medium">3. Add your device</Text>
                <Text className="text-gray-300 font-medium">4. You are ready to GO</Text>
                
                <Text className="text-gray-400 text-sm pt-6 ml-2">Tel: +255 762 127 425</Text>
                <Text className="text-gray-400 text-sm pt-1 ml-2">Fax: +255 762 127 425</Text>
                <Text className="text-gray-400 text-sm pt-1 ml-2">Info: info@safezone.com.tz</Text>
              </View>
            </View>
          </View>

          {/* Setup guide */}
          <View className="bg-blue-500/10 p-6 rounded-xl mb-24">
            <Text className="text-white text-xl font-bold mb-4">Setup Guide</Text>
            <Text className="text-gray-300 mb-4">Follow these steps to connect your new device:</Text>

            <View className="space-y-3">
              <View className="flex-row mb-1">
                <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">1</Text>
                </View>
                <Text className="text-gray-300 flex-1 mt-1">Power on your device</Text>
              </View>

              <View className="flex-row mb-1">
                <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">2</Text>
                </View>
                <Text className="text-gray-300 flex-1 mt-1">Scan the Device QR Code</Text>
              </View>

              <View className="flex-row mb-1">
                <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">3</Text>
                </View>
                <Text className="text-gray-300 flex-1 mt-1">Fill the Form</Text>
              </View>

              <View className="flex-row mb-1">
                <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-bold">4</Text>
                </View>
                <Text className="text-gray-300 flex-1 mt-1">Submit and You are good to GO</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
