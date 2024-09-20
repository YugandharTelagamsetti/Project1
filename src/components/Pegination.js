import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Pegination = ({data}) => {

    return(
        <View style={styles.container}>
            {data.map((_, idx) => {
                return <View key={idx.toString()} style={styles.dot}/> 
            }
            )}
        </View>
    )

}
export default Pegination;

const styles = StyleSheet.create({

    dot : {
        width:12,
        height:12,
        borderRadius:6,
        backgroundColor:'#ccc',
       marginHorizontal:3
    },
    container : {
        flexDirection:'row',
        position:'absolute',
        bottom:100,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
});