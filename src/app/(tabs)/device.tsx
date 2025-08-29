import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/AuthContext';

interface Device {
  id: string;
  name: string;
  status: string;
  batteryLevel?: number;
  healthStatus?: string;
  isRegistered: boolean;
  notifyList?: { name?: string; phone: string }[];
  plan?: string; // Retained plan property
}

const statusColor = (status: string) => {
  switch (status) {
    case 'online':
      return Colors.light.tint;
    case 'offline':
      return '#d32f2f';
    default:
      return Colors.light.icon;
  }
};

const DeviceCard = ({ device }: { device: Device }) => (
  <View className="bg-gray-800/30 p-4 rounded-lg mb-3">
    {/* Device Icon, Name, and Status Badge */}
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center">
        <View className="bg-gray-700 p-2 rounded-full mr-3">
          <Text className="text-white text-lg">
            {device.name ? '\ud83d\udcf1' : ''} {/* Render icon only if name exists */}
          </Text>
        </View>
        <Text className="text-white font-medium text-lg">{device.name || 'Unknown Device'}</Text>
      </View>
      <Text className={`px-2 py-1 rounded-full text-xs font-bold ${
        device.status === 'online' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        {device.status === 'online' ? 'Online' : 'Offline'}
      </Text>
    </View>

    {/* Device Data */}
    {device.plan && (
      <Text className="text-gray-400 text-sm mb-1">Plan: {device.plan}</Text>
    )}
    {typeof device.batteryLevel === 'number' && (
      <View className="mt-2 space-y-1">
        <View className="flex-row items-center justify-between">
          <Text className={`${
              device.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'
            } text-sm`}>Battery</Text>
          <Text className={`text-xs ${
            device.batteryLevel > 20 ? 'text-green-400' : 'text-red-400'
          }`}>{device.batteryLevel}%</Text>
        </View>
        <View className="flex-1 bg-gray-700/50 h-2 rounded-full">
          <View 
            className={`h-2 rounded-full ${
              device.batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${device.batteryLevel}%` }} 
          />
        </View>
      </View>
    )}

    {/* Emergency Contacts */}
    <View className="mt-4">
      <Text className="text-gray-400 text-sm font-bold mb-2">Emergency Contacts:</Text>
      <View className="space-y-2">
        {device.notifyList?.map((contact, index) => (
          <View key={index} className="flex-row items-center bg-gray-700/50 p-3 rounded-lg">
            <View className="bg-green-500 p-2 rounded-full mr-3">
              <Text className="text-white text-lg">
                \ud83d\udcde
              </Text>
            </View>
            <View>
              <Text className="text-gray-300 text-sm font-medium">{contact.name || 'Unknown'}</Text>
              <Text className="text-gray-400 text-xs">{contact.phone}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  </View>
);

const DeviceList = ({ devices }: { devices: Device[] }) => {
  const registeredDevices = devices.filter(device => device.isRegistered && device.name);
  
  return (
    <FlatList
      data={registeredDevices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DeviceCard device={item} />}
      contentContainerStyle={styles.listContainer}
      className="px-6"
      ListEmptyComponent={() => (
        <View className="bg-gray-800/30 p-4 rounded-lg">
          <Text className="text-gray-400 text-center">No registered devices found</Text>
        </View>
      )}
    />
  );
};

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const DeviceScreen = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useContext(AuthContext); // Get user from AuthContext

  useEffect(() => {
    if (!user) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    if (!user.devices || user.devices.length === 0) {
      setDevices([]);
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/devices`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received');
        }
        // Filter devices to only include those registered to the user
        const userDevices = data.filter((device: Device) => 
          device && device.id && user.devices?.some(userDeviceId => 
            userDeviceId.toString() === device.id.toString()
          )
        );
        setDevices(userDevices);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch devices');
        setLoading(false);
      });
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <View className="flex-1">
        <View className="px-6 pt-6">
          <Text className="text-white text-2xl font-bold mb-4">Your Devices</Text>
        </View>
        {loading ? (
          <View className="items-center justify-center p-8">
            <ActivityIndicator size="large" color="#10B981" />
          </View>
        ) : error ? (
          <View className="bg-red-500/20 mx-6 p-4 rounded-xl">
            <Text className="text-red-400 text-center">{error}</Text>
          </View>
        ) : (
          <DeviceList devices={devices} />
        )}
      </View>
    </SafeAreaView>);
};

export default DeviceScreen;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  }
});