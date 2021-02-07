import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  containerPressable: {
    marginBottom: 20,
  },
  containerCard: {
    width: '100%',
    height: 200,
  },
  imageBackground: {
    ...PALETTE.roundedBorder,
  },
  containerFlatList: {
    margin: 20,
  },
  colorText: {
    color: COLORS.WHITE,
    textAlign: 'center',
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
  headerComponent: {
    backgroundColor: COLORS.WHITE_GRAY,
    paddingBottom: 20,
  },
  footerComponent: {
    marginBottom: 80,
  },
});
