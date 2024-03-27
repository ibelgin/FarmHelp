/* eslint-disable react/no-unstable-nested-components */
import React, {memo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

import Routes from './routes';

import Splash from 'screens/Splash';

// Authentication Flow
import Login from 'screens/Login';
import Register from 'screens/Register';

// Farmer Screen's
import FarmerRegistraion from 'screens/Farmer/FarmerRegistration';
import FarmerHome from 'screens/Farmer/FarmerHome';
import FarmerAI from 'screens/Farmer/FarmerAI';
import FarmerOrders from 'screens/Farmer/FarmerOrders';
import FarmerStore from 'screens/Farmer/FarmerStore';

//Buyer Screen's
import BuyerRegistration from 'screens/Buyer/BuyerRegistration';
import BuyerHome from 'screens/Buyer/BuyerHome';
import BuyerCart from 'screens/Buyer/BuyerCart';
import BuyerOrders from 'screens/Buyer/BuyerOrders';
import BuyerSettings from 'screens/Buyer/BuyerSettings';
import BuyerSearch from 'screens/Buyer/BuyerSearch';
import FarmerSearch from 'screens/Farmer/FarmerSearch';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BuyerTabs = () => {
  const theme = useSelector((state: any) => state.theme);

  return (
    <Tab.Navigator
      initialRouteName={Routes.BuyerHome}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {borderTopWidth: 0, elevation: 0},
      }}>
      <Tab.Screen
        name={Routes.BuyerHome}
        component={BuyerHome}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.BuyerOrders}
        component={BuyerOrders}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="truck" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BuyerSearch}
        component={BuyerSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BuyerCart}
        component={BuyerCart}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.BuyerSettings}
        component={BuyerSettings}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const FarmerTabs = () => {
  const theme = useSelector((state: any) => state.theme);

  return (
    <Tab.Navigator
      initialRouteName={Routes.FarmerHome}
      screenOptions={{
        tabBarActiveBackgroundColor: theme.background,
        tabBarInactiveBackgroundColor: theme.background,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: {borderTopWidth: 0, elevation: 0},
      }}>
      <Tab.Screen
        name={Routes.FarmerHome}
        component={FarmerHome}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.FarmerAI}
        component={FarmerAI}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="trending-up" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.FarmerOrders}
        component={FarmerOrders}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="package" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.FarmerSearch}
        component={FarmerSearch}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.FarmerStore}
        component={FarmerStore}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icons name="storefront" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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
      <Stack.Screen
        name={Routes.BuyerTabs}
        component={BuyerTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.FarmerTabs}
        component={FarmerTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
});

export default RootStack;
