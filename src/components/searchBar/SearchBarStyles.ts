import {StyleSheet, Platform} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  search: {
    ...PALETTE.roundedBorder,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.LIGHT_GRAY,
    borderWidth: 1,
  },
  paddingInput: {
    ...Platform.select({
      ios: {
        padding: 12,
      },
      android: {
        padding: 7,
      },
    }),
  },
  buttonContainer: {
    flex: 0.3,
    marginLeft: 10,
  },
  searchContainer: {
    flex: 0.7,
  },
  containerHeader: {
    flexDirection: 'row',
    flex: 1,
  },
});
