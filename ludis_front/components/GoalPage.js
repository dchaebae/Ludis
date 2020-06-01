import React from 'react';
import {
    Text,
    ScrollView,
    View,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class GoalPage extends React.Component {
    render() {
        return (
            <ScrollView bounces={false}>
                <StatusBar barStyle='light-content'/>
                <SafeAreaView
                    style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3fceb0' }}>
                        <Text>This is top text.</Text>
                        <Text>This is bottom text.</Text>
                </SafeAreaView>
                <View style={{height:1500}}>
                    <Text>Hey</Text>
                </View>
            </ScrollView>
        );
    }
}

export default GoalPage;