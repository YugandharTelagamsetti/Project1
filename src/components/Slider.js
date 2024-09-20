import React, { useState, useRef } from "react";
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Slides from "../Slides";
import SlideItem from "./SlideItem";
import Pegination from "./Pegination";
import Btn from "../Btn";
import { darkgreen } from "../assets/colors";
import Login from "../Login";
import { useNavigation } from '@react-navigation/native';

const Slider = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < Slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }else {
            props.navigation.replace('Login'); 
        }
    };

    const handleSkip = () => {
        props.navigation.replace('Login'); // Use the navigation prop directly
    };

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={Slides}
                renderItem={({ item }) => <SlideItem item={item} />}
                snapToAlignment="center"
                horizontal
                pagingEnabled
                onMomentumScrollEnd={(event) => {
                    const offset = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / event.nativeEvent.layoutMeasurement.width);
                    setCurrentIndex(index);
                }}
            />

            <Pegination data={Slides} />

            <View style={styles.buttonContainer}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start', width: "50%" }}>

                    <TouchableOpacity style={styles.btn} onPress={handleSkip}>
                        <Text >SKIP</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', width: "50%" }}>
                    <TouchableOpacity style={styles.btn} onPress={handleNext}>
                        <Text>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Slider;

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },

    btn: {
        backgroundColor: darkgreen,
        borderRadius: 100,
        alignItems: 'center',
        width: 70,
        paddingVertical: 5,
        marginVertical: 10,
    },
});
