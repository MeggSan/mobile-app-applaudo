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
} from '@networking/Animes';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './AnimeDetailStyles';
import {COLORS} from '@constants/Colors';
import {ANIME_DETAIL} from '@constants/Strings';
import {API} from '@constants/Api';

export const AnimeDetail = ({route, navigation}) => {
  const {animeId} = route.params;
  const [anime, setAnime] = useState(null);
  const [animeEpisodes, setAnimeEpisodes] = useState([]);
  const [animeCharacters, setAnimeCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offsetEpisodes, setOffsetEpisodes] = useState(0);
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
        'page[offset]': offsetEpisodes,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoadCharacters(false);
      } else {
        const moreResults = [...animeEpisodes, ...response.data.data];
        setAnimeCharacters(moreResults);
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

  const renderItem = ({item}) => {
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

  const handleMoreResultsEpisodes = () => {
    if (!loadingEpisodes) {
      setLoadingEpisodes(true);
      const moreOffset = offsetEpisodes + 20;
      setOffsetEpisodes(moreOffset);
    }
  };

  const renderFlatList = (
    title,
    dataList,
    hasMoreToLoad,
    handleMoreResults,
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
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={
            hasMoreToLoad ? Styles.footerComponent : null
          }
          bounces={false}
        />
      </View>
    );
  };

  const renderFooter = () =>
    loadingEpisodes && <ActivityIndicator color={COLORS.DARK_GRAY} />;

  return (
    <ContainerScreens>
      {loading ? (
        <ActivityIndicator color={COLORS.DARK_GRAY} />
      ) : (
        <>
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
              <Text style={GlobalStyles.titleCard}>{ANIME_DETAIL.TITLES}</Text>
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
          {anime.attributes.youtubeVideoId !== '' &&
            anime.attributes.youtubeVideoId && (
              <Button
                onPress={handleOpenYoutube}
                text={ANIME_DETAIL.YOUTUBE_LINK}
              />
            )}
          {/* EPISODES LIST */}
          {renderFlatList(
            ANIME_DETAIL.EPISODES,
            animeEpisodes,
            hasMoreToLoadEpisodes,
            handleMoreResultsEpisodes,
          )}

          {/* ANIME CHARACTERS LIST */}
          {/* {renderFlatList(ANIME_DETAIL.CHARACTERS, animeCharacters)} */}
        </>
      )}
      {/* <Pressable onPress={handleNavigate}>
        <Text>Go to Favorites</Text>
      </Pressable> */}
    </ContainerScreens>
  );
};
