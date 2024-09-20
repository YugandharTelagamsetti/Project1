import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { darkgreen } from './assets/colors';

const SuccessScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust the range for the desired movement
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imageContainer, { transform: [{ translateY }] }]}>
        <Image
          source={require("./assets/success.png")}
          style={styles.image}
        />
        <Text style={styles.bigText}>Welcome</Text>
        <Text style={styles.errorText}>Login success</Text>
      </Animated.View>

      <View style={styles.separator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 10, // For Android
        shadowColor: 'black', // For iOS shadow
        shadowOpacity: 0.5, // Adjust for stronger or softer shadow
        shadowRadius: 10, // Spread of the shadow
        shadowOffset: { width: 0, height: 5 }, // Position of the shadow
        backgroundColor: 'darkgreen',
    },

    container: {
        flex: 1,
        justifyContent: 'flex-end', // Align content at the bottom of the screen
    },
    buttonContainer: {
        alignSelf: 'center',

    },
    imageContainer: {
        marginBottom: 20,
        alignContent: 'center',
    },

    button: {
        backgroundColor: darkgreen,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        resizeMode: 'contain', // Choose the appropriate resizeMode
        alignSelf: 'center'
    },
    errorText: {
        color: 'green',
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
        alignSelf: 'center',
        textAlign: 'center'
    },
    separator: {
        marginTop: 20,
        width: '100%',
        height: 250,
        borderTopLeftRadius: 300,// Adjust this value to control the curvature
        backgroundColor: darkgreen, // Match the button background color
    },
    bigText: {
        color: 'green',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'sans-serif',
        textAlign: 'center'

    },
});

export default SuccessScreen;
