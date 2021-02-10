import React from 'react';
import {Pressable, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './ButtonStyles';

export const Button = ({text, onPress, colorButton, colorText}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        Styles.containerButton,
        colorButton ? colorButton : Styles.colorButton,
      ]}>
      <Text style={colorText ? colorText : GlobalStyles.textBold}>{text}</Text>
    </Pressable>
  );
};
