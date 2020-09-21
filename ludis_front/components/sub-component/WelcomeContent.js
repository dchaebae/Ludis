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
} from 'react-native-elements';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import { GOOGLE_IOS_CLIENTID } from '@env'

GoogleSignin.configure({
    iosClientId: GOOGLE_IOS_CLIENTID
});

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
        paddingBottom: 250,
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
    submitView: {
        marginHorizontal: 10,
        marginBottom: 20,
        minHeight: 50,
        borderRadius: 20,
    },
    submitViewShadow: {
        marginHorizontal: 10,
        marginBottom: 20,
        minHeight: 50,
        borderRadius: 20,

        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.4)',
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

export default class WelcomeContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
        }
    }

    // Somewhere in your code
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo });
            console.log(userInfo)

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        }
    }

    gotoLogin = () => {
        this.props.navigation.push('Login')
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
                    Welcome!
                </Text>
                <View style={styles.signUpButtons}>
                    <View style={styles.submitViewShadow}>
                        <Button
                            icon={<Icon name='google' color='white' size={30}/>}
                            title='Continue with Google'
                            titleStyle={[styles.buttonSubmitText, {color: 'white'}]}
                            ViewComponent={LinearGradient}
                            buttonStyle={styles.buttonSubmit}

                            linearGradientProps={{
                                colors: ['#010A20', '#41C3A7'],
                                start: {x: 0, y: 0},
                                end: {x: 0.8, y: 0.7},
                                useAngle: true,
                                angle: 45,
                            }}
                            onPress={this.signIn}/>
                    </View>

                    <View style={styles.submitView}>
                        <Button 
                            title='Sign up manually with email'
                            titleStyle={[styles.buttonSubmitText, {color: '#009c81'}]}
                            type='outline'
                            buttonStyle={[styles.buttonSubmit, {borderColor: '#009c81'}]}
                        />
                    </View>
                </View>
                <View>
                    <Button 
                        title='Already have an account? Login'
                        titleStyle={[styles.buttonSubmitText, {color: '#F7794D'}]}
                        type='clear'
                        buttonStyle={[styles.buttonSubmit, {borderColor: '#F7794D'}]}
                        onPress={this.gotoLogin}
                    />
                </View>
            </View>
        )
    }
}
