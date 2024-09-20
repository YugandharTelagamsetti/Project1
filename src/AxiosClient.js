import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiService = axios.create({
  baseURL: 'https://squareupuate.com/squareupdevwosubcomponentsbe/mobile/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },

});
// Use an interceptor to modify headers before each request
apiService.interceptors.request.use(
  async (config) => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn == 1) {
      const loginInfoo = await AsyncStorage.getItem('loginInfo');
      const loginInfo = JSON.parse(loginInfoo);

      if (loginInfo && loginInfo != null) {
        // Add headers from loginInfo
        const ulbList = loginInfo.ulbList[0]
        if (ulbList) {
          // Add headers from loginInfo
          config.headers['employeeDesignationId'] = ulbList.employeeDesignationId;
          config.headers['employeeId'] = ulbList.employeeId;
          config.headers['ulbCode'] = ulbList.ulbCode;
          config.headers['designationId'] = String(ulbList.designationId);
        }
      }

    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiService.interceptors.response.use(
  function (response) {
    if (response) return response;
    else {
      var message = 'We had trouble connecting to the server';
      if (response.data.message) message = response.data.message;
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  },

);


export default apiService;
