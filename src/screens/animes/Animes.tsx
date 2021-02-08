import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';

// COMPONENTS
import {SearchBar} from '@components/searchBar/SearchBar';
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';

// API
import {getAnimeList} from '@networking/Animes';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './AnimesStyles';
import {COLORS} from '@constants/Colors';
import {API} from '@constants/Api';

export const Animes = ({navigation}) => {
  const [valueSearch, setValueSearch] = useState('');
  const [animesList, setAnimesList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

  useEffect(() => {
    getAnimes(offset, animesList);
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      getAnimes(offset, animesList, handleValueToSearch());
    }
  }, [offset]);

  const handleValueToSearch = () => {
    let valueToSearch = null;
    if (valueSearch !== '') {
      valueToSearch = valueSearch;
    }
    return valueToSearch;
  };

  const handleNavigate = (animeId) => {
    navigation.navigate('Anime Detail', {animeId});
  };

  const getAnimes = async (
    offset: number,
    animesList: Array,
    valueSearch = null,
  ) => {
    try {
      const response = await getAnimeList({
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offset,
        'filter[text]': valueSearch,
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

  const renderFooter = () =>
    loading && <ActivityIndicator color={COLORS.DARK_GRAY} />;

  const handleSearch = (text) => {
    const lowerCaseText = text.toLowerCase();
    setValueSearch(lowerCaseText);
  };

  const resetValues = () => {
    setHasMoreToLoad(true);
    setLoading(true);
    setOffset(0);
    setAnimesList([]);
  };

  const handleButtonSearch = () => {
    resetValues();
    getAnimes(0, [], handleValueToSearch());
  };

  return (
    <FlatList
      stickyHeaderIndices={[0]}
      data={animesList}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <PressableCardImage
          handleNavigate={() => handleNavigate(item.id)}
          title={item.attributes.titles.en_jp}
          image={item.attributes.coverImage && item.attributes.coverImage.small}
        />
      )}
      style={GlobalStyles.containerFlatList}
      onEndReachedThreshold={0.01}
      onEndReached={hasMoreToLoad ? handleMoreResults : null}
      ListHeaderComponent={
        <SearchBar
          value={valueSearch}
          handleSearch={handleSearch}
          handleButtonSearch={handleButtonSearch}
        />
      }
      ListHeaderComponentStyle={Styles.headerComponent}
      ListFooterComponent={renderFooter}
      ListFooterComponentStyle={hasMoreToLoad ? Styles.footerComponent : null}
      bounces={false}
    />
  );
};
