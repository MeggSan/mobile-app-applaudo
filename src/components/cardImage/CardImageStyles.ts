import {COLORS} from 'library/constants/Colors';
import {PALETTE} from 'library/constants/Palette';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  imageBackground: {
    borderRadius: 20,
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
    borderRadius: 20,
  },
  colorText: {
    color: COLORS.WHITE,
    textAlign: 'center',
  },
});
