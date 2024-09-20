import React from 'react';
import {TextInput} from 'react-native';
import { darkgreen } from './assets/colors';

const Field = props => {
  return (
    <TextInput
    {...props}
    style={{borderRadius:100,color: darkgreen, paddingHorizontal:20,width:"78%",paddingVertical:15,
    backgroundColor:'rgb(220,220,220)', marginVertical:10
   }}
     placeholderTextColor={darkgreen}
    >
    </TextInput>

  );
}


export default Field;