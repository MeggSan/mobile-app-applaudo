import React from 'react';
import {ImageBackground, View, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './CardImageStyles';

export const CardImage = ({item: {attributes}}) => {
  return (
    <ImageBackground
      source={{
        uri: attributes.coverImage ? attributes.coverImage.small : null,
      }}
      imageStyle={Styles.imageBackground}
      style={Styles.containerCard}
      resizeMode="cover">
      <View style={Styles.containerViewCard}>
        <View style={Styles.overlay} />
        <Text style={[GlobalStyles.titleCard, Styles.colorText]}>
          {attributes.titles.en_jp}
        </Text>
      </View>
    </ImageBackground>
  );
};
