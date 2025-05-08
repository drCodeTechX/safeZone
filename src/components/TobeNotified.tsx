import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Row {
    phone: string;
    name: string;
    MNO: string;
    
}

export default function TobeNotified({ rows, setRows }: { rows: Row[]; setRows: (updatedRows: any) => void }) {
    const handleInputChange = (text: string, index: number, field: keyof Row) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = text;
        setRows(updatedRows);
    };

    const addNewRow = () => {
        setRows([...rows, { phone: "", name: "", MNO: "Vodacom", }]);
    };



    const deleteRow = (index: number) => {
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);
    };

    return (
        <View>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingBottom: 30 }}>
                <Text style={styles.LabelInputs}>List to be notified</Text>
                <Ionicons name="add-circle" size={21} color="yellow" onPress={addNewRow} />
            </View>
            <View>
                {rows.map((row, index) => (
                    <View key={index} style={styles.row}>
                        <View>
                            <Text style={styles.LabelInputs}>Phone Number</Text>
                            <TextInput
                                placeholder="Phone Number"
                                keyboardType='number-pad'
                                style={styles.input}
                                value={row.phone}
                                onChangeText={(text) => handleInputChange(text, index, 'phone')}
                            />
                        </View>

                        <View>
                            <Text style={styles.LabelInputs}>Name</Text>
                            <TextInput
                                placeholder="Name"
                                style={styles.input}
                                value={row.name}
                                onChangeText={(text) => handleInputChange(text, index, 'name')}
                            />
                        </View>
                        <View>
                            <Text style={styles.LabelInputs}>Mobile Operator</Text>
                            <View style={styles.input2}>
                                <SelectPicker
                                    onValueChange={(item) => handleInputChange(item, index, 'MNO')}
                                    selectedValue={row.MNO}
                                >
                                    <SelectPicker.Item label="Vodacom" value="Vodacom" />
                                    <SelectPicker.Item label="Tigo" value="Tigo" />
                                    <SelectPicker.Item label="Halopesa" value="Halopesa" />
                                    <SelectPicker.Item label="Airtel" value="Airtel" />
                                    <SelectPicker.Item label="TTCL" value="TTCL" />
                                </SelectPicker>
                            </View>
                        </View>



                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => deleteRow(index)} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                            {index === rows.length - 1 && (
                                <TouchableOpacity onPress={addNewRow} style={styles.addButton}>
                                    <Text style={styles.buttonText}>Add</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                ))}
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    row: {
        marginBottom: 10,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#d4a373',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 6,
        fontSize: 16,
        borderRadius: 12,
        marginVertical: 5,
        fontWeight: '400',
        borderColor: 'white',
        color: '#758694',
    },
    input2: {
        borderWidth: 1,
        borderRadius: 12,
        marginVertical: 5,
        borderColor: 'white',
        color: '#758694',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        maxHeight: 25
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 3,
        paddingHorizontal: 12,
        justifyContent: "center",
        margin: 0,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'green',
        paddingVertical: 3,
        paddingHorizontal: 12,
        justifyContent: "center",
        margin: 0,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        padding: 0,
        margin: 0
    },
    LabelInputs: {
        fontSize: 16,
        fontWeight: "500",
        color: "white"
    },
});
