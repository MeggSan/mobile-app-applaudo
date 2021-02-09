import React from 'react';
import {ImageBackground, View, Text} from 'react-native';

// STYLES / OTHERS
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './CardImageStyles';
import {DETAIL} from '@constants/Strings';

const {EMPTY_TITLE_CARD} = DETAIL;

export const CardImage = ({title, image, style = null}) => {
  return (
    <ImageBackground
      source={{
        uri: image,
      }}
      imageStyle={Styles.imageBackground}
      style={style ? style : Styles.containerCard}
      resizeMode="cover">
      <View style={Styles.containerViewCard}>
        <View style={Styles.overlay} />
        <Text style={[GlobalStyles.titleCard, Styles.colorText]}>
          {title ? title : EMPTY_TITLE_CARD}
        </Text>
      </View>
    </ImageBackground>
  );
};
