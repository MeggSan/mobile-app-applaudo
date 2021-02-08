import React from 'react';
import {View, Text} from 'react-native';

import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './InlineInfoStyles';

export const InlineInfo = ({title, content}) => {
  return (
    <View style={Styles.viewInfo}>
      <Text style={GlobalStyles.textBold}>{title}</Text>
      <Text style={GlobalStyles.text}>{content}</Text>
    </View>
  );
};