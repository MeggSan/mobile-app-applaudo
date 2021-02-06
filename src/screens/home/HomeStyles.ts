import {StyleSheet} from 'react-native';
import {COLORS} from '@constants/Colors';
import {PALETTE} from 'library/constants/Palette';

export const Styles = StyleSheet.create({
  imageProfile: {
    width: '100%',
    height: 150,
    borderRadius: 20,
  },
  bullet: {
    color: COLORS.DARK_GRAY,
    fontSize: 6,
    marginRight: 5,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 15,
  },
  containerImage: {
    ...PALETTE.shadowBox,
    ...{
      flex: 0.5,
    },
  },
  containerNameTitle: {
    flex: 0.5,
    paddingLeft: 20,
    justifyContent: 'space-evenly',
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
