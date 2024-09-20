// NetworkUtils.js
import NetInfo from '@react-native-community/netinfo';

const checkNetworkConnectivity =() => {
  try {
    const state =  NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return false;
  }
};

export default checkNetworkConnectivity;
