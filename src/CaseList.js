import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity , ActivityIndicator, RefreshControl,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTotalDateFormatted } from './Utils';


import { useDispatch, useSelector } from 'react-redux';
import { clearProjectDetailsData, projectDetailsList } from './store/slices/ProjectDetailsSlice';
import FailureScreen from './FailureScreen';
import checkNetworkConnectivity from './utils/NetworkUtils';

const CaseList = ({ item, route }) => {

  const [offset, setOffset] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [searchValue, setSearchValue] = useState('');
  const [currentStatus, setcurrentStatus] = useState(null);


  const [totalItems, setTotalItems] = useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(null);


  const navigation = useNavigation();
 
  let [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const { showSearchBar } = route.params || {};

  const dispatch = useDispatch();
  const dispatch = useDispatch();

  // const {projectDetailsData,isLoading,isSuccess} =useSelector((state)=>{(projectDetailsData:state.projectDetails.pr)});
  // GOOD: instead, select only the state you need, calling useSelector as many times as needed
  const projectDetailsData = useSelector((state) => state.projectDetails.projectDetailsData);
  const isLoading = useSelector((state) => state.projectDetails.isLoading);
  const isSuccess = useSelector((state) => state.projectDetails.isSuccess);
  const isError = useSelector((state) => state.projectDetails.isError);
  const statusCode = useSelector((state) => state.projectDetails.statusCode);





  const projectDetailsData = useSelector((state) => state.projectDetails.projectDetailsData);
  const isLoading = useSelector((state) => state.projectDetails.isLoading);
  const isSuccess = useSelector((state) => state.projectDetails.isSuccess);
  const isError = useSelector((state) => state.projectDetails.isError);
  const statusCode = useSelector((state) => state.projectDetails.statusCode);








  const [refreshing, setRefreshing] = useState(false);
  const [refreshSuccessMessage, setRefreshSuccessMessage] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(clearProjectDetailsData());

    try{
      setOffset(1);
      setSearchValue(null);
      setRefreshSuccessMessage(true);
  
      setTimeout(() => {
        setRefreshSuccessMessage(false);
  
      }, 2000);
    }catch( error){
      console.error('Error during refresh',error);
    }finally{
      setRefreshing(false);

    }
   

  }, [pageSize, searchValue, currentStatus]);


  const handleCardPress = () => {
    // Handle card press if needed
  };

  const LoadingFooter = (styleContainer) => (
    <View style={styleContainer}>

  const LoadingFooter = (styleContainer) => (
    <View style={styleContainer}>
      <ActivityIndicator size="medium" color="blue" />
    </View>
  );




  useEffect( () => {
    const isConnected =  checkNetworkConnectivity();
    if(isConnected){
      fetchData(offset, pageSize, searchValue, currentStatus);
    }else{
      console.log('network noo');

    }
    return () => {
      // Dispatch clearProjectDetailsData to reset the state when the component is unmounted
    // dispatch(clearProjectDetailsData());
    };
 
  }, [offset, pageSize, searchValue, currentStatus,dispatch]);
  }, [offset, pageSize, searchValue, currentStatus,dispatch]);
  useEffect(() => {
    return () => {
      // Dispatch clearProjectDetailsData to reset the state when the component is unmounted
     dispatch(clearProjectDetailsData());
    };
 
  }, []);
 
  const fetchData = async (offset, pageSize, searchValue, currentStatus) => {
    try {
      setLoading(true);

      const requestBody = {
        offset: offset,
        pageSize: pageSize,
        searchValue: searchValue,
        currentStatus: currentStatus,
      
      };
     if (searchValue) {
      await dispatch(clearProjectDetailsData());
      await dispatch(projectDetailsList(requestBody));
    } else {
      // Fetch all data
      await dispatch(projectDetailsList(requestBody));
    }
 
      // if (pr.length === 0) {
      //   // If response is empty, show "No data found" message
      //   setData([]);
      //   setTotalItems(0);
      //   setEndOfPage(true);
      // // } else {
      //   const newDataLength = [...data, ...projectDetailsData].length;
      //  setData([...projectDetailsData]);
        
      //}
 
     
    
    } catch (error) {
      console.log(error)
      console.log(error)
    } finally {


      setLoading(false);
    }
  };
 
  const handleEndReached = () => {
    setEndOfPage(projectDetailsData.length<pageSize);

    if (projectDetailsData.length>3&& !loading && !endOfPage) {
      setOffset((prevOffset) => prevOffset + 1);
    }


  };




  const handleViewableItemsChanged = ({ viewableItems }) => {
    setTotalItems(projectDetailsData.length);

    if (viewableItems.length > 0) {
      const lastItem = viewableItems[viewableItems.length - 1];
      setLastVisibleIndex(lastItem.index);
    }
  };


  const handleSearchInputChange = (searchValue) => {
    setSearchValue(searchValue);
    setOffset(1);
    // setData([]);
  };
  const onTryAgain = () => {
    setOffset(1);
    setSearchValue(null);
    
    console.log('api called');
    console.log(isError,projectDetailsData.length );
    // Handle card press if needed

  };

  const onTryAgain = () => {
    setOffset(1);
    setSearchValue(null);
    
    console.log('api called');
    console.log(isError,projectDetailsData.length );
    // Handle card press if needed

  };

  return (
    
    
    <View style={{ flex: 1, position: 'relative' }}>
      {showSearchBar && (
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder='Search'
            placeholderTextColor='black'
            onChangeText={handleSearchInputChange}
            value={searchValue}
          />
        </View>
      )}
      { isError ? (
        <FailureScreen errorMessage={statusCode} onTryAgain={onTryAgain}>
        </FailureScreen>
    
      ) : projectDetailsData.length > 0 ? (
      { isError ? (
        <FailureScreen errorMessage={statusCode} onTryAgain={onTryAgain}>
        </FailureScreen>
    
      ) : projectDetailsData.length > 0 ? (
        <FlatList
          data={projectDetailsData}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => (loading ? <LoadingFooter /> : null)}
          ListHeaderComponent={() => <View style={{ height: 1 }} />}
          onViewableItemsChanged={handleViewableItemsChanged}

          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={refreshing} />
          }

          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleCardPress}>
              <View style={styles.card} key={item.id}>


                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Win Code </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{item.id}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Budget Name   </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{item.workName}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Budget Start Date </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{getTotalDateFormatted(item.startDate)}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Budget End Date   </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{getTotalDateFormatted(item.endDate)}</Text>
                </View>


                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Budget cost</Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}></Text>
                </View>


                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Sender  </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{item.endDate}</Text>
                </View>


                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Receiver </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{item.receiver}</Text>
                </View>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>Status </Text>
                  <Text style={styles.colon}>: </Text>
                  <Text style={styles.itemTitle}>{item.currentStatus}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

      ) : (
        <Text style={{ textAlign: 'center', flex: 1 }}>
          {searchValue ? 'No data found' : <LoadingFooter styleContainer={styles.loadingContainer} />}
        </Text>)}
      
        <Text style={{ textAlign: 'center', flex: 1 }}>
          {searchValue ? 'No data found' : <LoadingFooter styleContainer={styles.loadingContainer} />}
        </Text>)}
      
     {refreshSuccessMessage && (
        <View style={styles.refreshSuccessMessage}>
          <Text style={styles.refreshSuccessText}>Refresh successfully</Text>
        </View>
      )}
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>
          {` ${lastVisibleIndex} of ${totalItems}`}
        </Text>
      </View>


    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },

  titleContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    width: '100%'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    width: '30%'
  },
  colon:{
    width:'10%'
  },

  itemTitle: {
    fontSize: 13,
    marginLeft: 4,
    width: '50%',
    color: 'black'
  },

  paginationText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    width: '30%',
    left: '36%', // Adjust the left position for centering
    alignItems: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.9)',
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 100, // Adjust the border radius as needed
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  container: {
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 100,
    paddingLeft: 10,
    paddingStart: 20,
    backgroundColor: 'white'
  },
  refreshSuccessMessage: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    left: '37%', // Adjust the left position for centering
    alignItems: 'center',
    backgroundColor: 'rgba(169, 169, 169, 0.9)',
    paddingVertical: 2,
    marginBottom: 20,
    transform:[{translateX: -50}, {translateY: -50}],
    borderRadius: 100, // Adjust the border radius as needed
  },

  refreshSuccessText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    color: 'black'

  },
});


export default CaseList;
