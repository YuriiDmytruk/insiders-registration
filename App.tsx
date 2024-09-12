import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './pages/Welcome';
import Phone from './pages/Phone';
import PhoneConfirmation from './pages/PhoneConfirmation';
import Info from './pages/Info';
import Password from './pages/Password';
import UserInfo from './pages/UserInfo';
import { enableScreens } from 'react-native-screens';
import { RootStackParamList } from './types';

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Phone" component={Phone} />
        <Stack.Screen name="PhoneConfirmation" component={PhoneConfirmation} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
