import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  containerButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    ...PALETTE.shadowBox,
    ...PALETTE.roundedBorder,
  },
});
