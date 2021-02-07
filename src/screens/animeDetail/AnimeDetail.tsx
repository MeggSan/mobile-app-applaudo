import React, {useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  Image,
  ActivityIndicator,
  View,
  Linking,
} from 'react-native';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardImage} from '@components/cardImage/CardImage';
import {CardInformation} from '@components/cardInformation/CardInformation';
import {Button} from '@components/button/Button';

// API
import {getAnimeDetail} from '@networking/Animes';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './AnimeDetailStyles';
import {COLORS} from '@constants/Colors';
import {ANIME_DETAIL} from '@constants/Strings';

export const AnimeDetail = ({route, navigation}) => {
  const {animeId} = route.params;
  const [anime, setAnime] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnime();
  }, []);

  const getAnime = async () => {
    try {
      const response = await getAnimeDetail(animeId);
      setAnime(response.data.data);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const handleNavigate = () => {
    navigation.navigate('Favorites');
  };

  const handleOpenYoutube = () => {
    Linking.openURL(
      `https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`,
    );
  };

  return (
    <ContainerScreens>
      {loading ? (
        <ActivityIndicator color={COLORS.DARK_GRAY} />
      ) : (
        <>
          <CardImage item={anime} />

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
        </>
      )}
      {/* <Pressable onPress={handleNavigate}>
        <Text>Go to Favorites</Text>
      </Pressable> */}
    </ContainerScreens>
  );
};
