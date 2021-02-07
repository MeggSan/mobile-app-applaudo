import React from 'react';
import {ImageBackground, View, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './CardImageStyles';

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
        <Text style={[GlobalStyles.titleCard, Styles.colorText]}>{title}</Text>
      </View>
    </ImageBackground>
  );
};
