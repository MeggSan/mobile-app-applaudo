import React, {ReactNode} from 'react';
import {View} from 'react-native';

// STYLES
import {Styles} from './CardInformationStyles';

export const CardInformation = ({children}: {children: ReactNode}) => {
  return <View style={Styles.container}>{children}</View>;
};
