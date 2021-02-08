import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {Favorites} from '@screens/favorites/Favorites';
import {Detail} from '@screens/detail/Detail';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const Stack = createStackNavigator();

export const MangaFavoritesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.MANGA_FAVORITES}>
      <Stack.Screen name={ROUTES.MANGA_FAVORITES} component={Favorites} />
      <Stack.Screen name={ROUTES.MANGA_DETAIL} component={Detail} />
    </Stack.Navigator>
  );
};
