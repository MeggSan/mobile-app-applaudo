import React from 'react';
import {View} from 'react-native';

// COMPONENTS
import {CardImage} from '@components/cardImage/CardImage';

// STYLES
import {Styles} from './MiniCardImageStyles';

export const MiniCardImage = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <View style={Styles.mgRight}>
      <CardImage
        title={title}
        image={image}
        style={Styles.containerSmallCard}
      />
    </View>
  );
};
