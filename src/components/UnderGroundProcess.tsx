import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

type ChipProps = {
    loaderColor: string;
    textMSG: string;
};

const UnderGroundProcess: React.FC<ChipProps> = ({ loaderColor = "yellow", textMSG = "Processing..." }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#0e1a25" }}>
            <ActivityIndicator size={"large"} color={loaderColor} />
            <Text style={{ fontSize: 15, color: "#fff", fontWeight: "400", paddingTop: 12 }}>{textMSG}</Text>
        </View>
    )
}

export default UnderGroundProcess