import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// STACK NAVIGATORS
import {HomeNavigator} from './HomeNavigator';
import {AnimesNavigator} from './AnimesNavigator';
import {FavoritesNavigator} from './FavoritesNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeNavigator} />
      <Drawer.Screen name="Animes" component={AnimesNavigator} />
      <Drawer.Screen name="Favorites" component={FavoritesNavigator} />
    </Drawer.Navigator>
  );
};
