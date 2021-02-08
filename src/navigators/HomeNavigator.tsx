import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Home} from '@screens/home/Home';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const Stack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
    </Stack.Navigator>
  );
};
