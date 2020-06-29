import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    TextInput,
    Image,
    Keyboard,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import {
    Icon,
    Header,
    Text,
    Button,
} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import InsetShadow from 'react-native-inset-shadow'
import Modal from 'react-native-modal';
import AccordionTextInput from './AccordionTextInput'
import axios from 'axios'

styles = StyleSheet.create({
    overlay: {
        display: 'flex',
        backgroundColor: '#d9f5ef',
        borderRadius: 20,
        marginVertical: 100,

    },
    background: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: 400,
        left: 80,
        overflow: 'hidden',  
    },
    title: {
        fontSize: 24,
        fontFamily: 'Lato-Bold',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 30,
        marginRight: 30,
    },
    contentRow: {
        marginBottom: 20,
        flexDirection: 'column'
    },
    questionText: {
        fontSize: 18,
        fontFamily: 'Lato-Bold',
        color: '#F7794D',
        marginBottom: 5,
    },
    error: {
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: 'red',
        marginBottom: 5,
    },

    shadowStyle: {
        height: 'auto',
        borderRadius: 10,
    },
    questionInput: {
        borderRadius: 10,
        height: 40,

        backgroundColor: 'white',

        paddingHorizontal: 12,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
    },
    buttonSelectView: {
        display: 'flex',
        flex: 1,
        paddingHorizontal: 5,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.4)',
        elevation: 5,
    },
    buttonUnselected: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    buttonSelected: {
        backgroundColor: '#3FCEB066',
        borderRadius: 10,
    },
    buttonTypeText: {
        color: 'black',
        fontFamily: 'Lato-Regular'
    },

    submitView: {
        marginHorizontal: 10,
        marginBottom: 10,
        minHeight: 50,
        borderRadius: 20,

        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowRadius: 2,
        shadowOpacity: 1,
        shadowColor: 'rgba(0,0,0,0.4)',
    },
    buttonSubmit: {
        borderRadius: 20,
    },
})

function datefinder(dateObject) {
    const months = ["January", "February", "March","April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formatted_date = months[dateObject.getMonth()] + " " + dateObject.getDate() + ', ' + dateObject.getFullYear()
    return formatted_date;
};

export default class GoalAdd extends React.Component {

    constructor(props) {
        super(props);

        var currdate = new Date();

        this.state = {
            goalName: '',
            type: 'none',
            date: datefinder(currdate),
            dateISO: currdate.toISOString(),
            notes: '',

            errorName: false,
            errorType: false,
            scrollOffset: 0,
        }
        this.scrollViewRef = React.createRef();
    }

    handleOnScroll = (e) => {
        this.setState({
            scrollOffset: e.nativeEvent.contentOffset.y
        })
    }

    handleScrollTo = (p) => {
        if (this.scrollViewRef.current) {
            this.scrollViewRef.current.scrollTo(p);
            console.log(this.scrollViewRef.current)
        }
    }

    setGoalName = (text) => {
        this.setState({goalName: text})
    }
    selectedShort = () => {
        this.setState({type: 'short'})
    }

    selectedLong = () => {
        this.setState({type: 'long'})
    }

    changeDate = (e, date) => {
        this.setState({
            date: datefinder(date),
            dateISO: date.toISOString()
        })
    }

    setNotes = (text) => {
        this.setState({notes: text})
    }

    closeModal = () => {
        var currdate = new Date();
        this.setState({
            goalName: '',
            type: 'none',
            date: datefinder(currdate),
            dateISO: currdate.toISOString(),
            note: '',

            errorName: false,
            errorType: false,
        });
        this.props.handleOpen()
    }

    createGoal = () => {
        const nameCheck = this.state.goalName === ''
        const typeCheck = this.state.type === 'none'
        this.setState({
            errorName: nameCheck,
            errorType: typeCheck
        })
        if (!nameCheck && !typeCheck) {
            console.log("FULL") 
        }
    }

    render = () => {

        let ButtonRow;
        if (this.state.type === 'none') {
            ButtonRow = (
                <React.Fragment>
                    <View style={styles.buttonSelectView}>
                        <Button
                            title='Short-Term'
                            buttonStyle={styles.buttonUnselected}
                            titleStyle={styles.buttonTypeText}
                            onPress={this.selectedShort}/>
                    </View>
                    <View style={styles.buttonSelectView}>
                        <Button
                            title='Long-Term'
                            buttonStyle={styles.buttonUnselected}
                            titleStyle={styles.buttonTypeText}
                            onPress={this.selectedLong}/>
                    </View>
                </React.Fragment>
            )
        }
        else if (this.state.type === 'short') {
            ButtonRow = (
                <React.Fragment>
                    <View style={styles.buttonSelectView}>
                        <InsetShadow
                                containerStyle={styles.shadowStyle}
                                bottom={false}
                                shadowRadius={5}>
                        <Button
                            title='Short-Term'
                            buttonStyle={styles.buttonSelected}
                            titleStyle={styles.buttonTypeText}
                            onPress={this.selectedShort}/>
                        </InsetShadow>
                    </View>
                    <View style={styles.buttonSelectView}>
                        <Button
                            title='Long-Term'
                            buttonStyle={styles.buttonUnselected}
                            titleStyle={styles.buttonTypeText}
                            onPress={this.selectedLong}/>
                    </View>
                </React.Fragment>
            )
        }
        else if (this.state.type === 'long') {
            ButtonRow = (
                <React.Fragment>
                    <View style={styles.buttonSelectView}>
                        <Button
                            title='Short-Term'
                            buttonStyle={styles.buttonUnselected}
                            titleStyle={styles.buttonTypeText}
                            onPress={this.selectedShort}/>
                    </View>
                    <View style={styles.buttonSelectView}>
                        <InsetShadow
                                containerStyle={styles.shadowStyle}
                                bottom={false}
                                shadowRadius={5}>
                            <Button
                                title='Long-Term'
                                buttonStyle={styles.buttonSelected}
                                titleStyle={styles.buttonTypeText}
                                onPress={this.selectedLong}/>
                        </InsetShadow>
                    </View>
                </React.Fragment>
            )
        }

        return (
                <Modal
                    isVisible={this.props.open}
                    onBackdropPress={this.closeModal}
                    useNativeDriver={true}
                    propagateSwipe={true}
                    animationIn='bounceIn'
                    animationInTiming={1000}
                    scrollOffset={this.state.scrollOffset}
                    scrollTo={this.handleScrollTo}>

                    

                    <ScrollView
                        style={styles.overlay}
                        scrollEventThrottle={16}
                        ref={this.scrollViewRef}
                        onScroll={this.handleOnScroll}
                        bounces={false}>

                    <View style={{display: 'flex', flex: 1}}>
                        <Image
                            style={[styles.background]}
                            source={require('../static/left_wreath.png')}/>
                        <Header
                            centerComponent={<Text style={styles.title}>Add Goal</Text>}
                            rightComponent={<Button
                                                type='clear'
                                                icon={<Icon name='close' color='black' size={30}/>}
                                                onPress={this.closeModal}/>}
                            backgroundColor='transparent'
                            containerStyle={{paddingTop: 0, marginTop: 0}}
                        />
                        <View style={styles.mainContent}>
                            <View style={styles.contentRow}>
                                <Text style={styles.questionText}>What is your goal?</Text>
                                {this.state.errorName && <Text style={styles.error}>*Please specify your goal</Text>}
                                <InsetShadow
                                    containerStyle={styles.shadowStyle}
                                    bottom={false}
                                    shadowRadius={5}>
                                    <TextInput
                                        style={styles.questionInput}
                                        placeholder='Max. 24 characters'
                                        maxLength={24}
                                        value={this.state.goalName}
                                        onChangeText={this.setGoalName}/>
                                </InsetShadow>
                            </View>

                            <View style={styles.contentRow}>
                                <Text style={styles.questionText}>What is the goal type?</Text>
                                {this.state.errorType && <Text style={styles.error}>*Please select a type</Text>}
                                <View style={{flexDirection: 'row', flex:1, display: 'flex',}}>
                                    {ButtonRow}
                                </View>
                            </View>

                            <View style={styles.contentRow}>
                                <Text style={styles.questionText}>What is your deadline?</Text>
                                <AccordionTextInput
                                    title={this.state.date}
                                    dateISO={this.state.dateISO}
                                    onChange={this.changeDate}
                                    />
                            </View>


                            <View style={styles.contentRow}>
                                <Text style={styles.questionText}>Additional Notes</Text>
                                <InsetShadow
                                    containerStyle={styles.shadowStyle}
                                    bottom={false}
                                    shadowRadius={5}>
                                <TextInput
                                    style={[styles.questionInput,{height: 120, paddingTop: 12}]}
                                    multiline
                                    numberOfLines={3}
                                    placeholder='Details go here!'
                                    value={this.state.notes}
                                    onChangeText={this.setNotes}/>
                                </InsetShadow>
                            </View>

                        </View>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            style={{marginHorizontal: 20, borderRadius: 30, marginBottom: 10}}
                            colors={['#FFFFFF00', '#010A2010', '#3FCEB030','#3FCEB00F']}>
                            <View style={styles.submitView}>
                                <Button 
                                    title='Create'
                                    ViewComponent={LinearGradient}
                                    linearGradientProps={{
                                        colors: ['#010A20', '#41C3A7'],
                                        start: {x: 0, y: 0},
                                        end: {x: 0.7, y: 0.7},
                                        angle: 45,
                                    }}
                                    buttonStyle={styles.buttonSubmit}
                                    onPress={this.createGoal}/>
                            </View>
                        </LinearGradient>
                    
                    </View>
                    </ScrollView>
                </Modal>
        )
    }
}