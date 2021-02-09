import React from 'react';
import {Text, View} from 'react-native';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './EmptyListStyles';

export const EmptyList = ({message}) => {
  return (
    <View style={Styles.emptyContainer}>
      <Text style={[GlobalStyles.text, Styles.centerText]}>{message}</Text>
    </View>
  );
};
