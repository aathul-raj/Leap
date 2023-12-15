/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboard from './components/onboard';
import SelectHouses from './components/selectHouses';
import Dashboard from './components/dashboard';
import Challenge from './components/challenge';

const Stack = createStackNavigator();

export default function App(){
  return <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboard">
            <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }}/>
            <Stack.Screen name="SelectHouses" component={SelectHouses} options={{ headerShown: false }}/>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
            <Stack.Screen name="Challenge" component={Challenge} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
}