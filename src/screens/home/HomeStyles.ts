import {StyleSheet} from 'react-native';

// CONSTANTS
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  imageProfile: {
    width: '100%',
    height: 150,
    ...PALETTE.roundedBorder,
  },
  inlineView: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
