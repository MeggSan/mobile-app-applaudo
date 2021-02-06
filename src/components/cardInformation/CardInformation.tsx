import React from 'react';
import {View} from 'react-native';

// STYLES
import {Styles} from './CardInformationStyles';

export const CardInformation = ({children}) => {
  return <View style={Styles.container}>{children}</View>;
};
