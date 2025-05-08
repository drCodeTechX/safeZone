import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

type ChipProps = {
    label: string;  // Define the label prop as a string
};

const Chip: React.FC<ChipProps> = ({ label }) => {
    return (
        <View style={styles.chipContainer}>
            <Text style={styles.chipText}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chipContainer: {
        backgroundColor: "#04c401",
        paddingHorizontal: 7, // Added padding for a better look
        paddingVertical: 0,
        borderRadius: 9,
        alignSelf: 'center', // Adjust width to fit content
    },
    chipText: {
        color: "#fff",
        fontSize: 11,
        textAlign: "center",
    },
});

export default Chip;
