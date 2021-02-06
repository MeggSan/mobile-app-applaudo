import {StyleSheet, Platform} from 'react-native';
import {COLORS} from '@constants/Colors';

export const PALETTE = StyleSheet.create({
  wrapText: {
    flexShrink: 1,
    lineHeight: 20,
  },
  shadowBox: {
    ...Platform.select({
      ios: {
        shadowColor: COLORS.DARK_GRAY,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
});
