import React, {useEffect, useState} from 'react';
import {Text, Image, View, Linking, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import Share from 'react-native-share';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardImage} from '@components/cardImage/CardImage';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {Button} from '@components/button/Button';
import {HorizontalList} from '@components/horizontalList/HorizontalList';
import {FooterSpinner} from '@components/footerSpinner/FooterSpinner';

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

// CONSTANTS
import {FAVORITES_TYPES} from '@redux/types/FavoritesTypes';
import {DETAIL, ASYNC_STORAGE_VALUES, ROUTES} from '@constants/Strings';
import {API} from '@constants/Api';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './DetailStyles';

const {
  ADD_ANIME_FAVORITE,
  ADD_MANGA_FAVORITE,
  REMOVE_ANIME_FAVORITE,
  REMOVE_MANGA_FAVORITE,
} = FAVORITES_TYPES;
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
  EN,
  EN_JP,
  JA_JP,
  SHARE,
  SHARE_MESSAGE,
  SHARE_TITLE,
} = DETAIL;
const {ANIMES, MANGAS} = ASYNC_STORAGE_VALUES;
const {ANIME_DETAIL} = ROUTES;
const {LIMIT_QUANTITY_RESULTS} = API;

export const Detail = ({route}: {route: any}) => {
  const {detailId} = route.params;
  const isAnimeDetail = route.name === ANIME_DETAIL;
  const {animeFavorites, mangaFavorites} = useSelector(
    ({favoritesReducer}: {favoritesReducer: any}) => favoritesReducer,
  );
  const [detail, setDetail] = useState({});
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
  const [inFavorites, setInFavorites] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isFavorite();
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

  const getDetail = async (getApi: any) => {
    try {
      const response = await getApi(detailId);
      setDetail(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getEpisodes = async (getApi: any) => {
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

  const getCharacters = async (getApi: any) => {
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
        const charactersResults: Array<any> = [];
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
      let favoritesTemp = [];
      if (isAnimeDetail) {
        dispatch({type: ADD_ANIME_FAVORITE, payload: detail});
        favoritesTemp = [...animeFavorites, detail];
      } else {
        dispatch({type: ADD_MANGA_FAVORITE, payload: detail});
        favoritesTemp = [...mangaFavorites, detail];
      }
      const valueStr = JSON.stringify(favoritesTemp);
      await AsyncStorage.setItem(isAnimeDetail ? ANIMES : MANGAS, valueStr);
      setInFavorites(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const isFavorite = () => {
    let favoritesArrayType = isAnimeDetail ? animeFavorites : mangaFavorites;
    const findFavorite = favoritesArrayType.find(
      (favorite: any) => favorite.id === detailId,
    );
    if (findFavorite) {
      setInFavorites(true);
    }
  };

  const removeFavorite = async () => {
    try {
      const favorites = isAnimeDetail ? animeFavorites : mangaFavorites;
      const newFavoritesArray = favorites.filter(
        (favorite: any) => favorite.id !== detailId,
      );
      const valueStr = JSON.stringify(newFavoritesArray);
      await AsyncStorage.setItem(isAnimeDetail ? ANIMES : MANGAS, valueStr);
      dispatch({
        type: isAnimeDetail ? REMOVE_ANIME_FAVORITE : REMOVE_MANGA_FAVORITE,
        payload: detail.id,
      });
      setInFavorites(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddFavorite = () => {
    storeFavorite();
  };

  const handleRemoveFavorite = () => {
    removeFavorite();
  };

  const handleShareName = () => {
    const MESSAGE = `${SHARE_MESSAGE} ${
      detail.attributes.titles.en
        ? detail.attributes.titles.en
        : detail.attributes.titles.en_jp
    }`;
    const options: any = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: {
              type: 'text',
              content: MESSAGE,
            },
            item: {
              default: {
                type: 'text',
                content: MESSAGE,
              },
              message: null,
            },
          },
        ],
      },
      default: {
        title: SHARE_TITLE,
        subject: SHARE_TITLE,
        message: MESSAGE,
      },
    });

    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  if (loading) {
    return (
      <View style={Styles.centerSpinner}>
        <FooterSpinner />
      </View>
    );
  }

  return (
    <ContainerScreens>
      <View style={Styles.mgBottom}>
        {/* COVER IMAGE */}
        <CardImage
          title={
            detail.attributes.titles.en
              ? detail.attributes.titles.en
              : detail.attributes.titles.en_jp
          }
          image={
            detail.attributes.coverImage
              ? detail.attributes.coverImage.small
              : detail.attributes.posterImage.small
          }
          style={null}
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
                {EN + ' : ' + detail.attributes.titles.en}
              </Text>
            )}
            {detail.attributes.titles.en_jp && (
              <Text style={GlobalStyles.textBold}>
                {EN_JP + ' : ' + detail.attributes.titles.en_jp}
              </Text>
            )}
            {detail.attributes.titles.ja_jp && (
              <Text style={GlobalStyles.textBold}>
                {JA_JP + ' : ' + detail.attributes.titles.ja_jp}
              </Text>
            )}
          </View>
        </View>

        {/* SYNOPSIS */}
        <CardInformation>
          <View style={GlobalStyles.containerTitle}>
            <Text style={GlobalStyles.titleCard}>{SYNOPSIS}</Text>
          </View>
          <Text style={GlobalStyles.text}>{detail.attributes.synopsis}</Text>
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

        {/* BUTTON OF YOUTUBE LINK, SHARE NAME AND ADD/REMOVE FAVORITE */}
        <View style={Styles.containerButtons}>
          {detail.attributes.youtubeVideoId !== '' &&
            detail.attributes.youtubeVideoId && (
              <View style={Styles.mgButton}>
                <Button
                  onPress={handleOpenYoutube}
                  text={YOUTUBE_LINK}
                  colorButton={null}
                  colorText={null}
                />
              </View>
            )}
          <View style={Styles.mgButton}>
            <Button
              onPress={handleShareName}
              text={SHARE}
              colorButton={Styles.colorShareButton}
              colorText={GlobalStyles.textBoldWhite}
            />
          </View>
          <Button
            onPress={inFavorites ? handleRemoveFavorite : handleAddFavorite}
            text={inFavorites ? REMOVE_FAVORITE : ADD_FAVORITE}
            colorButton={inFavorites ? Styles.colorRemoveButton : null}
            colorText={null}
          />
        </View>

        {/* EPISODES LIST */}
        <HorizontalList
          title={EPISODES}
          dataList={episodes}
          hasMoreToLoad={hasMoreToLoadEpisodes}
          handleMoreResults={handleMoreResultsEpisodes}
          loading={loadingEpisodes}
        />

        {/* ANIME CHARACTERS LIST */}
        <HorizontalList
          title={CHARACTERS}
          dataList={charactersDetails}
          hasMoreToLoad={hasMoreToLoadCharacters}
          handleMoreResults={handleMoreResultsCharacters}
          loading={loadingCharacters}
        />
      </View>
    </ContainerScreens>
  );
};
