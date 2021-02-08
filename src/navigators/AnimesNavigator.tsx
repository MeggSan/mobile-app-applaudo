import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {Favorites} from '@screens/favorites/Favorites';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {ANIMES, ANIME_DETAIL, ANIME_FAVORITES} = ROUTES;
const Stack = createStackNavigator();

export const AnimesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ANIMES}>
      <Stack.Screen name={ANIMES} component={List} />
      <Stack.Screen name={ANIME_DETAIL} component={Detail} />
      <Stack.Screen name={ANIME_FAVORITES} component={Favorites} />
    </Stack.Navigator>
  );
};
