import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);
  const [refreshSuccessMessage, setRefreshSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endOfPage, setEndOfPage] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const { showSearchBar } = route.params || {};
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const projectDetailsData = useSelector((state) => state.projectDetails.projectDetailsData);
  const isLoading = useSelector((state) => state.projectDetails.isLoading);
  const isError = useSelector((state) => state.projectDetails.isError);
  const statusCode = useSelector((state) => state.projectDetails.statusCode);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(clearProjectDetailsData());
    setOffset(1);
    setSearchValue(null);
    setRefreshSuccessMessage(true);

    setTimeout(() => setRefreshSuccessMessage(false), 2000);
    setRefreshing(false);
  }, []);

  const handleCardPress = () => {
    // Handle card press if needed
  };

  const fetchData = async (offset, pageSize, searchValue, currentStatus) => {
    try {
      setLoading(true);
      const requestBody = {
        offset,
        pageSize,
        searchValue,
        currentStatus,
      };

      await dispatch(projectDetailsList(requestBody));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && !endOfPage) {
      setOffset((prevOffset) => prevOffset + 1);
    }
  };

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setLastVisibleIndex(viewableItems[viewableItems.length - 1].index);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchValue(value);
    setOffset(1);
  };

  const onTryAgain = () => {
    setOffset(1);
    setSearchValue(null);
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {showSearchBar && (
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="black"
            onChangeText={handleSearchInputChange}
            value={searchValue}
          />
        </View>
      )}
      {isError ? (
        <FailureScreen errorMessage={statusCode} onTryAgain={onTryAgain} />
      ) : projectDetailsData.length > 0 ? (
        <FlatList
          data={projectDetailsData}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading ? <LoadingFooter styleContainer={styles.loadingContainer} /> : null}
          onViewableItemsChanged={handleViewableItemsChanged}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleCardPress}>
              <View style={styles.card}>
                {/* Render item details here */}
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ textAlign: 'center', flex: 1 }}>
          {searchValue ? 'No data found' : <LoadingFooter styleContainer={styles.loadingContainer} />}
        </Text>
      )}

      {refreshSuccessMessage && (
        <View style={styles.refreshSuccessMessage}>
          <Text style={styles.refreshSuccessText}>Refresh successful</Text>
        </View>
      )}
      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>
          {`${lastVisibleIndex} of ${totalItems}`}
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
