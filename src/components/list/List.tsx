import React from 'react';
import {View, Text} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './ListStyles';

export const List = ({array}) => {
  return array.map((content, index) => (
    <View key={index} style={Styles.inlineView}>
      <Text style={GlobalStyles.bullet}>{'\u2B24'}</Text>
      <Text style={[GlobalStyles.text, Styles.marginBotText]}>{content}</Text>
    </View>
  ));
};
