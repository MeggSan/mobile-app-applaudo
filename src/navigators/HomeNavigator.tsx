import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Home} from '@screens/home/Home';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {HOME} = ROUTES;
const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={HOME}>
      <Stack.Screen name={HOME} component={Home} />
    </Stack.Navigator>
  );
};
