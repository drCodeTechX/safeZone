import { StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext } from '@/context/AuthContext';

interface Device {
  id: string;
  name: string;
  status: string;
  type?: string;
  location?: string;
  isRegistered?: boolean;
}

interface DeviceLog {
  id: string;
  device_id: string;
  temperature: number;
  humidity: number;
  motion?: number;
  smoke?: number;
  batteryLevel: number;
  timestamp: string;
}

const StatisticsScreen = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState<DeviceLog[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
  if (!user) return;

  setLoading(true);
  setError(null);

  Promise.all([
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/device-logs`).then(res => res.json()),
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/devices`).then(res => res.json())
  ])
  .then(([logsData, devicesData]: [DeviceLog[], Device[]]) => {
    // Ensure proper type comparison by converting to string
    const userDevices = devicesData.filter(device => 
      user?.devices?.some(userDeviceId => userDeviceId.toString() === device.id.toString())
    );
    
    // For debugging, you can use this:
    devicesData.forEach(device => {
      console.log("User devices:", user?.devices);
      console.log("Current device id:", device.id);
      console.log("Matches:", user?.devices?.some(d => d.toString() === device.id.toString()));
    });


    // Filter logs belonging to the user's devices
    const userLogs = logsData.filter(log => 
      user?.devices?.some(deviceId => deviceId.toString() === log.device_id.toString())
    );

    // Ensure each device has at least one log
    const devicesWithLogs = userDevices.filter(device =>
      userLogs.some(log => log.device_id.toString() === device.id.toString())
    );

    // Update state
    setDevices(devicesWithLogs);
    setLogs(userLogs);
    setLoading(false);

    // Set first device as default selected
    if (devicesWithLogs.length > 0) {
      setSelectedDevice(devicesWithLogs[0].name);
    } else {
      setError('No devices with logs found for the user.');
    }
  })
  .catch(err => {
    console.error(err);
    setError('Failed to fetch data');
    setLoading(false);
  });
}, []);


  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDeviceData = (deviceName: string) => {
    const device = devices.find(d => d.name === deviceName && d.isRegistered);
    if (!device) return [];
    
    return logs
      .filter(log => log.device_id === device.id)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const chartConfig = {
    backgroundColor: '#1a2634',
    backgroundGradientFrom: '#1a2634',
    backgroundGradientTo: '#1a2634',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#10b981',
    },
  };

  const renderDeviceChart = (deviceName: string) => {
    const deviceData = getDeviceData(deviceName);
    if (deviceData.length === 0) return null;

    return (
      <View className="mb-6">
        <Text className="text-white text-xl font-bold mb-4">{deviceName || 'Unknown Device'}</Text> {/* Ensure deviceName is safely accessed */}
        
        {/* Temperature Chart */}
        <View key={`${deviceName}-temperature-chart`} className="bg-gray-800/30 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 mb-2">Temperature (°C)</Text>
          <LineChart
            data={{
              labels: deviceData.map(log => formatTime(log.timestamp)),
              datasets: [{
                data: deviceData.map(log => log.temperature || 0) // Default to 0 if temperature is undefined
              }]
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Humidity Chart */}
        <View key={`${deviceName}-humidity-chart`} className="bg-gray-800/30 p-4 rounded-lg mb-4">
          <Text className="text-gray-400 mb-2">Humidity (%)</Text>
          <LineChart
            data={{
              labels: deviceData.map(log => formatTime(log.timestamp)),
              datasets: [{
                data: deviceData.map(log => log.humidity || 0) // Default to 0 if humidity is undefined
              }]
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#3b82f6',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Battery Level Chart */}
        <View key={`${deviceName}-battery-chart`} className="bg-gray-800/30 p-4 rounded-lg">
          <Text className="text-gray-400 mb-2">Battery Level (%)</Text>
          <LineChart
            data={{
              labels: deviceData.map(log => formatTime(log.timestamp)),
              datasets: [{
                data: deviceData.map(log => log.batteryLevel || 0) // Default to 0 if batteryLevel is undefined
              }]
            }}
            width={Dimensions.get('window').width - 48}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(251, 191, 36, ${opacity})`,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#fbbf24',
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    );
  };

  const uniqueDevices = [...new Set(devices
    .filter(device => device.isRegistered && device.name)
    .map(device => device.name))];

  return (
    <SafeAreaView className="flex-1 bg-[#0E1A25]">
      <ScrollView className="flex-1">
        <View className="p-6">
          <Text className="text-white text-2xl font-bold mb-4">Device Statistics</Text>
          
          {loading ? (
            <View className="items-center justify-center p-8">
              <ActivityIndicator size="large" color="#10B981" />
            </View>
          ) : error ? (
            <View className="bg-red-500/20 p-4 rounded-xl">
              <Text className="text-red-400 text-center">{error}</Text>
            </View>
          ) : devices.length === 0 ? (
            <View className="bg-gray-800/30 p-4 rounded-lg">
              <Text className="text-gray-400 text-center">You have no devices registered.</Text>
            </View>
          ) : (
            <>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-6 -mx-6"
                contentContainerStyle={{ paddingHorizontal: 24 }}
                data={uniqueDevices}
                renderItem={({ item: deviceName }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedDevice(deviceName)}
                    className={`px-4 py-2 rounded-full mr-2 ${
                      selectedDevice === deviceName
                        ? 'bg-green-500'
                        : 'bg-gray-800/50'
                    }`}
                  >
                    <Text
                      className={`${
                        selectedDevice === deviceName
                          ? 'text-white'
                          : 'text-gray-400'
                      }`}
                    >
                      {deviceName}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={deviceName => deviceName}
              />
              {selectedDevice && renderDeviceChart(selectedDevice)}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatisticsScreen;