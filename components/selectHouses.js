import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/logo-black.png'


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", // Only background color here
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center', // Align items here
        justifyContent: 'flex-start', // Justify content here
    },
    subheading: {
        fontSize: 45,
        fontFamily: "Mulish-ExtraBold",
        fontWeight: "bold",
        marginTop: 20,
        alignSelf: "flex-start",
        marginLeft: 30
    },
    subheadingTwo: {
        fontSize: 45,
        fontFamily: "Mulish-ExtraBold",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 30
    },
    red: {
        color: "#EF5D60"
    },
    grid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', // Allow wrapping
        justifyContent: 'space-evenly', // Space items evenly
    },
    item: {
        width: 175,
        height: 175,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 30,
    },
    itemText: {
        color: 'white',
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Mulish-Regular",
        fontWeight: "bold",
    },
    itemTextWrapper: {
        backgroundColor: "black",
        borderRadius: 10,
        padding: 10,
    },
    logo: {
        width: 50,
        height: 40,
        marginTop: 75,
        alignSelf: "flex-start",
        marginLeft: 30
    },
    bottomTextPadded: {
        color: 'black',
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Mulish-Regular",
        fontWeight: "bold",
        marginTop: 30
    },
    bottomTextNotPadded: {
        color: 'black',
        fontSize: 25,
        textAlign: "center",
        fontFamily: "Mulish-Regular",
        fontWeight: "bold",
    },
    blue: {
        color: "#2660A4"
    },
    green: {
        color: "#4F9D69"
    },
    begin: {
        backgroundColor: "black",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 30,
        marginBottom: 50
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Mulish-Regular",
        color: "white"
    },
    selectedItem: {
        borderWidth: 5,
        borderColor: 'black',
    },
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default function SelectHouses( {navigation} ){
    
    const [selectedItems, setSelectedItems] = useState([]);

    const handleItemPress = (id) => {
        const selectedItem = items.find(item => item.id === id);
        if (selectedItems.some(item => item.id === id)) {
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        } else {
            setSelectedItems([...selectedItems, selectedItem]);
        }
    };
    

    const navigateToDashboard = async () => {
        if (selectedItems.length === 0) {
            alert("Please select at least one house to continue.");
            return;
        }
    
        const selectedHouseNames = selectedItems.map(item => item.text);
    
        try {
            await AsyncStorage.setItem('selectedHouses', JSON.stringify(selectedHouseNames));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        } catch (error) {
            console.error('Error saving data', error);
        }
    };
    

    const items = [
        { id: 1, text: 'fitness & wellness', bg: '#B892FF' },
        { id: 2, text: 'nutrition', bg: '#EF5D60' },
        { id: 3, text: 'self improvement', bg: '#90C2E7' },
        { id: 4, text: 'creativity', bg: '#EED5C2' },
        { id: 5, text: 'social', bg: '#EC9A29' },
        { id: 6, text: 'literature', bg: '#23B5D3' },
        { id: 7, text: 'nature', bg: '#FFB7C3' },
        { id: 8, text: 'adventure', bg: '#F5E663' },
        // Add more items as needed
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.subheading}>pick your</Text>
            <Text style={[styles.red, styles.subheadingTwo]}>houses</Text>
            <View style={styles.grid}>
            {items.map(item => (
                <TouchableOpacity
                    activeOpacity={1}
                    key={item.id}
                    onPress={() => handleItemPress(item.id)}
                    style={[
                        styles.item, 
                        { backgroundColor: item.bg }, 
                        selectedItems.some(selectedItem => selectedItem.id === item.id) ? styles.selectedItem : null,
                        styles.dropShadow
                    ]}
                >
                    <View style={styles.itemTextWrapper}>
                        <Text style={styles.itemText}>{item.text}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </View>
            <Text style={styles.bottomTextPadded}>ready to go out and</Text>
            <Text style={styles.bottomTextNotPadded}><Text style={styles.red}>meet </Text><Text style={styles.blue}>the </Text><Text style={styles.green}>world?</Text></Text>
            <TouchableOpacity style={styles.begin} activeOpacity={.85} onPress={navigateToDashboard}>
                <Text style={styles.buttonText}>begin</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}