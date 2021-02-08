import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  containerRow: {
    flexDirection: 'row',
    flex: 1,
  },
  containerColumn: {
    flex: 0.5,
  },
  imageAnime: {
    width: '100%',
    height: 250,
    ...PALETTE.roundedBorder,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  containerFavorites: {
    marginVertical: 15,
  },
  colorRemoveButton: {
    backgroundColor: COLORS.RED,
    borderColor: COLORS.DARK_RED,
  },
  mgBottom: {
    marginBottom: 15,
  },
  mgTop: {
    marginTop: 15,
  },
});
