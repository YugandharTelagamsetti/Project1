import React from 'react';
import { View, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkgreen } from './assets/colors';
import apiService from './AxiosClient';
const Signup = () => {

  const handleApiCall = async () => {
    const params = {
      offset: 1,
      pageSize: 10,
    };
  
    try {
      console.log('API Call Initiated');
  
      // Make your API request using axios
      const response = await apiService.get('contractors/list',params);
  
      console.log('Response Status:', response.status);
      console.log('Response Data:', response.data);
  
      if (response.status === 200) {
        console.log('API Call Successful');
      } else {
        console.log('API Call Failed');
      }
  
    } catch (error) {
      // Handle errors properly
      console.error('Error fetching data:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        console.error('Response Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };
  
  return (
    <Background>
  <View style={{ marginHorizontal:40, marginVertical:100 }}>
          <Text style={{color:'white',fontSize:60}}>Sign Up</Text>
          <Text style={{color:'white',fontSize:60, marginBottom:40}}>Page</Text>
          <Btn bgColor={darkgreen} textColor='white' btnLabel="Api call" Press={handleApiCall}/>


       
  </View>
    </Background>
  );
}


export default Signup;