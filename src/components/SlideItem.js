import React from "react";
import { Image, StyleSheet, Text, View , Dimensions} from "react-native";

const {width, height} = Dimensions.get('screen');

const SlideItem = ({item}) =>{

    return(
        <View style={styles.container}>
            <Image source={item.image} resizeMode="contain" style={styles.image}/>

            <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    )

}
export default SlideItem;

const styles = StyleSheet.create(
    {
        container : {
            alignItems:'center',
            width,
            height
           
        },

        image : {
            flex:0.6,
            width:'70%',
            
        },

        title : {
            alignItems:'center',
            fontSize:20,
            fontStyle:'normal',
            textAlign:'center', 
            color:'black'
        },
        description :{
            alignItems:'center',
            fontSize:15,
            fontStyle:'normal',
            textAlign:'center', 
            color:'black'
        }
    }
);