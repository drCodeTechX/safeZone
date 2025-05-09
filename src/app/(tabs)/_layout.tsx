import { View, StyleSheet, Platform } from "react-native";
import { Redirect, Tabs, useRouter } from "expo-router";
import React, { useContext, useEffect } from "react";
import { useState } from "react";


//Icons Pool
import { Entypo } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from "@/context/AuthContext";


export default function RootLayout() {
    const authState = useContext(AuthContext);

    if( !authState.isReady ){ 
        return null;
    }

    if(!authState.isLoggedIn){
        return <Redirect href="/signIn" />
    }

    const BgColor = "#0E1A25";

    return (
        <React.Fragment>
            <Tabs screenOptions={{
            tabBarActiveTintColor: '#fff',
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {
                paddingVertical: 4
            },
            animation: 'none',
            tabBarStyle: {
                backgroundColor: BgColor,
                height: 62,
                elevation: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
            },
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "500"
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',

                    headerShown: false,
                    tabBarIcon: ({ color }) => <Entypo name="home" size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name="statistics"
                options={{
                    headerShown: false,
                    title: "Statistics",
                    tabBarIcon: ({ color }) => <Entypo name="line-graph" size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name="addDevice"
                options={{
                    headerShown: false,
                    tabBarLabel: () => null,
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={styles.addDeviceButton}>
                                <FontAwesome6 name="add" size={30} color="#fff" />
                            </View>
                        )
                    }
                }}

            />
            <Tabs.Screen
                name="device"
                options={{
                    headerShown: false,
                    title: "Devices",
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="safe-square" size={30} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Entypo name="user" size={30} color={color} />,
                }}
            />
        </Tabs>
        </React.Fragment>
        );
        }

    const styles = StyleSheet.create({
        addDeviceButton: {
            top: Platform.OS == "ios" ? -10 : -20,
            width: Platform.OS == "ios" ? 50 : 60,
            height: Platform.OS == "ios" ? 50 : 60,
            borderRadius: Platform.OS == "ios" ? 25 : 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#04c401",
            fontSize: 0,
            elevation: 2,
            shadowOpacity: 1
        },
    });