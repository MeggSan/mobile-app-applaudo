import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';

// COMPONENTS
import {MiniCardImage} from '@components/miniCardImage/MiniCardImage';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './HorizontalListStyles';
import {COLORS} from '@constants/Colors';
import {DETAIL} from '@constants/Strings';

const {EPISODES} = DETAIL;

export const HorizontalList = ({
  title,
  dataList,
  hasMoreToLoad,
  handleMoreResults,
  loading,
}) => {
  const isEpisodes = EPISODES === title;

  const renderFooter = (loading: boolean) =>
    loading && <ActivityIndicator color={COLORS.DARK_GRAY} />;

  return (
    <View style={Styles.mgTop}>
      <Text style={[GlobalStyles.titleCard, Styles.mgBottom]}>{title}</Text>
      <FlatList
        data={dataList}
        keyExtractor={(item) => item.id}
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
        ListFooterComponent={() => renderFooter(loading)}
        ListFooterComponentStyle={hasMoreToLoad ? Styles.footerComponent : null}
        bounces={false}
      />
    </View>
  );
};
