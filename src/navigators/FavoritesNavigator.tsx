import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Favorites} from '../screens/favorites/Favorites';

const Stack = createStackNavigator();

export const FavoritesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Favorites">
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};
