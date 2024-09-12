import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
import 'react-native-url-polyfill/auto';

import Welcome from './pages/Welcome';
import Phone from './pages/Phone';
import PhoneConfirmation from './pages/PhoneConfirmation';
import Info from './pages/Info';
import Password from './pages/Password';
import UserInfo from './pages/UserInfo';

import {RootStackParamList} from './types';

import store from './redux/store';
import LogIn from './pages/LogIn';
import UsersList from './pages/UsersList';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Phone" component={Phone} />
          <Stack.Screen
            name="PhoneConfirmation"
            component={PhoneConfirmation}
          />
          <Stack.Screen
            name="Info"
            component={Info}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Password" component={Password} />
          <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UsersList"
            component={UsersList}
          />
          <Stack.Screen name="LogIn" component={LogIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
