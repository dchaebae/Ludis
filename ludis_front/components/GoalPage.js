import React from 'react';
import {
    View,
    ImageBackground,
    Animated,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';
import {
    Icon,
    Header,
    Button,
} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import GoalPageList from './sub-component/GoalPageList'
import GoalAdd from './sub-component/GoalAdd'
import {
    HEADER_MAX_HEIGHT,
    HEADER_MIN_HEIGHT,
    HEADER_SCROLL_DISTANCE
} from './Constants';
import axios from 'axios';
import { API_PATH } from './Constants'
import {insertItem} from './utilities'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    headerContainerShadowWrapper: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        elevation: 5,
    },
    headerContainer: {
        overflow: 'hidden',
    },
    background: {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        overflow: 'hidden',
        
        height: HEADER_MAX_HEIGHT,
    },
    header: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },

    // content inside header
    // the first row
    headerFirstRow: {
        flexDirection: 'row',
        height: HEADER_MIN_HEIGHT,
        justifyContent: 'space-between',
        margin: 10,
    },
    headerMenuWrapper: {
        flex: 1,
        alignItems: 'flex-start',
        zIndex: 10,
    },
    headerAddWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        zIndex: 10,
    },
    headerTitleWrapper: {
        flex: 5,
        textAlign: 'center',
        alignItems: 'center',
        zIndex: 5,
        marginTop: 10,
    },
    headerTitle: {
        fontFamily: 'Lato-Bold',
        color: 'white',
    },

    headerSummaryRow: {
        flexDirection: 'row',
        marginTop: 5,
        height: 150,
    },
    headerSummaryWrapperLeft: {
        flex: 1,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'flex-start',
        marginLeft: 5
    },
    headerSummaryWrapperRight: {
        flex: 1.5,
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'flex-start',
        marginRight: 5
    },
    headerSubSummaryWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerMainLaurel: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    headerSubLaurel: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        resizeMode: 'contain',
        justifyContent: 'center'
    },
    headerDataNumber: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
        transform: [
            {translateY: -10}
        ]
    },
    headerDataText: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        fontFamily: 'Lato-Bold',
        textAlign: 'center',
    },

    goalsScrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
        zIndex: 30,
    },
    goalsFlexContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '90%',
        backgroundColor:'transparent',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 500,
        top:50,
    },
});

const gradProps = {
    colors: ['#010A20D9', '#008069D9'],
    start: { x: 0.0, y: 0.0 },
    end: { x: 0.6, y:0.7 },
};

class GoalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0, {useNativeDriver: true}),
            addOpen: false,
            shortActive: [],
            shortCompleted: [],
            longActive: [],
            longCompleted: [],
        }
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.updateShort = this.updateShort.bind(this);
        this.updateLong = this.updateLong.bind(this);
    }

    handleAddOpen = () => {
        this.setState(state => ({
            addOpen: !state.addOpen
        }))
    }

    componentDidMount() {
        axios.get(API_PATH+'/api/v1/goals')
            .then((response) => {
                shortActive = [];
                shortCompleted = [];
                longActive = [];
                longCompleted = [];
                response.data.forEach(function (item) {
                    if (!item.is_completed) {
                        if (item.type === 'long_term') {
                            longActive.push(item)
                        }
                        else {
                            shortActive.push(item)
                        }
                    }
                    else {
                        if (item.type === 'long_term') {
                            longCompleted.push(item)
                        }
                        else {
                            shortCompleted.push(item)
                        }
                    }
                })

                this.setState({
                    longActive: longActive,
                    shortActive: shortActive,
                    longCompleted: longCompleted,
                    shortCompleted: shortCompleted,
                })
            })
    }

    updateShort(item) {
        var copy = [...this.state.shortActive]
        copy = insertItem(copy, item)
        this.setState({
            shortActive: copy
        })
    }

    updateLong(item) {
        var copy = [...this.state.longActive]
        copy = insertItem(copy, item)
        this.setState({
            longActive: copy
        })
    }

    // get the navigation element
    _getNavigation = () => {
        return useNavigation();
    }

    // interpolate header height
    _getHeaderHeight = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, 40, 90, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, 235, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    }

    // interpolate rounding of header bottom
    _getHeaderRounding = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/4, HEADER_SCROLL_DISTANCE],
            outputRange: [100, 0, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    }

    _getHeaderShadowOpacity = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE*1/4, HEADER_SCROLL_DISTANCE],
            outputRange: [0.8, 0, 0],
            extrapolate: 'clamp',
            useNativeDriver: true,
        });
    }

    _getHeaderTitleXPosition = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE*1/3, HEADER_SCROLL_DISTANCE],
            outputRange: ['-70%', '0%', '0%'],
            extrapolate: 'clamp',
            useNativeDriver: true,
        })
    }

    _getHeaderTitleYPosition = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE*1/3, HEADER_SCROLL_DISTANCE],
            outputRange: ['45%', '0%', '0%'],
            extrapolate: 'clamp',
            useNativeDriver: true,
        })
    }

    _getHeaderTitleFontSize = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/4, HEADER_SCROLL_DISTANCE],
            outputRange: [28, 21, 21],
            extrapolate: 'clamp',
            useNativeDriver: true,
        })
    }

    _getHeaderDataOpacity = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE/4, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 0, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        })
    }

    _getHeaderZIndex = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, 60, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 31, 31],
            extrapolate: 'clamp',
            useNativeDriver: true
        })
    }

    _getScrollViewTop = () => {
        return this.state.scrollY.interpolate({
            inputRange: [0, 180, HEADER_SCROLL_DISTANCE],
            outputRange: [230, 0, 0],
            extrapolate: 'clamp',
            useNativeDriver: true
        })
    }

    render() {
        const headerHeight = this._getHeaderHeight();
        const headerRounding = this._getHeaderRounding();
        const headerShadowOpacity = this._getHeaderShadowOpacity();
        const titleXOffset = this._getHeaderTitleXPosition();
        const titleYOffset = this._getHeaderTitleYPosition();
        const titleFontSize = this._getHeaderTitleFontSize();
        const dataOpacity = this._getHeaderDataOpacity();
        const headerZIndex = this._getHeaderZIndex();
        const scrollViewTop = this._getScrollViewTop();

        return (
            <View style={styles.container}>

            <Animated.View style={[styles.headerContainerShadowWrapper, {
                shadowOpacity: headerShadowOpacity,
                zIndex: headerZIndex,
            }]}>
                <Animated.View
                    style={[styles.headerContainer, {
                        height: headerHeight,
                        borderBottomLeftRadius: headerRounding,
                        borderBottomRightRadius: headerRounding,
                    }]}>
                <ImageBackground
                        style={styles.background}
                        source={require('./static/climbing.jpeg')}
                        imageStyle={{
                            resizeMode: "cover",
                            left: undefined
                        }}>
                        <Header
                            ViewComponent={LinearGradient}
                            linearGradientProps = {gradProps}
                            barStyle={'light-content'}
                            containerStyle={styles.header}>

                            <View style={styles.headerFirstRow}>
                                <View style={styles.headerMenuWrapper}>
                                <Button 
                                    type='clear'
                                    icon={<Icon name='menu' color='white' size={30}/>}
                                    onPress={() => this.props.navigation.openDrawer()}/>
                                </View>
                                <Animated.View style={[styles.headerTitleWrapper, {
                                    transform: [
                                        {translateX: titleXOffset},
                                        {translateY: titleYOffset}
                                    ]}]}>
                                    <Animated.Text style={[styles.headerTitle, {
                                        fontSize: titleFontSize}]}>
                                        Your Milestones
                                    </Animated.Text>
                                </Animated.View>
                                <View style={styles.headerAddWrapper}>
                                <Button 
                                    type='clear'
                                    icon={<Icon name='add' color='white' size={30}/>}
                                    onPress={this.handleAddOpen}/>
                                </View>
                            </View>

                            <Animated.View style={[styles.headerSummaryRow, {opacity: dataOpacity}]}>
                                <View style={styles.headerSummaryWrapperLeft}>
                                    <ImageBackground
                                        style={styles.headerMainLaurel}
                                        source={require('./static/wreath.png')}>
                                        <Text style={styles.headerDataNumber}>
                                            {this.state.longCompleted.length + this.state.shortCompleted.length}
                                        </Text>
                                    </ImageBackground>
                                    <Text style={[styles.headerDataText, {flex: 0.5}]}>
                                        Total{"\n"}Completed
                                    </Text>
                                </View>
                                <View style={styles.headerSummaryWrapperRight}>
                                    <View style={styles.headerSubSummaryWrapper}>
                                        <ImageBackground
                                            style={styles.headerSubLaurel}
                                            source={require('./static/wreath.png')}
                                            imageStyle={{
                                            }}>
                                            <Text style={styles.headerDataNumber}>
                                                {this.state.shortActive.length}
                                            </Text>
                                        </ImageBackground>
                                        <Text style={styles.headerDataText}>
                                            Short-Term{"\n"}Goals
                                        </Text>
                                    </View>
                                    <View style={styles.headerSubSummaryWrapper}>
                                        <ImageBackground
                                            style={styles.headerSubLaurel}
                                            source={require('./static/wreath.png')}>
                                            <Text style={styles.headerDataNumber}>
                                                {this.state.longActive.length}
                                            </Text>
                                        </ImageBackground>
                                        <Text style={styles.headerDataText}>
                                            Long-Term{"\n"}Goals
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>
                        </Header>
                    </ImageBackground>
                </Animated.View>
            </Animated.View>

            <Animated.View style={[styles.goalsScrollView, {marginTop: scrollViewTop}]}>
            <Animated.ScrollView
                bounces={false}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: false}
                )}
                style={{width: '100%'}}
                > 
                    <View style={styles.goalsFlexContainer}>
                        <GoalPageList
                            title={'Short-Term Goals'}
                            activeData={this.state.shortActive}
                            completedData={this.state.shortCompleted}/>
                        <GoalPageList
                            title={'Long-Term Goals'}
                            activeData={this.state.longActive}
                            completedData={this.state.longCompleted}/>
                    </View>
            </Animated.ScrollView>
            </Animated.View>

            <GoalAdd
                open={this.state.addOpen}
                handleOpen={this.handleAddOpen}
                updateShort={this.updateShort}
                updateLong={this.updateLong}/>

            </View>
        );
    }
}

export default GoalPage;