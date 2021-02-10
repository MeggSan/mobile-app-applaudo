import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// SCREENS / COMPONENTS
import {List} from '@screens/list/List';
import {Detail} from '@screens/detail/Detail';
import {ScreenOptions} from '@components/screenOptions/ScreenOptions';
import {ScreenOptionsWithBack} from '@components/screenOptions/ScreenOptions';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {ANIMES, ANIME_DETAIL} = ROUTES;
const Stack = createStackNavigator();

export const AnimesNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ANIMES}>
      <Stack.Screen name={ANIMES} component={List} options={ScreenOptions} />
      <Stack.Screen
        name={ANIME_DETAIL}
        component={Detail}
        options={ScreenOptionsWithBack}
      />
    </Stack.Navigator>
  );
};
