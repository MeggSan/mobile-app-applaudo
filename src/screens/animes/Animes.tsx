import React, {useEffect, useState} from 'react';
import {
  Text,
  Pressable,
  FlatList,
  ImageBackground,
  View,
  ActivityIndicator,
} from 'react-native';

// API
import {getAnimeList} from '@networking/Animes';

// STYLES
import {GlobalStyles} from 'utils/GlobalStyles';
import {Styles} from './AnimesStyles';
import {COLORS} from 'library/constants/Colors';

export const Animes = ({navigation}) => {
  const LIMIT_QUANTITY_RESULTS = 20;
  const [animesList, setAnimesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimes();
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      getAnimes();
    }
  }, [offset]);

  const handleNavigate = () => {
    navigation.navigate('Anime Detail');
  };

  const getAnimes = async () => {
    try {
      const response = await getAnimeList({
        'page[limit]': LIMIT_QUANTITY_RESULTS,
        'page[offset]': offset,
      });
      const moreResults = [...animesList, ...response.data.data];
      setAnimesList(moreResults);
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };

  const handleMoreResults = () => {
    if (!loading) {
      setLoading(true);
      const moreOffset = offset + 20;
      setOffset(moreOffset);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Pressable style={Styles.containerPressable} onPress={handleNavigate}>
        <ImageBackground
          source={{uri: item.attributes.posterImage.small}}
          imageStyle={Styles.imageBackground}
          style={Styles.containerCard}
          resizeMode="cover">
          <View style={Styles.containerViewCard}>
            <View style={Styles.overlay} />
            <Text style={[GlobalStyles.titleCard, Styles.colorText]}>
              {item.attributes.titles.en_jp}
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    );
  };

  const renderFooter = () =>
    loading && <ActivityIndicator color={COLORS.DARK_GRAY} />;

  return (
    <FlatList
      data={animesList}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={Styles.containerFlatList}
      onEndReachedThreshold={0.01}
      onEndReached={handleMoreResults}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={Styles.footerComponent}
      bounces={false}
    />
  );
};
