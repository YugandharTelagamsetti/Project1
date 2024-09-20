import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Background from './Background';
import { darkgreen, red } from './assets/colors';
import Field from './Field';
import Btn from './Btn';
import { AUTH_SESSION_OPEN, AUTH_SUCCESS, AUTH_FAILURE, AUTH_UNAUTHORISED } from './assets/constants';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from './ApiService';
import SuccessScreen from './SuccessScreen';




// Move storeData outside of the Login component
const storeData = async (dataToStore) => {
  try {
    // Convert the data to a JSON string before storing
    const jsonString = JSON.stringify(dataToStore);
    await AsyncStorage.setItem('loginResponseEntityToken', dataToStore.token);
    await AsyncStorage.setItem('loginInfo', jsonString);
    await AsyncStorage.setItem('isLoggedIn', '1');
    console.log('Data stored successfully');
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  //for setting password visible 
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);


  const [regId, setRegId] = useState('d5GzFwDRRcSKB6IAOYFx8f:APA91bGI8f5Si-4FcgMIbcdF9uz402IJoLirij5NO10FTiNX3DXnaX_UEF9xqSepxe4l4KAJAwxlxMRc-JCej16dz5UT1AKscr-z0_dMmw5lPp89H25ZXSBJz9TIvgOE0ZyUX8IKPxZ_');
  const [deviceId, setDeviceId] = useState('33fdc0e5b531e669');
  const [deviceModel, setDeviceModel] = useState('RMX2061');
  const [mobileIpAddress, setMobileIpAddress] = useState('192.168.1.54');
  const [mobileLastLocation, setMobileLastLocation] = useState('17.4500963,78.3811002');
  const [mobileVersion, setMobileVersion] = useState('1.0.0');
  // Add other state variables for remaining parameters

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };


  const handleLogin = async () => {
    try {

      
      const requestBody = {
        username: username,
        password: password,
        //   regId: regId,
        //   deviceId: deviceId,
        //   deviceModel: deviceModel,
        // //   mobileIpAddress: mobileIpAddress,
        // //   mobileLastLocation: mobileLastLocation,
        //   mobileVersion: mobileVersion,
        // Add other parameters as needed
      };

      if (!username ) {
        // Check if username or password is empty
        Snackbar.show({
          text: 'Please enter the Username',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: red,
        });
        return;
      }else if(!password){
        Snackbar.show({
          text: 'Please enter the Password',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: red,
        });
        return;
      }

      // Make an API call using Axios with the request body
      const response = await loginUser(username, password);
      if (response.status == 200) {
        const responseData = response.data;
        // Handle the response as needed
        console.log('Login:iii', response.data + response.data.token);
        switch (responseData.status) {
          case AUTH_SUCCESS:
            await storeData(responseData);
            // Handle success case
            setShowSuccessMessage(true);
            setTimeout(() => {
              setShowSuccessMessage(false);
              // Handle success case
              // For example, navigate to the main screen
              props.navigation.replace('Home');
            }, 2500);
            // For example, navigate to the main screen
            break;
          case AUTH_FAILURE:
            Snackbar.show({
              text: 'Some problem occurred.. Please try after some time..',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: red
            });
            break;
          case AUTH_UNAUTHORISED:
            Snackbar.show({
              text: 'Invalid User Name or Password',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: red,
            });
            // Handle unauthorized case
            break;
          case AUTH_SESSION_OPEN:
            Snackbar.show({
              text: 'User already logged in',
              duration: Snackbar.LENGTH_LONG,
              backgroundColor: red
            });
            // Handle unauthorized case
            break;
          // Handle other cases as needed...

          default:
            // Handle default case
            console.error('Login:', 'An unexpected error occurred.');
            break;
        }
      } else {
        Snackbar.show({
          text: 'Some problem occurred.. Please try after some time..',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor: red
        });
      }
      // Reset error state
    } catch (err) {
      // Handle errors
      Snackbar.show({
        text: 'Some problem occurred.... Please try after some time..',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: red,
      });
      console.error('Login:', err.message);
    }
  };

  return (
<View style={{ flex: 1 }}>
{showSuccessMessage ? (
         <SuccessScreen/>
        ):(
    <Background>
     
      {/* Your other UI components */}
      <View style={{ alignItems: 'center', width: 380 }}>
        <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', marginVertical: 10, marginTop: 35 }}>Login</Text>
      </View>
      <View style={{ backgroundColor: 'white', height: 700, width: 380, borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center' }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: darkgreen }}>Welcome Back </Text>
        <Text style={{ fontSize: 19, fontWeight: 'bold', color: "grey", marginBottom: 10 }}>Login to your account </Text>

        <Field placeholder="Username/Email"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', width: '78%', position: 'relative' }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={{
              borderRadius: 100,
              color: darkgreen,
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: 'rgb(220,220,220)',
              marginVertical: 10,
              flex: 1,
            }}
            placeholderTextColor={darkgreen}

          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={{
            position: 'absolute',
            right: 15,
            top: '50%',
            transform: [{ translateY: -10 }], // Center the icon vertically
          }}>
            <Image
              source={
                isPasswordVisible
                  ? require('./assets/open_eye.png')
                  : require('./assets/close_eye.png')
              }
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'flex-end', paddingRight: 16, width: '78%', marginBottom: 100 }}>
          <Text style={{ color: darkgreen, fontWeight: 'bold', fontSize: 16 }}>forgot password?</Text>

        </View >
       
        <Btn bgColor={darkgreen} textColor='white' btnLabel="Log in" Press={handleLogin} />
        <View style={{ display: 'flex' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Don't hava an account?</Text>

        </View>
      </View>

    </Background>
        )}
    
    </View>

  );

};
export default Login;