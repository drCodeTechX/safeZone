import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

const device = () => {

  const user = useContext(AuthContext).user;

  return (
    <View>
      <Text>device</Text>
      <Text>User : {user ? JSON.stringify(user) : 'No user'} </Text>
    </View>
  )
}

export default device

const styles = StyleSheet.create({})