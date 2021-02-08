import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// STACK NAVIGATORS
import {HomeNavigator} from './HomeNavigator';
import {AnimesNavigator} from './AnimesNavigator';
import {MangasNavigator} from './MangasNavigator';
import {AnimeFavoritesNavigator} from './AnimeFavoritesNavigator';
import {MangaFavoritesNavigator} from './MangaFavoritesNavigator';

// CONSTANTS
import {ROUTES} from '@constants/Strings';

const {HOME, ANIMES, MANGAS, ANIME_FAVORITES, MANGA_FAVORITES} = ROUTES;
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={HOME}>
      <Drawer.Screen name={HOME} component={HomeNavigator} />
      <Drawer.Screen name={ANIMES} component={AnimesNavigator} />
      <Drawer.Screen name={MANGAS} component={MangasNavigator} />
      <Drawer.Screen
        name={ANIME_FAVORITES}
        component={AnimeFavoritesNavigator}
      />
      <Drawer.Screen
        name={MANGA_FAVORITES}
        component={MangaFavoritesNavigator}
      />
    </Drawer.Navigator>
  );
};
