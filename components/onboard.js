import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/logo-white.png'

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        marginBottom: 20
    },
    header: {
        color: "white",
        fontWeight: "bold",
        fontFamily: "Mulish-ExtraBold",
        fontSize: 45,
        marginBottom: 20
    },
    subheading : {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Mulish-ExtraBold",
        marginBottom: 30,
    },
    spanGreen: {
        color: "#4F9D69"
    },
    getStarted: {
        backgroundColor: "white",
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: "Mulish-Regular",
    }
})

export default function Onboard( {navigation} ){

    useEffect(() => {
        const checkSelections = async () => {
            try {
                const selectedHouses = await AsyncStorage.getItem('selectedHouses');
                if (selectedHouses !== null) {
                    // User has made selections, navigate to Dashboard
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Dashboard' }],
                    });
                }
            } catch (error) {
                console.error('Error reading data', error);
            }
        };
    
        checkSelections();
    }, []);

    return <View style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <Text style={styles.header}>leap</Text>
            <Text style={styles.subheading}>meet the <Text style={styles.spanGreen}>world.</Text></Text>
            <TouchableOpacity style={styles.getStarted} activeOpacity={.85} onPress={() => navigation.navigate('SelectHouses')}>
                <Text style={styles.buttonText}>get started</Text>
            </TouchableOpacity>
        </View>
}