import React, {useState, useCallback} from 'react';
import {FlatList, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

// COMPONENTS
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';
import {EmptyList} from '@components/emptyList/EmptyList';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {ASYNC_STORAGE_VALUES, ROUTES, FAVORITES} from '@constants/Strings';

const {ANIME_FAVORITES, ANIME_DETAIL, MANGA_DETAIL} = ROUTES;
const {ANIMES, MANGAS} = ASYNC_STORAGE_VALUES;
const {EMPTY} = FAVORITES;

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

  const renderr = () => (
    <View>
      <Text>Estoy vacio</Text>
    </View>
  );

  return (
    <FlatList
      data={favorites}
      contentContainerStyle={GlobalStyles.contentContainerStyle}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <EmptyList message={EMPTY} />}
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
