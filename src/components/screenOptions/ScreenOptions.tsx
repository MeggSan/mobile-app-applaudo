import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';

// COMPONENTS
import {HeaderLeft} from '@components/headerLeft/HeaderLeft';

// STYLES / OTHERS
import {Styles} from './ScreenOptionsStyles';
import {COLORS} from '@constants/Colors';

const COMMON_PROPERTIES = {
  headerStyle: Styles.headerStyle,
  headerTintColor: COLORS.WHITE,
  headerTitleStyle: Styles.headerTitleStyle,
};

export const ScreenOptions = ({navigation}): StackNavigationOptions => {
  return {
    ...COMMON_PROPERTIES,
    headerLeft: () => <HeaderLeft navigation={navigation} />,
  };
};

export const ScreenOptionsWithBack = ({navigation}): StackNavigationOptions => {
  return {
    ...COMMON_PROPERTIES,
  };
};