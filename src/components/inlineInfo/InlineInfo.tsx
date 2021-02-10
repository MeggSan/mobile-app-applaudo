import React from 'react';
import {View, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './InlineInfoStyles';

export const InlineInfo = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <View style={Styles.viewInfo}>
      <Text style={GlobalStyles.textBold}>{title}</Text>
      <Text style={GlobalStyles.text}>{content}</Text>
    </View>
  );
};
