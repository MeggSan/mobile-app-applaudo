import React, {useState, useCallback} from 'react';
import {FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

// COMPONENTS
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './FavoritesStyles';
import {ASYNC_STORAGE_VALUES} from '@constants/Strings';

export const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
    }, []),
  );

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem(ASYNC_STORAGE_VALUES.ANIMES);
      if (value !== null) {
        const favoritesValue = JSON.parse(value);
        setFavorites(favoritesValue);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNavigate = (animeId) => {
    navigation.navigate('Anime Detail', {animeId});
  };

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <PressableCardImage
          handleNavigate={() => handleNavigate(item.id)}
          title={item.attributes.titles.en_jp}
          image={item.attributes.coverImage && item.attributes.coverImage.small}
        />
      )}
      style={GlobalStyles.containerFlatList}
    />
  );
};
