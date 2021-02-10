import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

// COMPONENTS
import {SearchBar} from '@components/searchBar/SearchBar';
import {PressableCardImage} from '@components/pressableCardImage/PressableCardImage';
import {EmptyList} from '@components/emptyList/EmptyList';
import {FooterSpinner} from '@components/footerSpinner/FooterSpinner';

// API
import {getAnimeList} from '@networking/Animes';
import {getMangaList} from '@networking/Mangas';

// CONSTANTS
import {API} from '@constants/Api';
import {LIST, ROUTES} from '@constants/Strings';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './ListStyles';

const {ANIMES, ANIME_DETAIL, MANGA_DETAIL} = ROUTES;
const {SEARCH_ANIMES, SEARCH_MANGAS, EMPTY} = LIST;

export const List = ({route, navigation}) => {
  const isAnimes = route.name === ANIMES;
  const [valueSearch, setValueSearch] = useState('');
  const [arrayList, setArrayList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);

  useEffect(() => {
    getList(isAnimes ? getAnimeList : getMangaList, offset, arrayList);
  }, []);

  useEffect(() => {
    if (offset !== 0) {
      getList(
        isAnimes ? getAnimeList : getMangaList,
        offset,
        arrayList,
        handleValueToSearch(),
      );
    }
  }, [offset]);

  const handleValueToSearch = () => {
    let valueToSearch = null;
    if (valueSearch !== '') {
      valueToSearch = valueSearch;
    }
    return valueToSearch;
  };

  const handleNavigate = (detailId: number) => {
    navigation.navigate(isAnimes ? ANIME_DETAIL : MANGA_DETAIL, {
      detailId,
    });
  };

  const getList = async (
    getApi: any,
    offset: number,
    arrayList: Array<Object>,
    valueSearch: string | null = null,
  ) => {
    try {
      const response = await getApi({
        'page[limit]': API.LIMIT_QUANTITY_RESULTS,
        'page[offset]': offset,
        'filter[text]': valueSearch,
      });
      if (response.data.data.length === 0) {
        setHasMoreToLoad(false);
      } else {
        const moreResults = [...arrayList, ...response.data.data];
        setArrayList(moreResults);
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

  const handleSearch = (text: string) => {
    const lowerCaseText = text.toLowerCase();
    setValueSearch(lowerCaseText);
  };

  const resetValues = () => {
    setHasMoreToLoad(true);
    setLoading(true);
    setOffset(0);
    setArrayList([]);
  };

  const handleButtonSearch = () => {
    resetValues();
    getList(
      isAnimes ? getAnimeList : getMangaList,
      0,
      [],
      handleValueToSearch(),
    );
  };

  return (
    <FlatList
      stickyHeaderIndices={[0]}
      data={arrayList}
      contentContainerStyle={GlobalStyles.contentContainerStyle}
      keyExtractor={({id}) => id}
      ListEmptyComponent={() =>
        !loading ? <EmptyList message={EMPTY} /> : null
      }
      renderItem={({
        item: {
          id,
          attributes: {titles, coverImage, posterImage},
        },
      }) => (
        <PressableCardImage
          handleNavigate={() => handleNavigate(id)}
          title={titles.en ? titles.en : titles.en_jp}
          image={coverImage ? coverImage.small : posterImage.small}
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
          placeholder={isAnimes ? SEARCH_ANIMES : SEARCH_MANGAS}
        />
      }
      ListHeaderComponentStyle={Styles.headerComponent}
      ListFooterComponent={loading ? <FooterSpinner /> : null}
      ListFooterComponentStyle={hasMoreToLoad ? Styles.footerComponent : null}
      bounces={false}
    />
  );
};
