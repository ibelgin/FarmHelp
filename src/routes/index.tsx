import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Routes from './routes';

import Splash from 'screens/Splash';

// Authentication Flow
import Login from 'screens/Login';
import Register from 'screens/Register';

// Farmer Screen's
import FarmerRegistraion from 'screens/Farmer/FarmerRegistration';
import FarmerHome from 'screens/Farmer/FarmerHome';

//Buyer Screen's
import BuyerRegistration from 'screens/Buyer/BuyerRegistration';
import BuyerHome from 'screens/Buyer/BuyerHome';

const Stack = createNativeStackNavigator();

const RootStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, orientation: 'portrait'}}
      initialRouteName="Splash">
      <Stack.Screen name={Routes.Splash} component={Splash} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
      <Stack.Screen
        name={Routes.FarmerRegistraion}
        component={FarmerRegistraion}
      />
      <Stack.Screen
        name={Routes.BuyerRegistration}
        component={BuyerRegistration}
      />
      <Stack.Screen name={Routes.FarmerHome} component={FarmerHome} />
      <Stack.Screen name={Routes.BuyerHome} component={BuyerHome} />
    </Stack.Navigator>
  );
});

export default RootStack;
