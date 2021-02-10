import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  containerButton: {
    padding: 12,
    borderWidth: 1,
    ...PALETTE.shadowBox,
    ...PALETTE.roundedBorder,
    alignSelf: 'flex-start',
  },
  colorButton: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.GREEN,
  },
});
