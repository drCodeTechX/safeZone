import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Stack } from 'expo-router'
import { SafeAreaView, StatusBar } from 'react-native'
import '../../global.css'
import { AuthProvider } from '@/context/AuthContext'

const RootLayout = () => {
  return (
    <AuthProvider>
      <SafeAreaView className='flex-1 bg-[rgb(14,26,37)]'>
        <StatusBar barStyle={'light-content'} backgroundColor={'#0E1A25'} />
        <Stack screenOptions={{ headerShown: false }} initialRouteName="signIn">
          <Stack.Screen name="signIn" options ={{
            animation: "none"
            }}/>
        </Stack>
      </SafeAreaView>
    </AuthProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})