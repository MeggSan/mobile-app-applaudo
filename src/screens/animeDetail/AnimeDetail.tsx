import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  ActivityIndicator,
  View,
  Linking,
  FlatList,
} from 'react-native';

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

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './AnimeDetailStyles';
import {COLORS} from '@constants/Colors';
import {ANIME_DETAIL} from '@constants/Strings';
import {API} from '@constants/Api';
import {SafeAreaView} from 'react-native-safe-area-context';

export const AnimeDetail = ({route, navigation}) => {
  const {animeId} = route.params;
  const [anime, setAnime] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [animeCharactersDetails, setAnimeCharactersDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offsetEpisodes, setOffsetEpisodes] = useState(0);
  const [offsetCharacters, setOffsetCharacters] = useState(0);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [loadingCharacters, setLoadingCharacters] = useState(true);
  const [hasMoreToLoadEpisodes, setHasMoreToLoadEpisodes] = useState(true);
  const [hasMoreToLoadCharacters, setHasMoreToLoadCharacters] = useState(true);

  useEffect(() => {
    getAnime();
    getAnimeEpisodes();
    getAnimeCharacters();
  }, []);

  useEffect(() => {
    if (offsetEpisodes !== 0) {
      getAnimeEpisodes();
    }
  }, [offsetEpisodes]);

  useEffect(() => {
    if (offsetCharacters !== 0) {
      getAnimeCharacters();
    }
  }, [offsetCharacters]);

  const getAnime = async () => {
    try {
      const response = await getAnimeDetail(animeId);
      setAnime(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAnimeEpisodes = async () => {
    try {
      const response = await getAnimeEpisodesList(animeId, {
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offsetEpisodes,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoadEpisodes(false);
      } else {
        const moreResults = [...animeEpisodes, ...response.data.data];
        setAnimeEpisodes(moreResults);
      }
      setLoadingEpisodes(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAnimeCharacters = async () => {
    try {
      const response = await getAnimeCharactersList(animeId, {
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offsetCharacters,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoadCharacters(false);
      } else {
        const results = response.data.data;
        const moreResults = [...animeCharacters, ...results];
        setAnimeCharacters(moreResults);
        const promises = [];
        const animeCharactersResults = [];
        for (let i = 0; i < results.length; i++) {
          promises.push(getAnimeCharacterDetail(results[i].id));
        }
        const finalResults = await Promise.all(promises);
        finalResults.forEach((result) => {
          animeCharactersResults.push(result.data.data);
        });
        setAnimeCharactersDetails([
          ...animeCharactersDetails,
          ...animeCharactersResults,
        ]);
      }
      setLoadingCharacters(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('Favorites');
  };

  const handleOpenYoutube = () => {
    Linking.openURL(
      `https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`,
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

  return (
    <ContainerScreens>
      <View style={Styles.mgBottom}>
        {loading ? (
          <ActivityIndicator color={COLORS.DARK_GRAY} />
        ) : (
          <>
            {/* COVER IMAGE */}
            <CardImage
              title={anime.attributes.titles.en_jp}
              image={
                anime.attributes.coverImage && anime.attributes.coverImage.small
              }
            />

            {/* POSTER IMAGE AND TITLES */}
            <View style={[GlobalStyles.containerTwoColumns, Styles.mgTop]}>
              <View style={GlobalStyles.containerImage}>
                <Image
                  style={Styles.imageAnime}
                  source={{uri: anime.attributes.posterImage.small}}
                  resizeMode="cover"
                />
              </View>
              <View style={GlobalStyles.containerNameTitle}>
                <Text style={GlobalStyles.titleCard}>
                  {ANIME_DETAIL.TITLES}
                </Text>
                {anime.attributes.titles.en && (
                  <Text style={GlobalStyles.textBold}>
                    {anime.attributes.titles.en}
                  </Text>
                )}
                <Text style={GlobalStyles.textBold}>
                  {anime.attributes.titles.en_jp}
                </Text>
                <Text style={GlobalStyles.textBold}>
                  {anime.attributes.titles.ja_jp}
                </Text>
              </View>
            </View>

            {/* SYNOPSIS */}
            <CardInformation>
              <View style={GlobalStyles.containerTitle}>
                <Text style={GlobalStyles.titleCard}>
                  {ANIME_DETAIL.SYNOPSIS}
                </Text>
              </View>
              <Text style={GlobalStyles.text}>{anime.attributes.synopsis}</Text>
            </CardInformation>

            {/* POPULARITY RANK, RATING BANK, EPISODE COUNT AND EPISODE LENGTH */}
            <CardInformation>
              <View style={[Styles.containerRow, Styles.mgBottom]}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {ANIME_DETAIL.POPULARITY_RANK}
                  </Text>
                  <Text>{anime.attributes.popularityRank}</Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {ANIME_DETAIL.RATING_RANK}
                  </Text>
                  <Text>{anime.attributes.ratingRank}</Text>
                </View>
              </View>
              <View style={Styles.containerRow}>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {ANIME_DETAIL.EPISODE_COUNT}
                  </Text>
                  <Text>{anime.attributes.episodeCount}</Text>
                </View>
                <View style={Styles.containerColumn}>
                  <Text style={GlobalStyles.subtitle}>
                    {ANIME_DETAIL.EPISODE_LENGTH}
                  </Text>
                  <Text>{anime.attributes.episodeLength}</Text>
                </View>
              </View>
            </CardInformation>

            {/* BUTTON OF YOUTUBE LINK */}
            {anime.attributes.youtubeVideoId !== '' &&
              anime.attributes.youtubeVideoId && (
                <Button
                  onPress={handleOpenYoutube}
                  text={ANIME_DETAIL.YOUTUBE_LINK}
                />
              )}

            {/* EPISODES LIST */}
            {animeEpisodes.length > 0 &&
              renderFlatList(
                ANIME_DETAIL.EPISODES,
                animeEpisodes,
                hasMoreToLoadEpisodes,
                handleMoreResultsEpisodes,
                renderItemEpisode,
                loadingEpisodes,
              )}

            {/* ANIME CHARACTERS LIST */}
            {animeCharactersDetails.length > 0 &&
              renderFlatList(
                ANIME_DETAIL.CHARACTERS,
                animeCharactersDetails,
                hasMoreToLoadCharacters,
                handleMoreResultsCharacters,
                renderItemCharacter,
                loadingCharacters,
              )}
          </>
        )}
        {/* <Pressable onPress={handleNavigate}>
        <Text>Go to Favorites</Text>
      </Pressable> */}
      </View>
    </ContainerScreens>
  );
};
