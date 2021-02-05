import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Animes} from '../screens/animes/Animes';
import {AnimeDetail} from '../screens/animeDetail/AnimeDetail';
import {Favorites} from '../screens/favorites/Favorites';

const Stack = createStackNavigator();

export const AnimesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Animes">
      <Stack.Screen name="Animes" component={Animes} />
      <Stack.Screen name="Anime Detail" component={AnimeDetail} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};
