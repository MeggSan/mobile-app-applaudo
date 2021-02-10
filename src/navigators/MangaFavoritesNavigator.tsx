import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS / COMPONENTS
import {Favorites} from '@screens/favorites/Favorites';
import {Detail} from '@screens/detail/Detail';
import {ScreenOptions} from '@components/screenOptions/ScreenOptions';
import {ScreenOptionsWithBack} from '@components/screenOptions/ScreenOptions';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {MANGA_FAVORITES, MANGA_DETAIL} = ROUTES;
const Stack = createStackNavigator();

export const MangaFavoritesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MANGA_FAVORITES}>
      <Stack.Screen
        name={MANGA_FAVORITES}
        component={Favorites}
        options={ScreenOptions}
      />
      <Stack.Screen
        name={MANGA_DETAIL}
        component={Detail}
        options={ScreenOptionsWithBack}
      />
    </Stack.Navigator>
  );
};
