import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  imageBackground: {
    ...PALETTE.roundedBorder,
  },
  containerCard: {
    width: '100%',
    height: 200,
    ...PALETTE.shadowBox,
  },
  containerViewCard: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.BLACK,
    opacity: 0.5,
    ...PALETTE.roundedBorder,
  },
  colorText: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
