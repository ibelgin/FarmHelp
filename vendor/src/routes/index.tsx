import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './routes';

import Splash from 'screens/Splash';
import Login from 'screens/Login';

const Stack = createNativeStackNavigator();

const RootStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}>
      <Stack.Screen name={Routes.Splash} component={Splash} />
      <Stack.Screen name={Routes.Login} component={Login} />
    </Stack.Navigator>
  );
});

export default RootStack;
