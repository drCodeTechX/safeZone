import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSocket } from '@/app/context/SocketConnectionContex';

const ItSafe = ({ }) => {
    const socketContext = useSocket(); // Get the whole context
    const thereDisaster = socketContext?.thereDisaster || false; // Safely access thereDisaster or default to false

    // Change safe based on thereDisaster
    const safe = !thereDisaster;
    const borderColorStyle = { borderColor: safe ? '#04c401' : '#ef233c' };
    const textFormat = safe ? "Safe" : "Danger";
    return (
        <View style={[styles.mainDiv, styles.neon, borderColorStyle]}>
            <View style={styles.glass}>
                <Text style={styles.percentageSize}>   {textFormat}
                </Text>
            </View>
        </View>
    )
}

export default ItSafe

const styles = StyleSheet.create({
    mainDiv: {
        width: 256,
        height: 256,
        borderWidth: 11,
        // borderColor: "#04c401",
        borderRadius: 128,
        justifyContent: "center",
        alignItems: "center",
        elevation: 100,
        shadowColor: "#2962ff",
        position: 'relative',
        marginTop: 30,
        backgroundColor: "#fdf0d5",

        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 50, // approximating the overall spread of the shadow
    },
    percentageSize: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#04c301"
    },
    neon: {
        shadowOpacity: 0.1,
    },
    glass: {
        // borderRadius: 20,
        // padding: 20,
        // borderWidth: 1,
        // shadowRadius: 20,
        // paddingHorizontal: 8,
        // borderRadius: 12,
        // elevation: 10,
        // flexShrink: 2
    },
})