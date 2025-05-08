import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
interface InfoKPiProps {
    icon: React.ReactNode;
    nameKpi: String;
    valueKPI: String;
}

const InfoKPi: React.FC<InfoKPiProps> = ({ icon,nameKpi, valueKPI }) => {
    return (
        <View style={styles.mainCont}>
            <View style={styles.glass}>
                {icon}
            </View>
            <View style={styles.InfoDetails}>
                <Text style={{ color: "#fff", opacity: 0.5, fontSize: 17, fontWeight: "400" }}>{nameKpi}</Text>
                <Text style={{ color: "#fff", fontSize: 23, fontWeight: "500" }}>{valueKPI}</Text>
            </View>
        </View>
    )
}

export default InfoKPi

const styles = StyleSheet.create({
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0,
        shadowRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        // elevation: 10,
    },
    mainCont: {
        // flex: 1,
        flexDirection: "row",
        columnGap: 12,
        // justifyContent: "space-between",
        // alignItems: "stretch",
        // height: 200,
        width: "40%"
    },
    InfoDetails: {
        flexDirection: "column",
        justifyContent: "space-between",

    }
})