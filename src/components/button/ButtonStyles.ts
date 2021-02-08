import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  containerButton: {
    padding: 15,
    borderWidth: 1,
    ...PALETTE.shadowBox,
    ...PALETTE.roundedBorder,
  },
  colorButton: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.GREEN,
  },
});
