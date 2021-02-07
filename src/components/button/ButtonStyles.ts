import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from 'library/constants/Colors';
import {PALETTE} from 'library/constants/Palette';

export const Styles = StyleSheet.create({
  containerButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.GREEN,
    ...PALETTE.shadowBox,
  },
});
