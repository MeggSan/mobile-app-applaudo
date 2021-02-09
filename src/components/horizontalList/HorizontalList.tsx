import React from 'react';
import {View, Text, FlatList} from 'react-native';

// COMPONENTS
import {MiniCardImage} from '@components/miniCardImage/MiniCardImage';
import {EmptyList} from '@components/emptyList/EmptyList';
import {FooterSpinner} from '@components/footerSpinner/FooterSpinner';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './HorizontalListStyles';
import {DETAIL} from '@constants/Strings';

const {EPISODES, EMPTY} = DETAIL;

export const HorizontalList = ({
  title,
  dataList,
  hasMoreToLoad,
  handleMoreResults,
  loading,
}) => {
  const isEpisodes = EPISODES === title;

  return (
    <View style={Styles.mgTop}>
      <Text style={[GlobalStyles.titleCard, Styles.mgBottom]}>{title}</Text>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() =>
          !loading ? <EmptyList message={EMPTY} /> : null
        }
        renderItem={({item}) => (
          <MiniCardImage
            title={
              isEpisodes ? item.attributes.titles.en_jp : item.attributes.name
            }
            image={
              isEpisodes
                ? item.attributes.thumbnail &&
                  item.attributes.thumbnail.original
                : item.attributes.image && item.attributes.image.original
            }
          />
        )}
        horizontal={true}
        onEndReachedThreshold={0.01}
        onEndReached={hasMoreToLoad ? handleMoreResults : null}
        ListFooterComponent={loading ? <FooterSpinner /> : null}
        ListFooterComponentStyle={hasMoreToLoad ? Styles.footerComponent : null}
        bounces={false}
      />
    </View>
  );
};
