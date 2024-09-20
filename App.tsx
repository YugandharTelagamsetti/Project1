
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Login';
import HomePage from './src/HomePage';
import Splash from './src/Splash';
import WelcomeScreen from './src/WelcomeScreen';
import Slider from './src/components/Slider';
import CaseList from './src/CaseList';
import { Provider } from 'react-redux';
import store from './src/store/slices/Store';

const Stack = createNativeStackNavigator();


const App = () => {

  return (
    <Provider store={store}>

    <NavigationContainer >

      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

        <Stack.Screen name="CaseList" component={CaseList} options={({ navigation }) => ({
          title: 'Case List',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate('CaseList', { showSearchBar: true });

              }}
            >
              <Image source={require('./src/assets/search.png')} style={{ width: 25, height: 25 }} />
            </TouchableOpacity>
          ),
        })} />

      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};


export default App;