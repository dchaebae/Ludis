import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {
    Header,
    Button,
    Input
} from 'react-native-elements';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: 'column',
        width: '100%',
        paddingTop: 100,
        paddingBottom: 175,
        justifyContent: 'flex-start',
        alignContent: 'center',
    },
    background: {
        backgroundColor: 'transparent',
        width: '70%',
        
        height: 240,
    },
    welcomeText: {
        fontSize: 26,
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
        marginBottom: 60,
    },
    signUpButtons: {
        flex: 1,
        flexDirection: 'column',
    },
    submitViewShadow: {
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 30,
        borderRadius: 20,

        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.4)',
    },
    submitView: {
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 20,
        width: '100%'
    },
    buttonSubmit: {
        borderRadius: 20,
        width: '100%'
    },
    buttonSubmitText: {
        fontFamily: 'Lato-Bold',
        paddingHorizontal: 15,
    },
});

export default class Login extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.background}
                    source={require('../static/logo_with_text.png')}
                    resizeMethod='resize'
                    resizeMode='contain'
                />
                <Text style={styles.welcomeText}>
                    Welcome Back!
                </Text>
                <View style={styles.signUpButtons}>
                    <View style={styles.submitView}>
                        <Input
                            placeholder='Email'
                            rightIcon={{ type: 'font-awesome', name: 'envelope' }}
                            inputContainerStyle={{ width: '80%' }}
                        />
                    </View>

                    <View style={styles.submitView}>
                        <Input
                            placeholder='Password'
                            rightIcon={{ type: 'font-awesome', name: 'lock' }}
                            inputContainerStyle={{ width: '80%' }}
                            secureTextEntry
                        />
                    </View>
                </View>
                <View style={styles.submitViewShadow}>
                    <Button
                        title='Get Going'
                        titleStyle={[styles.buttonSubmitText, {color: 'white'}]}
                        ViewComponent={LinearGradient}
                        buttonStyle={styles.buttonSubmit}

                        linearGradientProps={{
                            colors: ['#010A20', '#41C3A7'],
                            start: {x: 0, y: 0},
                            end: {x: 0.8, y: 0.7},
                            useAngle: true,
                            angle: 45,
                        }}/>
                </View>
            </View>
        )
    }
}
