import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const LogoTitle = () => {
  
    return (
        <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
      );
  
}

export default LogoTitle

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
      },
})