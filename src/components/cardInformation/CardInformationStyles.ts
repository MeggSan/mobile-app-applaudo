import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {PALETTE} from 'library/constants/Palette';

export const Styles = StyleSheet.create({
  container: {
    ...PALETTE.shadowBox,
    ...{
      padding: 20,
      borderColor: COLORS.DARK_GRAY,
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: COLORS.WHITE_GRAY,
      marginBottom: 15,
    },
  },
});
