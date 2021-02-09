import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS / COMPONENTS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {ScreenOptions} from '@components/screenOptions/ScreenOptions';
import {ScreenOptionsWithBack} from '@components/screenOptions/ScreenOptions';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {MANGAS, MANGA_DETAIL} = ROUTES;
const Stack = createStackNavigator();

export const MangasNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MANGAS}>
      <Stack.Screen name={MANGAS} component={List} options={ScreenOptions} />
      <Stack.Screen
        name={MANGA_DETAIL}
        component={Detail}
        options={ScreenOptionsWithBack}
      />
    </Stack.Navigator>
  );
};
