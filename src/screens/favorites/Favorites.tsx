import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

// COMPONENTS
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';
import {EmptyList} from '@components/emptyList/EmptyList';

// CONSTANTS
import {ROUTES, FAVORITES} from '@constants/Strings';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';

const {ANIME_FAVORITES, ANIME_DETAIL, MANGA_DETAIL} = ROUTES;
const {EMPTY} = FAVORITES;

export const Favorites = ({route, navigation}) => {
  const isAnime = route.name === ANIME_FAVORITES;
  const {animeFavorites} = useSelector((state) => state.favoritesReducer);
  const {mangaFavorites} = useSelector((state) => state.favoritesReducer);

  const handleNavigate = (detailId) => {
    navigation.navigate(isAnime ? ANIME_DETAIL : MANGA_DETAIL, {detailId});
  };

  return (
    <FlatList
      data={isAnime ? animeFavorites : mangaFavorites}
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
