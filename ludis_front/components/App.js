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
    StatusBar,
} from 'react-native';
import {
    ThemeProvider,
} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import GoalPage from './GoalPage';
import Welcome from './Welcome';
import CustomDrawerContent from './sub-component/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const theme = {
    colors: {
        primary: '#3fceb0',
        primaryLight: '#7affe2',
        primaryDark: '#009c81',
        secondary: '#F7794D',
        secondaryDark: '#DB440F',
    }
}

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Weekly Calendar' drawerContent={CustomDrawerContent}>
                    
                    <Drawer.Screen name="Personal Goals" component={GoalPage}/>
                    <Drawer.Screen name="Weekly Calendar" component={Welcome}/>
                    <Drawer.Screen name="Profile" component={GoalPage}/>
                    <Drawer.Screen name="Team Goals" component={GoalPage}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;