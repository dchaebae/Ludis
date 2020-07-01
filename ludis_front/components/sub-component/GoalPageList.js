import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Animated,
} from 'react-native'
import {
    Text,
    ListItem,
} from 'react-native-elements'
import {
    HEADER_MAX_HEIGHT
} from '../Constants'
import Swipeable from "react-native-gesture-handler/Swipeable"
import Dots from 'react-native-dots-pagination';
import { datefinderShort } from '../utilities'

const styles = StyleSheet.create({
    viewArea: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        borderRadius: 20,
        elevation: 5,

        paddingBottom: 30,
        paddingHorizontal: 24,
        marginTop: 50,
    },
    titleWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 22,
        fontFamily: 'Lato-Bold',
        marginVertical: 8,
        marginHorizontal: 10
    },

    listWrapper: {
        width: '100%',
    },

    subtitle: {
        fontSize: 19,
        color: '#F7794D',
        fontFamily: 'Lato-Regular',
        marginLeft: 12,
        marginBottom: 7
    }

});

export default class GoalPageList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            activeList: 0
        }
    }

    renderArchive = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [-300, 0],
            outputRange: [0, 400],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View style={{flex:1, transform: [{translateX: trans}]}}>
                <Text style={styles.subtitle}>
                    Completed
                </Text>
                <View style={styles.listWrapper}>
                    { this.props.completedData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.due_date}
                                    titleStyle={{
                                        fontFamily: 'Lato-Regular',
                                        marginBottom: 3,
                                        fontSize: 17}}
                                    subtitle={item.name}
                                    subtitleStyle={{
                                        fontFamily: 'Lato-Regular',
                                        fontWeight: '700',
                                        fontSize: 17}}
                                    chevron= {{
                                        size: 30,
                                        color: '#3fceb0'
                                    }}
                                    checkBox={{
                                        uncheckedIcon: 'square-o',
                                        checked: true,
                                        color: '#3fceb0',
                                        checkedIcon: 'check-square-o',
                                        size: 30,
                                        uncheckedColor: '#F7794D'
                                    }}
                                    topDivider
                                />
                                
                            ))}
                </View>
            </Animated.View>
        );
    }

    render() {
        return (
            <View style={styles.viewArea}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <Dots 
                    length={2}
                    active={this.state.activeList}
                    activeColor={'#3fceb0'}
                    activeDotHeight={14}
                    passiveDotHeight={10}
                    activeDotWidth={14}
                    passiveDotWidth={10}
                    paddingHorizontal={2}
                    width={100}/>
                <Swipeable
                    friction={1}
                    renderRightActions={this.renderArchive}
                    onSwipeableOpen={() => this.setState({activeList: 1})}
                    onSwipeableClose={() => this.setState({activeList: 0})}>
                    <View>
                        <Text style={styles.subtitle}>
                            Active
                        </Text>
                        <View style={styles.listWrapper}>
                            { this.props.activeData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={datefinderShort(new Date(item.due_date))}
                                    titleStyle={{
                                        fontFamily: 'Lato-Regular',
                                        marginBottom: 3,
                                        fontSize: 17}}
                                    subtitle={item.name}
                                    subtitleStyle={{
                                        fontFamily: 'Lato-Regular',
                                        fontWeight: '700',
                                        fontSize: 17}}
                                    chevron= {{
                                        size: 30,
                                        color: '#3fceb0'
                                    }}
                                    checkBox={{
                                        uncheckedIcon: 'square-o',
                                        checked: false,
                                        checkedIcon: 'check-square-o',
                                        size: 30,
                                        uncheckedColor: '#F7794D'
                                    }}
                                    topDivider
                                />
                                
                            ))}
                        </View>
                    </View>
                </Swipeable>
            </View>
        );
    }
}