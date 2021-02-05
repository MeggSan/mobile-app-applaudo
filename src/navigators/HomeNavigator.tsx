import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Home} from '../screens/home/Home';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
