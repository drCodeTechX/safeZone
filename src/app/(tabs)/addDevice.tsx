import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal, Alert, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { PlusCircle, Scan, X } from "lucide-react-native"
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

interface Contact {
  name: string;
  phone: string;
}

interface DeviceRegistration {
  name: string;
  location: string;
  notifyList: Contact[];
}

export default function AddDeviceScreen() {
  const router = useRouter()
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const baseUrl = process.env.EXPO_PUBLI_API_URL;
  const [registration, setRegistration] = useState<DeviceRegistration>({
    name: "",
    location: "",
    notifyList: [{ name: "", phone: "" }]
  });

  const handleAddContact = () => {
    setRegistration(prev => ({
      ...prev,
      notifyList: [...prev.notifyList, { name: "", phone: "" }]
    }))
  }

  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    setRegistration(prev => {
      const newList = [...prev.notifyList]
      newList[index] = { ...newList[index], [field]: value }
      return { ...prev, notifyList: newList }
    })
  }

  const handleRegistration = async () => {
    try {
      // Validate form
      if (!registration.name || !registration.location || 
          !registration.notifyList[0].name || !registration.notifyList[0].phone) {
        Alert.alert('Missing Fields', 'Please fill in all required fields')
        return
      }

      // Filter out empty contacts
      const validContacts = registration.notifyList.filter(c => c.name && c.phone)
      
      const response = await fetch(`${baseUrl}/devices/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registration,
          notifyList: validContacts,
          isRegistered: true
        }),
      })

      if (response.ok) {
        Alert.alert('Success', 'Device registered successfully')
        setShowRegistrationModal(false)
        router.push('/(tabs)')
      } else {
        Alert.alert('Error', 'Failed to register device')
      }
    } catch (error) {
      console.error('Error registering device:', error)
      Alert.alert('Error', 'Failed to register device')
    }
  }

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

            <TouchableOpacity 
              onPress={() => Alert.alert(
                'Feature Under Development',
                'QR Code scanning is not available yet.',
                [{ text: 'OK' }]
              )}
              className="bg-green-500 p-4 rounded-lg flex-row items-center justify-center mb-4"
            >
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

      {/* Registration Modal */}
      <Modal
        visible={showRegistrationModal}
        onRequestClose={() => setShowRegistrationModal(false)}
        animationType="slide"
      >
        <SafeAreaView className="flex-1 bg-[#0E1A25]">
          <ScrollView className="flex-1">
            <View className="p-4">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-white text-xl font-bold">Register Device</Text>
                <TouchableOpacity onPress={() => setShowRegistrationModal(false)}>
                  <X color="white" size={24} />
                </TouchableOpacity>
              </View>

              <View className="space-y-4">
                <View>
                  <Text className="text-gray-300 mb-2">Device Name</Text>
                  <TextInput
                    className="bg-gray-800 text-white p-4 rounded-lg"
                    placeholder="Enter device name"
                    placeholderTextColor="#666"
                    value={registration.name}
                    onChangeText={(text) => setRegistration(prev => ({ ...prev, name: text }))}
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-2">Location</Text>
                  <TextInput
                    className="bg-gray-800 text-white p-4 rounded-lg"
                    placeholder="Enter device location"
                    placeholderTextColor="#666"
                    value={registration.location}
                    onChangeText={(text) => setRegistration(prev => ({ ...prev, location: text }))}
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-2">Emergency Contacts</Text>
                  {registration.notifyList.map((contact, index) => (
                    <View key={index} className="mb-4">
                      <TextInput
                        className="bg-gray-800 text-white p-4 rounded-lg mb-2"
                        placeholder="Contact name"
                        placeholderTextColor="#666"
                        value={contact.name}
                        onChangeText={(text) => handleContactChange(index, 'name', text)}
                      />
                      <TextInput
                        className="bg-gray-800 text-white p-4 rounded-lg"
                        placeholder="Phone number"
                        placeholderTextColor="#666"
                        keyboardType="phone-pad"
                        value={contact.phone}
                        onChangeText={(text) => handleContactChange(index, 'phone', text)}
                      />
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={handleAddContact}
                    className="bg-blue-500 p-4 rounded-lg flex-row items-center justify-center"
                  >
                    <PlusCircle size={24} color="white" className="mr-2" />
                    <Text className="text-white font-bold">Add Another Contact</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={handleRegistration}
                  className="bg-green-500 p-4 rounded-lg flex-row items-center justify-center mt-6"
                >
                  <Text className="text-white font-bold text-lg">Register Device</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}
