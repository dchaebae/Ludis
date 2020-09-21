/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    ThemeProvider,
} from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeContent from './sub-component/WelcomeContent';
import Login from './sub-component/Login'

const Stack = createStackNavigator();

const theme = {
    colors: {
        primary: '#3fceb0',
        primaryLight: '#7affe2',
        primaryDark: '#009c81',
        secondary: '#F7794D',
        secondaryDark: '#DB440F',
    }
}

const Welcome = (props) => {
    return (
        <Stack.Navigator 
            screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Welcome" component={WelcomeContent}/>
            <Stack.Screen name="Sign Up Email" component={WelcomeContent}/>
            
            <Stack.Screen name="Sign Up Profile" component={WelcomeContent}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
};

export default Welcome;