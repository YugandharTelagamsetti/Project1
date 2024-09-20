import apiService from './AxiosClient';


const loginUser = async (username,password) => {

  const requestBody = {
    username: username,
    password: password,
  };

    const response = await apiService.post('authentication/validatelogin', requestBody);
    return response;

};


const logout = async (mobileRequestEntity ) => {
  const response2 = await apiService.post('authentication/logout', mobileRequestEntity);
  return response2;
};

const getCaseList = async (requestBody) => {
  try {

    // const requestBody = {
    //   offset: offset,
    //   pageSize: pageSize,
    //   searchValue: searchValue,
    //   currentStatus: currentStatus,
    
    // };
    const response1 = await apiService.get('gr/details/list', {
      params: {
        offset: requestBody.offset,pageSize: requestBody.pageSize, searchValue:requestBody.searchValue, currentStatus:requestBody.currentStatus
      },
    });

    const responseData = response1.data;
    return responseData;

  } catch (error) {
    console.error('Error fetching case list:', error);
    throw {error}; // Rethrow the error to handle it in the component
  }
};


export { loginUser, getCaseList, logout };
