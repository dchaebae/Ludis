/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import styles from './GeneralStyles';
import GoalPage from './GoalPage';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="individualGoals" component={GoalPage}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;