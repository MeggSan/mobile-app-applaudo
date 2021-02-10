import React from 'react';
import {Pressable} from 'react-native';

// COMPONENTS
import {CardImage} from '@components/cardImage/CardImage';

// STYLES
import {Styles} from './PressableCardImageStyles';

export const PressableCardImage = ({
  handleNavigate,
  title,
  image,
}: {
  handleNavigate: any;
  title: string;
  image: string;
}) => {
  return (
    <Pressable style={Styles.containerPressableCard} onPress={handleNavigate}>
      <CardImage title={title} image={image} style={null} />
    </Pressable>
  );
};
