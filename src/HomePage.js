import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import Background from './Background';
import { useNavigation } from '@react-navigation/native';
import { logout } from './ApiService';
import LogoutDialog from './LogoutDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomePage = () => {
    const navigation = useNavigation();
    const [employeeName, setEmployeeName] = useState('');
    const [designationName, setDesignationName] = useState('');

    useEffect(() => {
        getLoginData();
        
    }, []);

    const getLoginData = async () => {
        try {
            const loginInfo = await AsyncStorage.getItem('loginInfo');
            if (loginInfo) {
                const { employeeName, designationName } = JSON.parse(loginInfo);
                setEmployeeName(employeeName);
                setDesignationName(designationName);
            }
        } catch (error) {
            console.error('Error fetching employeeName:', error);
        }
    };

    const handleFirstImageClick = () => {
        navigation.navigate("CaseList");

    }

    const handleBackPress = () => {
        // Exit the app when the hardware back button is pressed or pop gesture on iOS
       
 //       BackHandler.exitApp();
    };

    const handleLogout = async () => {
        // Call the logout API

        try {

            const loginInfo = await AsyncStorage.getItem('loginInfo');

            const { employeeId, employeeName, deviceId, designationName, token } = JSON.parse(loginInfo);

            const mobileRequestEntity = {
                employeeId,
                employeeName,
                deviceId,
                designationName,
                token
            };

            const logoutDialog = new LogoutDialog({
                onConfirm: async () => {
                    // Call the logout API only when the user confirms
                    const response = await logout(mobileRequestEntity);
    
                    if (response.status === 200) {
                        // Clear AsyncStorage on successful logout
                        await AsyncStorage.setItem('isLoggedIn', '0');
                        await AsyncStorage.removeItem('loginResponseEntityToken');
                        await AsyncStorage.removeItem('loginInfo');
    
                        navigation.replace('Login');
                    } else {
                        console.error('Logout API failed:', response);
                    }
                },
            });
    
            logoutDialog.show();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Background >

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "95%", marginTop:45 }}>

                <View style={{ flexDirection: 'column', width: "10%" ,marginEnd:5}}>
                    <Image source={require("./assets/profile.png")} style={{ height: 60, width: 65}} />

                </View>

                <View style={{ flexDirection: 'column', width: "60%" }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Hello,</Text>
                        <Text style={{ color: 'white', fontSize: 18 }}>{employeeName}</Text>

                    </View>
                    <Text style={{ color: 'white', fontSize: 18 }}>{designationName}</Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Image source={require('./assets/logout.png')} style={{ height: 30, width: 30, alignItems: 'flex-end' }} />
                    </TouchableOpacity>
                </View>

              
            </View>



            <View style={{ alignItems: 'center', width: 400, marginTop: 150 }}>
                <Text style={{ fontSize: 52, color: 'white', fontWeight: 'bold', marginVertical: 10 }}>Login</Text>
            </View>
            <View style={{ backgroundColor: 'white', height: 500, width: 400, borderTopLeftRadius: 100 }}>
                <View style={{ flexDirection: 'row', marginTop: 150, alignItems: 'center', position: 'absolute' }}>

                    <TouchableOpacity onPress={handleFirstImageClick}>
                        <View style={{ marginHorizontal: 20 }}>
                            <Image source={require("./assets/caseList.png")} style={{ height: 180, width: 150 }} />
                            <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>Case List</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFirstImageClick}>

                    <View style={{ marginHorizontal: 20 }}>
                        <Image source={require("./assets/summon.png")} style={{ height: 180, width: 150 }} />
                        <Text style={{ textAlign: 'center', color: 'black', fontSize: 20 }}>Summon List</Text>
                    </View>
                                        </TouchableOpacity>

                </View>

            </View>

        </Background>
    );
}

export default HomePage;