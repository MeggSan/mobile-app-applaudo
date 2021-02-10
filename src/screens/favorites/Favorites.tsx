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

export const Favorites = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const isAnime = route.name === ANIME_FAVORITES;
  const {animeFavorites, mangaFavorites} = useSelector(
    ({favoritesReducer}: {favoritesReducer: any}) => favoritesReducer,
  );

  const handleNavigate = (detailId: number) => {
    navigation.navigate(isAnime ? ANIME_DETAIL : MANGA_DETAIL, {detailId});
  };

  return (
    <FlatList
      data={isAnime ? animeFavorites : mangaFavorites}
      contentContainerStyle={GlobalStyles.contentContainerStyle}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <EmptyList message={EMPTY} />}
      renderItem={({
        item: {
          id,
          attributes: {titles, coverImage, posterImage},
        },
      }) => (
        <PressableCardImage
          handleNavigate={() => handleNavigate(id)}
          title={titles.en ? titles.en : titles.en_jp}
          image={coverImage ? coverImage.small : posterImage.small}
        />
      )}
      style={GlobalStyles.containerFlatList}
    />
  );
};
