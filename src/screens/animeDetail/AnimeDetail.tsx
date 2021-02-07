import React, {useEffect, useState} from 'react';
import {Text, Pressable, Image, ActivityIndicator, View} from 'react-native';

// COMPONENTS
import {ContainerScreens} from '@components/containerScreens/ContainerScreens';
import {CardImage} from '@components/cardImage/CardImage';
import {CardInformation} from '@components/cardInformation/CardInformation';

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
      console.log('anime', response.data.data);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const handleNavigate = () => {
    navigation.navigate('Favorites');
  };

  return (
    <ContainerScreens>
      {loading ? (
        <ActivityIndicator color={COLORS.DARK_GRAY} />
      ) : (
        <>
          <CardImage item={anime} />
          <Image
            source={{uri: anime.attributes.posterImage.small}}
            style={{width: 200, height: 200}}
          />
          <CardInformation>
            <View style={Styles.containerTitle}>
              <Text style={GlobalStyles.titleCard}>{ANIME_DETAIL.TITLES}</Text>
            </View>
            <Text style={GlobalStyles.text}>{anime.attributes.titles.en}</Text>
            <Text style={GlobalStyles.text}>
              {anime.attributes.titles.en_jp}
            </Text>
            <Text style={GlobalStyles.text}>
              {anime.attributes.titles.ja_jp}
            </Text>
          </CardInformation>
          <CardInformation>
            <View style={Styles.containerTitle}>
              <Text style={GlobalStyles.titleCard}>
                {ANIME_DETAIL.SYNOPSIS}
              </Text>
            </View>
            <Text style={GlobalStyles.text}>{anime.attributes.synopsis}</Text>
          </CardInformation>
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
          <Text style={GlobalStyles.text}>
            {anime.attributes.youtubeVideoId}
          </Text>
        </>
      )}
      {/* <Pressable onPress={handleNavigate}>
        <Text>Go to Favorites</Text>
      </Pressable> */}
    </ContainerScreens>
  );
};
