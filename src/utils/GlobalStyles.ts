import {StyleSheet} from 'react-native';

// CONSTANTS
import {FONTS} from '@constants/Fonts';
import {FONTS_SIZES} from '@constants/FontsSizes';
import {PALETTE} from '@constants/Palette';
import {COLORS} from '@constants/Colors';

export const GlobalStyles = StyleSheet.create({
  titleCard: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_SEMIBOLD,
    fontSize: FONTS_SIZES.TITLE_CARD,
  },
  title: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_SEMIBOLD,
    fontSize: FONTS_SIZES.TITLE,
  },
  subtitle: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_SEMIBOLD,
    fontSize: FONTS_SIZES.SUBTITLE,
  },
  text: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_REGULAR,
    fontSize: FONTS_SIZES.TEXT,
  },
  textBold: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_SEMIBOLD,
    fontSize: FONTS_SIZES.TEXT,
  },
  textBoldWhite: {
    ...PALETTE.wrapText,
    fontFamily: FONTS.METROPOLIS_SEMIBOLD,
    fontSize: FONTS_SIZES.TEXT,
    color: COLORS.WHITE,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerTwoColumns: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
  },
  containerImage: {
    ...PALETTE.shadowBox,
    flex: 0.5,
  },
  containerNameTitle: {
    flex: 0.5,
    paddingLeft: 20,
    justifyContent: 'space-evenly',
  },
  containerFlatList: {
    margin: 20,
  },
  bullet: {
    color: COLORS.DARK_GRAY,
    fontSize: 6,
    marginRight: 5,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
