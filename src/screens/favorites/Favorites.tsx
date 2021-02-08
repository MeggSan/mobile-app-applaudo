import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

// COMPONENTS
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './FavoritesStyles';
import {ASYNC_STORAGE_VALUES, ROUTES} from '@constants/Strings';

const {ANIME_FAVORITES, ANIME_DETAIL, MANGA_DETAIL} = ROUTES;
const {ANIMES, MANGAS} = ASYNC_STORAGE_VALUES;

export const Favorites = ({route, navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem(
        route.name === ANIME_FAVORITES ? ANIMES : MANGAS,
      );
      if (value !== null) {
        const favoritesValue = JSON.parse(value);
        setFavorites(favoritesValue);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNavigate = (detailId) => {
    navigation.navigate(
      route.name === ANIME_FAVORITES ? ANIME_DETAIL : MANGA_DETAIL,
      {detailId},
    );
  };

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({item: {id, attributes}}) => (
        <PressableCardImage
          handleNavigate={() => handleNavigate(id)}
          title={
            attributes.titles.en
              ? attributes.titles.en
              : attributes.titles.en_jp
          }
          image={
            attributes.coverImage
              ? attributes.coverImage.small
              : attributes.posterImage.small
          }
        />
      )}
      style={GlobalStyles.containerFlatList}
    />
  );
};
