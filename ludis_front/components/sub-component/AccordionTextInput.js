import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import InsetShadow from 'react-native-inset-shadow'
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    title:{
        fontSize: 16,
        borderRadius: 10,
        color: 'black',
        fontFamily: 'Lato-Regular',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:40,
        paddingHorizontal: 12,
        alignItems:'center',
        backgroundColor: 'white',
    },
    child:{
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 0
    },
    shadowStyle: {
        height: 'auto',
        borderRadius: 10,
    },
});

export default class AccordionTextInput extends React.Component{

    constructor(props) {
        super(props);
        this.state = { 
          innerComponent: props.innerComponent,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
    render() {

        return (
           <View>
                <InsetShadow
                    containerStyle={styles.shadowStyle}
                    bottom={false}
                    shadowRadius={5}>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color='black' />
                </TouchableOpacity>
                </InsetShadow>
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <DateTimePicker
                          value={new Date(this.props.dateISO)}
                          display="default"
                          onChange={this.props.onChange}
                        />
                    </View>
                }
                
           </View>
        )
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}
