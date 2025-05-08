import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Chip from './Chip';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function AlertKPI({ device }: { device: any }) {
    return (
        <View style={{ paddingHorizontal: 2 }}>
            <View style={[styles.glass, { paddingVertical: 8, display: "flex", flexDirection: "row", justifyContent: "flex-start" }]}>
                <View>
                    <MaterialCommunityIcons name="smoke-detector" size={50} color="#fff" />
                </View>
                <View style={{ display: "flex", flexDirection: "column", paddingLeft: 9, gap: 6, flex: 1, }}>
                    <View><Text style={{ fontSize: 17, fontWeight: "500", color: "#7678ed" }}>{device?.name}</Text></View>
                    <View style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <Entypo name="signal" size={18} color="#04c401" />
                            {/* <Text style={{ backgroundColor: "#04c401", paddingHorizontal: 2, borderRadius: 12, textAlign:"center", fontSize:11 }}>online</Text> */}
                            <View style={{ justifyContent: "center", paddingLeft: 8 }}>
                                <Chip label='online' />
                            </View>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", gap: 10, alignSelf: "flex-end" }}>
                            <MaterialCommunityIcons name="fire-off" size={17} color="#38b000" />
                            <FontAwesome6 name="house-flood-water" size={15} color="#38b000" />
                            <Text style={{ fontSize: 13, opacity: 0.7, fontWeight: "500", color: "#f8edeb" }}>12-05-June</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
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