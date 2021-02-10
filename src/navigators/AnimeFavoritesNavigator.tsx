import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS / COMPONENTS
import {Favorites} from '@screens/favorites/Favorites';
import {Detail} from '@screens/detail/Detail';
import {ScreenOptions} from '@components/screenOptions/ScreenOptions';
import {ScreenOptionsWithBack} from '@components/screenOptions/ScreenOptions';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {ANIME_FAVORITES, ANIME_DETAIL} = ROUTES;
const Stack = createStackNavigator();

export const AnimeFavoritesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ANIME_FAVORITES}>
      <Stack.Screen
        name={ANIME_FAVORITES}
        component={Favorites}
        options={ScreenOptions}
      />
      <Stack.Screen
        name={ANIME_DETAIL}
        component={Detail}
        options={ScreenOptionsWithBack}
      />
    </Stack.Navigator>
  );
};
