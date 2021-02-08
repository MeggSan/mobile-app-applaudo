import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {Favorites} from '@screens/favorites/Favorites';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const Stack = createStackNavigator();

export const MangasNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.MANGAS}>
      <Stack.Screen name={ROUTES.MANGAS} component={List} />
      <Stack.Screen name={ROUTES.MANGA_DETAIL} component={Detail} />
      <Stack.Screen name={ROUTES.MANGA_FAVORITES} component={Favorites} />
    </Stack.Navigator>
  );
};
