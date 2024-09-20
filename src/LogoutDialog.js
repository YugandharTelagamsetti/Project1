import React from 'react';
import { Alert } from 'react-native';

const LogoutDialog = ({ onConfirm }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: onConfirm,
        },
      ],
      { cancelable: false }
    );
  };

  return {
    show: handleLogout,
  };
};

export default LogoutDialog;
