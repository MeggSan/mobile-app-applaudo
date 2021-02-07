import {StyleSheet} from 'react-native';

// STYLES
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  container: {
    ...PALETTE.shadowBox,
    ...PALETTE.roundedBorder,
    padding: 20,
    borderColor: COLORS.DARK_GRAY,
    borderWidth: 1,
    backgroundColor: COLORS.WHITE_GRAY,
    marginBottom: 15,
  },
});
