import React from 'react';
import {StackNavigationOptions} from '@react-navigation/stack';

// COMPONENTS
import {HeaderRight} from '@components/headerRight/HeaderRight';
import {HeaderLeft} from '@components/headerLeft/HeaderLeft';

// CONSTANTS
import {COLORS} from '@constants/Colors';

// STYLES
import {Styles} from './ScreenOptionsStyles';

const COMMON_PROPERTIES = {
  headerStyle: Styles.headerStyle,
  headerTintColor: COLORS.WHITE,
  headerTitleStyle: Styles.headerTitleStyle,
  headerRight: () => <HeaderRight />,
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
