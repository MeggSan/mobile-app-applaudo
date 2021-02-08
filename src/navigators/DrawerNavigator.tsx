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

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={ROUTES.HOME}>
      <Drawer.Screen name={ROUTES.HOME} component={HomeNavigator} />
      <Drawer.Screen name={ROUTES.ANIMES} component={AnimesNavigator} />
      <Drawer.Screen name={ROUTES.MANGAS} component={MangasNavigator} />
      <Drawer.Screen
        name={ROUTES.ANIME_FAVORITES}
        component={AnimeFavoritesNavigator}
      />
      <Drawer.Screen
        name={ROUTES.MANGA_FAVORITES}
        component={MangaFavoritesNavigator}
      />
    </Drawer.Navigator>
  );
};
