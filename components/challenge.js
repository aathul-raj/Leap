import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Logo from '../assets/logo-black.png'
import Check from '../assets/check.png'
import BackArrow from '../assets/back-arrow.png'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 30
    },
    logo: {
        width: 50,
        height: 40,
        marginTop: 75,
        alignSelf: "flex-start",
    },
    subheading: {
        fontSize: 45,
        fontFamily: "Mulish-ExtraBold",
        fontWeight: "bold",
        marginTop: 20,
        alignSelf: "flex-start",
    },
    subheadingNoMargin: {
        fontSize: 45,
        fontFamily: "Mulish-ExtraBold",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginBottom: 20
    },
    arrowContainer: {
        backgroundColor: "black",
        borderRadius: 25, // Half of width and height
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        marginTop: 30,
    },
    arrow: {
        alignSelf: "center",
    },
    red: {
        color: "#EF5D60"
    },
    challengeText: {
        fontSize: 45,
        fontFamily: "Mulish-Regular",
        alignSelf: "flex-start",
        marginBottom: 30
    },
    categoryContainer: {
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        marginBottom: 30
    },
    categoryText: {
        color: "white",
        fontSize: 25,
        fontFamily: "Mulish-ExtraBold",
        fontWeight: "bold",
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', // Ensure it spans the full width
    },
    checkContainer: {
        backgroundColor: "#4F9D69",
        borderRadius: 35, // Half of width and height
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "flex-start",
        marginTop: 30,
    },
    check: {
        alignSelf: "center",
    },
})


export default function Challenge({ navigation, route }) {
    const {challengeDisc, challengeCategory, markChallengeAsCompleted} = route.params

    const handleCompleteChallenge = () => {
        // Call the function to mark the challenge as completed
        markChallengeAsCompleted();

        // Then reset the navigation to go back to the Dashboard
        navigation.reset({
            index: 0,
            routes: [{ 
                name: 'Dashboard', 
                params: { challengeCompleted: true }
            }],
        });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.topRow}>
                <TouchableOpacity 
                    style={styles.arrowContainer} 
                    onPress={() => navigation.goBack()}>
                    <Image source={BackArrow} style={styles.arrow}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.checkContainer} 
                    onPress={handleCompleteChallenge}>
                    <Image source={Check} style={styles.check}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.subheading}>today's</Text>
            <Text style={[styles.subheadingNoMargin, styles.red]}>challenge</Text>
            <Text style={styles.challengeText}>{challengeDisc}</Text>
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{challengeCategory}</Text>
            </View>
        </ScrollView>
    );
}