import React, {useEffect, useState} from 'react';
import {Text, Image, ActivityIndicator, View, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardImage} from '@components/cardImage/CardImage';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {Button} from '@components/button/Button';
import {HorizontalList} from '@components/horizontalList/HorizontalList';

// API
import {
  getAnimeDetail,
  getAnimeEpisodesList,
  getAnimeCharactersList,
  getAnimeCharacterDetail,
} from '@networking/Animes';
import {
  getMangaDetail,
  getMangaChaptersList,
  getMangaCharactersList,
  getMangaCharacterDetail,
} from '@networking/Mangas';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './DetailStyles';
import {DETAIL, ASYNC_STORAGE_VALUES, ROUTES} from '@constants/Strings';
import {API} from '@constants/Api';
import {COLORS} from '@constants/Colors';

const {
  SYNOPSIS,
  TITLES,
  POPULARITY_RANK,
  RATING_RANK,
  EPISODE_COUNT,
  EPISODE_LENGTH,
  CHAPTER_COUNT,
  VOLUME_COUNT,
  YOUTUBE_LINK,
  EPISODES,
  CHARACTERS,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} = DETAIL;
const {ANIMES, MANGAS} = ASYNC_STORAGE_VALUES;
const {ANIME_DETAIL} = ROUTES;
const {LIMIT_QUANTITY_RESULTS} = API;

export const Detail = ({route}) => {
  const {detailId} = route.params;
  const isAnimeDetail = route.name === ANIME_DETAIL;
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
    if (isAnimeDetail) {
      getDetail(getAnimeDetail);
      getEpisodes(getAnimeEpisodesList);
      getCharacters(getAnimeCharactersList);
    } else {
      getDetail(getMangaDetail);
      getEpisodes(getMangaChaptersList);
      getCharacters(getMangaCharactersList);
    }
  }, []);

  useEffect(() => {
    if (offsetEpisodes !== 0) {
      getEpisodes(isAnimeDetail ? getAnimeEpisodesList : getMangaChaptersList);
    }
  }, [offsetEpisodes]);

  useEffect(() => {
    if (offsetCharacters !== 0) {
      getCharacters(
        isAnimeDetail ? getAnimeCharactersList : getMangaCharactersList,
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
        'page[limit]': LIMIT_QUANTITY_RESULTS,
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
        const get = isAnimeDetail
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

  const storeFavorite = async () => {
    try {
      let favoritesTemp = [...favorites, detail];
      const valueStr = JSON.stringify(favoritesTemp);
      await AsyncStorage.setItem(isAnimeDetail ? ANIMES : MANGAS, valueStr);
      setInFavorites(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getFavorites = async () => {
    try {
      const value = await AsyncStorage.getItem(isAnimeDetail ? ANIMES : MANGAS);
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
      await AsyncStorage.setItem(isAnimeDetail ? ANIMES : MANGAS, valueStr);
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
                <Text style={GlobalStyles.titleCard}>{TITLES}</Text>
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
                <Text style={GlobalStyles.titleCard}>{SYNOPSIS}</Text>
              </View>
              <Text style={GlobalStyles.text}>
                {detail.attributes.synopsis}
              </Text>
            </CardInformation>

            {/* POPULARITY RANK, RATING BANK, EPISODE COUNT AND EPISODE LENGTH */}
            <CardInformation>
              <View style={[Styles.containerRow, Styles.mgBottom]}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>{POPULARITY_RANK}</Text>
                  <Text>{detail.attributes.popularityRank}</Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>{RATING_RANK}</Text>
                  <Text>{detail.attributes.ratingRank}</Text>
                </View>
              </View>
              <View style={Styles.containerRow}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {isAnimeDetail ? EPISODE_COUNT : CHAPTER_COUNT}
                  </Text>
                  <Text>
                    {isAnimeDetail
                      ? detail.attributes.episodeCount
                      : detail.attributes.chapterCount}
                  </Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {isAnimeDetail ? EPISODE_LENGTH : VOLUME_COUNT}
                  </Text>
                  <Text>
                    {isAnimeDetail
                      ? detail.attributes.episodeLength
                      : detail.attributes.volumeCount}
                  </Text>
                </View>
              </View>
            </CardInformation>

            {/* BUTTON OF YOUTUBE LINK */}
            {detail.attributes.youtubeVideoId !== '' &&
              detail.attributes.youtubeVideoId && (
                <Button onPress={handleOpenYoutube} text={YOUTUBE_LINK} />
              )}

            {/* EPISODES LIST */}
            {episodes.length > 0 && (
              <HorizontalList
                title={EPISODES}
                dataList={episodes}
                hasMoreToLoad={hasMoreToLoadEpisodes}
                handleMoreResults={handleMoreResultsEpisodes}
                loading={loadingEpisodes}
              />
            )}

            {/* ANIME CHARACTERS LIST */}
            {charactersDetails.length > 0 && (
              <HorizontalList
                title={CHARACTERS}
                dataList={charactersDetails}
                hasMoreToLoad={hasMoreToLoadCharacters}
                handleMoreResults={handleMoreResultsCharacters}
                loading={loadingCharacters}
              />
            )}

            {/* ADD FAVORITE */}
            <View style={Styles.containerFavorites}>
              <Button
                onPress={inFavorites ? handleRemoveFavorite : handleAddFavorite}
                text={inFavorites ? REMOVE_FAVORITE : ADD_FAVORITE}
                colorButton={inFavorites && Styles.colorRemoveButton}
              />
            </View>
          </>
        )}
      </View>
    </ContainerScreens>
  );
};
