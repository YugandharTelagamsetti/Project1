import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Slider from './components/Slider';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () =>{
    const navigation = useNavigation(); // Move useNavigation here

    return(
        <SafeAreaView>
      <Slider navigation={navigation} />
        </SafeAreaView>
    )
}
export default WelcomeScreen;