import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { darkgreen } from './assets/colors';

const FailureScreen = ({ errorMessage, onTryAgain }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("./assets/error.png")}
                    style={styles.image}
                />
                <Text style={styles.bigText}>OOPS!</Text>

                <Text style={styles.errorText}>Something went wrong {'\n'}Please try again...</Text>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button]} onPress={onTryAgain}
                >
                    <Text style={styles.buttonText}>TRY AGAIN</Text>
                </TouchableOpacity>
            </View>
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
        color: 'red',
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
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center'

    },
});

export default FailureScreen;
