import React, {useEffect, useState} from 'react';
import {Pressable, FlatList, ActivityIndicator} from 'react-native';

// COMPONENTS
import {CardImage} from '@components/cardImage/CardImage';

// API
import {getAnimeList} from '@networking/Animes';

// STYLES / OTHERS
import {Styles} from './AnimesStyles';
import {COLORS} from '@constants/Colors';
import {API} from '@constants/Api';

export const Animes = ({navigation}) => {
  const [animesList, setAnimesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

  useEffect(() => {
    getAnimes();
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      getAnimes();
    }
  }, [offset]);

  const handleNavigate = (animeId) => {
    navigation.navigate('Anime Detail', {animeId});
  };

  const getAnimes = async () => {
    try {
      const response = await getAnimeList({
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offset,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoad(false);
      } else {
        const moreResults = [...animesList, ...response.data.data];
        setAnimesList(moreResults);
      }
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
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
      <Pressable
        style={Styles.containerPressable}
        onPress={() => handleNavigate(item.id)}>
        <CardImage
          title={item.attributes.titles.en_jp}
          image={item.attributes.coverImage && item.attributes.coverImage.small}
        />
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
      onEndReached={hasMoreToLoad ? handleMoreResults : null}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={hasMoreToLoad ? Styles.footerComponent : null}
      bounces={false}
    />
  );
};
