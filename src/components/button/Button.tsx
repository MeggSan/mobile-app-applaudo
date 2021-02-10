import React from 'react';
import {Pressable, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './ButtonStyles';

export const Button = ({
  text,
  onPress,
  colorButton = null,
  colorText = null,
}: {
  text: string;
  onPress: any;
  colorButton: Object | null;
  colorText: Object | null;
}) => {
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
