import {StyleSheet} from 'react-native';

// CONSTANTS
// import {COLORS} from 'constants/Colors';
import {FONTS} from '@constants/Fonts';
import {FONTS_SIZES} from '@constants/FontsSizes';
import {PALETTE} from '@constants/Palette';

export const GlobalStyles = StyleSheet.create({
  titleCard: {
    ...PALETTE.wrapText,
    ...{
      fontFamily: FONTS.METROPOLIS_SEMIBOLD,
      fontSize: FONTS_SIZES.TITLE_CARD,
    },
  },
  title: {
    ...PALETTE.wrapText,
    ...{
      fontFamily: FONTS.METROPOLIS_SEMIBOLD,
      fontSize: FONTS_SIZES.TITLE,
    },
  },
  subtitle: {
    ...PALETTE.wrapText,
    ...{
      fontFamily: FONTS.METROPOLIS_SEMIBOLD,
      fontSize: FONTS_SIZES.SUBTITLE,
    },
  },
  text: {
    ...PALETTE.wrapText,
    ...{
      fontFamily: FONTS.METROPOLIS_REGULAR,
      fontSize: FONTS_SIZES.TEXT,
    },
  },
  textBold: {
    ...PALETTE.wrapText,
    ...{
      fontFamily: FONTS.METROPOLIS_SEMIBOLD,
      fontSize: FONTS_SIZES.TEXT,
    },
  },
});
