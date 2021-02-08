import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {Favorites} from '@screens/favorites/Favorites';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {MANGAS, MANGA_DETAIL, MANGA_FAVORITES} = ROUTES;
const Stack = createStackNavigator();

export const MangasNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MANGAS}>
      <Stack.Screen name={MANGAS} component={List} />
      <Stack.Screen name={MANGA_DETAIL} component={Detail} />
      <Stack.Screen name={MANGA_FAVORITES} component={Favorites} />
    </Stack.Navigator>
  );
};
