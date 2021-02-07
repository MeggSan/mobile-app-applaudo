import {StyleSheet} from 'react-native';

// CONSTANTS
import {COLORS} from '@constants/Colors';
import {PALETTE} from '@constants/Palette';

export const Styles = StyleSheet.create({
  imageProfile: {
    width: '100%',
    height: 150,
    ...PALETTE.roundedBorder,
  },
  bullet: {
    color: COLORS.DARK_GRAY,
    fontSize: 6,
    marginRight: 5,
  },
  marginBotText: {
    marginBottom: 4,
  },
  marginTopText: {
    marginTop: 4,
  },
  inlineView: {
    flexDirection: 'row',
  },
  viewInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
