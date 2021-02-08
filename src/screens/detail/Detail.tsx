import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  ActivityIndicator,
  View,
  Linking,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardImage} from '@components/cardImage/CardImage';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {Button} from '@components/button/Button';

// API
import {
  getAnimeDetail,
  getAnimeEpisodesList,
  getAnimeCharactersList,
  getAnimeCharacterDetail,
} from '@networking/Animes';

// API
import {
  getMangaDetail,
  getMangaChaptersList,
  getMangaCharactersList,
  getMangaCharacterDetail,
} from '@networking/Mangas';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './DetailStyles';
import {COLORS} from '@constants/Colors';
import {DETAIL, ASYNC_STORAGE_VALUES, ROUTES} from '@constants/Strings';
import {API} from '@constants/Api';

export const Detail = ({route, navigation}) => {
  const {detailId} = route.params;
  const [detail, setDetail] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [charactersDetails, setCharactersDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offsetEpisodes, setOffsetEpisodes] = useState(0);
  const [offsetCharacters, setOffsetCharacters] = useState(0);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [hasMoreToLoadEpisodes, setHasMoreToLoadEpisodes] = useState(true);
  const [hasMoreToLoadCharacters, setHasMoreToLoadCharacters] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    getFavorites();
    getDetail(
      route.name === ROUTES.ANIME_DETAIL ? getAnimeDetail : getMangaDetail,
    );
    getEpisodes(
      route.name === ROUTES.ANIME_DETAIL
        ? getAnimeEpisodesList
        : getMangaChaptersList,
    );
    getCharacters(
      route.name === ROUTES.ANIME_DETAIL
        ? getAnimeCharactersList
        : getMangaCharactersList,
    );
  }, []);

  useEffect(() => {
    if (offsetEpisodes !== 0) {
      getEpisodes(
        route.name === ROUTES.ANIME_DETAIL
          ? getAnimeEpisodesList
          : getMangaChaptersList,
      );
    }
  }, [offsetEpisodes]);

  useEffect(() => {
    if (offsetCharacters !== 0) {
      getCharacters(
        route.name === ROUTES.ANIME_DETAIL
          ? getAnimeCharactersList
          : getMangaCharactersList,
      );
    }
  }, [offsetCharacters]);

  const getDetail = async (getApi) => {
    try {
      const response = await getApi(detailId);
      setDetail(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getEpisodes = async (getApi) => {
    try {
      const response = await getApi(detailId, {
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offsetEpisodes,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoadEpisodes(false);
      } else {
        const moreResults = [...episodes, ...response.data.data];
        setEpisodes(moreResults);
      }
      setLoadingEpisodes(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getCharacters = async (getApi) => {
    try {
      const response = await getApi(detailId, {
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offsetCharacters,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoadCharacters(false);
      } else {
        const results = response.data.data;
        const moreResults = [...characters, ...results];
        setCharacters(moreResults);
        const promises = [];
        const charactersResults = [];
        const get =
          route.name === ROUTES.ANIME_DETAIL
            ? getAnimeCharacterDetail
            : getMangaCharacterDetail;
        for (let i = 0; i < results.length; i++) {
          promises.push(get(results[i].id));
        }
        const finalResults = await Promise.all(promises);
        finalResults.forEach((result) => {
          charactersResults.push(result.data.data);
        });
        setCharactersDetails([...charactersDetails, ...charactersResults]);
      }
      setLoadingCharacters(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleOpenYoutube = () => {
    Linking.openURL(
      `https://www.youtube.com/watch?v=${detail.attributes.youtubeVideoId}`,
    );
  };

  const renderItemEpisode = ({item}) => {
    return (
      <View style={Styles.mgRight}>
        <CardImage
          title={item.attributes.titles.en_jp}
          image={
            item.attributes.thumbnail && item.attributes.thumbnail.original
          }
          style={Styles.containerSmallCard}
        />
      </View>
    );
  };

  const renderItemCharacter = ({item}) => {
    return (
      <View style={Styles.mgRight}>
        <CardImage
          title={item.attributes.name}
          image={item.attributes.image && item.attributes.image.original}
          style={Styles.containerSmallCard}
        />
      </View>
    );
  };

  const handleMoreResultsEpisodes = () => {
    if (!loadingEpisodes) {
      setLoadingEpisodes(true);
      const moreOffset = offsetEpisodes + 20;
      setOffsetEpisodes(moreOffset);
    }
  };

  const handleMoreResultsCharacters = () => {
    if (!loadingCharacters) {
      setLoadingCharacters(true);
      const moreOffset = offsetCharacters + 20;
      setOffsetCharacters(moreOffset);
    }
  };

  const renderFlatList = (
    title,
    dataList,
    hasMoreToLoad,
    handleMoreResults,
    renderItem,
    loading,
  ) => {
    return (
      <View style={Styles.mgTop}>
        <Text style={[GlobalStyles.titleCard, Styles.mgBottom]}>{title}</Text>
        <FlatList
          data={dataList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          onEndReachedThreshold={0.01}
          onEndReached={hasMoreToLoad ? handleMoreResults : null}
          ListFooterComponent={() => renderFooter(loading)}
          ListFooterComponentStyle={
            hasMoreToLoad ? Styles.footerComponent : null
          }
          bounces={false}
        />
      </View>
    );
  };

  const renderFooter = (loading: boolean) =>
    loading && <ActivityIndicator color={COLORS.DARK_GRAY} />;

  const storeFavorite = async () => {
    try {
      let favoritesTemp = [...favorites, detail];
      const valueStr = JSON.stringify(favoritesTemp);
      await AsyncStorage.setItem(
        route.name === ROUTES.ANIME_DETAIL
          ? ASYNC_STORAGE_VALUES.ANIMES
          : ASYNC_STORAGE_VALUES.MANGAS,
        valueStr,
      );
      setInFavorites(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem(
        route.name === ROUTES.ANIME_DETAIL
          ? ASYNC_STORAGE_VALUES.ANIMES
          : ASYNC_STORAGE_VALUES.MANGAS,
      );
      if (value !== null) {
        const favoritesValue = JSON.parse(value);
        setFavorites(favoritesValue);
        const findFavorite = favoritesValue.find(
          (favorite) => favorite.id === detailId,
        );
        if (findFavorite) {
          setInFavorites(true);
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const removeFavorite = async () => {
    try {
      const newFavoritesArray = favorites.filter(
        (favorite) => favorite.id !== detailId,
      );
      const valueStr = JSON.stringify(newFavoritesArray);
      await AsyncStorage.setItem(
        route.name === ROUTES.ANIME_DETAIL
          ? ASYNC_STORAGE_VALUES.ANIMES
          : ASYNC_STORAGE_VALUES.MANGAS,
        valueStr,
      );
      setFavorites(newFavoritesArray);
      setInFavorites(false);
    } catch (e) {
      // remove error
    }
  };

  const handleAddFavorite = () => {
    storeFavorite();
  };

  const handleRemoveFavorite = () => {
    removeFavorite();
  };

  return (
    <ContainerScreens>
      <View style={Styles.mgBottom}>
        {loading ? (
          <ActivityIndicator color={COLORS.DARK_GRAY} />
        ) : (
          <>
            {/* COVER IMAGE */}
            <CardImage
              title={detail.attributes.titles.en_jp}
              image={
                detail.attributes.coverImage &&
                detail.attributes.coverImage.small
              }
            />

            {/* POSTER IMAGE AND TITLES */}
            <View style={[GlobalStyles.containerTwoColumns, Styles.mgTop]}>
              <View style={GlobalStyles.containerImage}>
                <Image
                  style={Styles.imageAnime}
                  source={{uri: detail.attributes.posterImage.small}}
                  resizeMode="cover"
                />
              </View>
              <View style={GlobalStyles.containerNameTitle}>
                <Text style={GlobalStyles.titleCard}>{DETAIL.TITLES}</Text>
                {detail.attributes.titles.en && (
                  <Text style={GlobalStyles.textBold}>
                    {detail.attributes.titles.en}
                  </Text>
                )}
                {detail.attributes.titles.en_jp && (
                  <Text style={GlobalStyles.textBold}>
                    {detail.attributes.titles.en_jp}
                  </Text>
                )}
                {detail.attributes.titles.ja_jp && (
                  <Text style={GlobalStyles.textBold}>
                    {detail.attributes.titles.ja_jp}
                  </Text>
                )}
              </View>
            </View>

            {/* SYNOPSIS */}
            <CardInformation>
              <View style={GlobalStyles.containerTitle}>
                <Text style={GlobalStyles.titleCard}>{DETAIL.SYNOPSIS}</Text>
              </View>
              <Text style={GlobalStyles.text}>
                {detail.attributes.synopsis}
              </Text>
            </CardInformation>

            {/* POPULARITY RANK, RATING BANK, EPISODE COUNT AND EPISODE LENGTH */}
            <CardInformation>
              <View style={[Styles.containerRow, Styles.mgBottom]}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {DETAIL.POPULARITY_RANK}
                  </Text>
                  <Text>{detail.attributes.popularityRank}</Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {DETAIL.RATING_RANK}
                  </Text>
                  <Text>{detail.attributes.ratingRank}</Text>
                </View>
              </View>
              <View style={Styles.containerRow}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {route.name === ROUTES.ANIME_DETAIL
                      ? DETAIL.EPISODE_COUNT
                      : DETAIL.CHAPTER_COUNT}
                  </Text>
                  <Text>
                    {route.name === ROUTES.ANIME_DETAIL
                      ? detail.attributes.episodeCount
                      : detail.attributes.chapterCount}
                  </Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {route.name === ROUTES.ANIME_DETAIL
                      ? DETAIL.EPISODE_LENGTH
                      : DETAIL.VOLUME_COUNT}
                  </Text>
                  <Text>
                    {route.name === ROUTES.ANIME_DETAIL
                      ? detail.attributes.episodeLength
                      : detail.attributes.volumeCount}
                  </Text>
                </View>
              </View>
            </CardInformation>

            {/* BUTTON OF YOUTUBE LINK */}
            {detail.attributes.youtubeVideoId !== '' &&
              detail.attributes.youtubeVideoId && (
                <Button
                  onPress={handleOpenYoutube}
                  text={DETAIL.YOUTUBE_LINK}
                />
              )}

            {/* EPISODES LIST */}
            {episodes.length > 0 &&
              renderFlatList(
                DETAIL.EPISODES,
                episodes,
                hasMoreToLoadEpisodes,
                handleMoreResultsEpisodes,
                renderItemEpisode,
                loadingEpisodes,
              )}

            {/* ANIME CHARACTERS LIST */}
            {charactersDetails.length > 0 &&
              renderFlatList(
                DETAIL.CHARACTERS,
                charactersDetails,
                hasMoreToLoadCharacters,
                handleMoreResultsCharacters,
                renderItemCharacter,
                loadingCharacters,
              )}

            {/* ADD FAVORITE */}
            <View style={Styles.containerFavorites}>
              <Button
                onPress={inFavorites ? handleRemoveFavorite : handleAddFavorite}
                text={
                  inFavorites ? DETAIL.REMOVE_FAVORITE : DETAIL.ADD_FAVORITE
                }
                colorButton={inFavorites && Styles.colorRemoveButton}
              />
            </View>
          </>
        )}
      </View>
    </ContainerScreens>
  );
};
