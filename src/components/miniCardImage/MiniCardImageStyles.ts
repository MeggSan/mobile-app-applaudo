import {StyleSheet} from 'react-native';

// CONSTANTS
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  mgRight: {
    marginRight: 15,
  },
  containerSmallCard: {
    width: 150,
    height: 150,
    ...PALETTE.shadowBox,
  },
});
