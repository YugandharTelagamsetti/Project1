import React, { useEffect } from 'react';
import { View, Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage  from './HomePage';
import Login from './Login';
import SplashScreen from 'react-native-splash-screen';


const Splash = ({ navigation }) => {
  useEffect(() => {
    const checkFirstTimeLaunch = async () => {
      try {
        const isFirstTimeLaunch = await AsyncStorage.getItem('isFirstTimeLaunch');

        if (isFirstTimeLaunch === null) {
          // First time launch
          await AsyncStorage.setItem('isFirstTimeLaunch', 'true');
          navigation.replace('WelcomeScreen');
        } else {
          // Not the first time launch
          checkLoginStatus();
        }
      } catch (error) {
        console.error('Error checking first time launch:', error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (isLoggedIn === '1') {
          // User is logged in
          navigation.replace('Home');
        } else {
          // User is not logged in
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkFirstTimeLaunch();
    SplashScreen.hide();
  }, [navigation]);

  return null;
};


export default Splash;
