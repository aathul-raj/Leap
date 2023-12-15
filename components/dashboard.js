import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logo from '../assets/logo-black.png';
import Line from '../assets/line.png';
import Arrow from '../assets/arrow.png';

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logo: {
        width: 50,
        height: 40,
        marginTop: 75,
        alignSelf: 'flex-start',
        marginLeft: 30
    },
    subheading: {
        fontSize: 45,
        fontFamily: 'Mulish-ExtraBold',
        fontWeight: 'bold',
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 30,
        marginBottom: 10
    },
    challengeContainer: {
        marginTop: 40,
        backgroundColor: '#F2F2F2',
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 25,
        height: '30%',
        justifyContent: 'space-evenly',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
        minWidth: 320,
        maxWidth: "95%"
    },
    challengeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    challengeHeaderText: {
        fontSize: 25,
        fontFamily: 'Mulish-ExtraBold',
        fontWeight: 'bold',
    },
    arrowContainer: {
        backgroundColor: 'black',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        alignSelf: 'center',
    },
    challengeText: {
        fontSize: 25,
        fontFamily: 'Mulish-Regular',
    },
    categoryContainer: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
        paddingHorizontal: 20,
    },
    categoryText: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Mulish-ExtraBold',
        fontWeight: 'bold',
    },
    challengeCompleted: {
        fontSize: 25,
        fontFamily: 'Mulish-ExtraBold',
        textAlign: 'left',
        marginBottom: 20
    },
    completedSub: {
        fontSize: 20,
        fontFamily: 'Mulish-ExtraBold',
        textAlign: 'left',
    },
    blue: {
        color: '#2660A4'
    },
    green: {
        color: '#4F9D69'
    }
});

export default function Dashboard({ navigation }) {
    const [challengeCompleted, setChallengeCompleted] = useState(false);
    const [challengeDisc, setChallengeDisc] = useState('');
    const [challengeCategory, setChallengeCategory] = useState('');

    useEffect(() => {
        retrieveChallengeCompletionStatus();
        fetchSelectedHousesAndChallenge();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            retrieveChallengeCompletionStatus(); // Retrieve status when the screen is focused
        });

        return unsubscribe;
    }, [navigation]);

    const retrieveChallengeCompletionStatus = async () => {
        try {
            const completed = await AsyncStorage.getItem('challengeCompleted');
            if (completed !== null) {
                setChallengeCompleted(JSON.parse(completed)); // Ensure to parse the string to a boolean
            }
        } catch (error) {
            console.error('Error reading challenge completion status', error);
        }
    };

    const markChallengeAsCompleted = async () => {
        try {
            await AsyncStorage.setItem('challengeCompleted', JSON.stringify(true));
            setChallengeCompleted(true);
        } catch (error) {
            console.error('Error saving challenge completion status', error);
        }
    };

    const fetchSelectedHousesAndChallenge = async () => {
        try {
            const savedHouses = await AsyncStorage.getItem('selectedHouses');
            if (savedHouses !== null) {
                const selectedHouseNames = JSON.parse(savedHouses);
                console.log(selectedHouseNames)
                const randomCategory = selectedHouseNames[Math.floor(Math.random() * selectedHouseNames.length)];
                console.log(randomCategory)
                fetchChallenge(randomCategory);
            }
        } catch (error) {
            console.error('Error reading data', error);
        }
    };

    const fetchChallenge = async (category) => {
        try {
            // Creating a date string that respects the local time zone
            const today = new Date();
            const offset = today.getTimezoneOffset() * 60000; // offset in milliseconds
            const localISOTime = (new Date(today - offset)).toISOString().split('T')[0];
    
            console.log(localISOTime);
    
            const response = await axios.get(`https://web-production-b45a.up.railway.app/get-challenge`, { 
                params: { 
                    category: category,
                    date: localISOTime // Sending local date
                } 
            });
    
            if (response.data && response.data.data) {
                setChallengeDisc(response.data.data.challenge);
                setChallengeCategory(response.data.data.category);
            }
        } catch (error) {
            console.error("Error fetching challenge:", error);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.subheading}>hey there!</Text>
            <Image source={Line} />

            <View style={styles.challengeContainer}>
                {challengeCompleted ? (
                    <View>
                        <Text style={styles.challengeCompleted}>
                            today's <Text style={styles.green}>challenge</Text> {'\nhas been completed!'}
                        </Text>
                        <Text style={styles.completedSub}>see you tmrw :</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.challengeHeader}>
                            <Text style={styles.challengeHeaderText}>today's <Text style={styles.blue}>challenge</Text></Text>
                            <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('Challenge', {
                                challengeDisc: challengeDisc,
                                challengeCategory: challengeCategory,
                                markChallengeAsCompleted: markChallengeAsCompleted
                            })}>
                                <Image source={Arrow} style={styles.arrow} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.challengeText}>{challengeDisc}</Text>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>{challengeCategory}</Text>
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}
