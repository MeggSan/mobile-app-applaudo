import React from 'react';
import {ActivityIndicator} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';

export const FooterSpinner = () => {
  return <ActivityIndicator color={COLORS.DARK_GRAY} size="large" />;
};
