import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {Favorites} from '@screens/favorites/Favorites';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const Stack = createStackNavigator();

export const AnimesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.ANIMES}>
      <Stack.Screen name={ROUTES.ANIMES} component={List} />
      <Stack.Screen name={ROUTES.ANIME_DETAIL} component={Detail} />
      <Stack.Screen name={ROUTES.ANIME_FAVORITES} component={Favorites} />
    </Stack.Navigator>
  );
};
