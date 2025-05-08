import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Chip from './Chip';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DeviceInfo({ device }: { device: any }) {
    return (

        <TouchableOpacity>
            <View style={{ paddingHorizontal: 2 }}>
                <View style={[styles.glass, { paddingVertical: 8, }]}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                        <View>
                            <MaterialCommunityIcons name="smoke-detector" size={50} color="#fff" />
                        </View>
                        <View style={{ display: "flex", flexDirection: "column", paddingLeft: 9, gap: 3, flex: 1, }}>
                            <View><Text style={{ fontSize: 17, fontWeight: "500", color: "#7678ed" }}> {device?.name}</Text></View>
                            <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 5 }}>
                                <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "500", color: "yellow" }}>Serial Number: </Text>
                                    <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "500", color: "#f8edeb" }}>{device?.serialNumber}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ borderTopWidth: 1, borderTopColor: "#fff", display: "flex", flexDirection: "column" }}>
                        <Text style={{ fontSize: 15, color: "white", paddingTop: 5, fontWeight: "500", paddingBottom: 2, paddingLeft: 9, }}>List to be notified</Text>
                        {
                            device?.listTobeNotified && <View style={{ display: "flex", flexDirection: "column", }}>
                                {
                                    device?.listTobeNotified.map((person: any, index: number) =>
                                    (

                                        <View key={index} style={{ display: "flex", flexDirection: "row", marginLeft: 9, justifyContent: "space-between", borderLeftWidth: 1, borderColor: "yellow", paddingLeft: 5 }}>
                                            <Text style={{ color: "green", fontWeight: "300", fontSize: 12 }}>{person?.name}</Text>
                                            <Text style={{ color: "#a5a5a5", fontWeight: "300", fontSize: 12 }}>{person?.phone}</Text>
                                        </View>
                                    )
                                    )
                                }
                            </View>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    glass: {
        // borderRadius: 20,
        // padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        justifyContent: "center",
        paddingHorizontal: 8,
        borderRadius: 12,
        // elevation: 10,
        // flexShrink: 2
    },
})