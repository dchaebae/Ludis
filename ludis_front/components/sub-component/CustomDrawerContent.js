import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import {
    DrawerItemList,
} from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    Avatar
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },

    profileAvatar: {
        backgroundColor: '#efefef',
        margin: 15
    },
    profileText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    profileTextAccount: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        color: '#fff',
    },

    navView: {
        flex: 1,
        marginTop: 15,
    }
});

// check time of day for user, does EST for now
// EDIT: include 
function checkTime() {
    var currTime = new Date();
    const hour = currTime.getHours();
    if (hour < 12 && hour >= 6) {
        return 'Good Morning, '
    } else if (hour < 18 && hour >= 12) {
        return 'Good Afternoon, '
    } else {
        return 'Good Evening, '
    }
}

export default function CustomDrawerContent(props) {
    var profileMessage = checkTime();
    return (
        <ScrollView {...props} bounces={false}>
            <LinearGradient colors={['#3fceb0', '#008069']} start={{x:0.0, y:0.0}} end={{x:0.6, y:0.7}} style={{flex:1}}>          
                <SafeAreaView style={styles.header}>
                    
                        <Avatar rounded size={100} title="DC" containerStyle={styles.profileAvatar}/>
                        <Text style={styles.profileText}>{profileMessage+'Daniel'} </Text>
                        <Text style={styles.profileTextAccount}>Ultimate Frisbee</Text>
                        <Text style={styles.profileTextAccount}>@dchaebae </Text>
                </SafeAreaView>
            </LinearGradient>
            <View style={styles.navView}>
                <DrawerItemList {...props} />
            </View>
        </ScrollView>
    );
}