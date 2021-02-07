import {COLORS} from 'library/constants/Colors';
import {PALETTE} from 'library/constants/Palette';
import {StyleSheet} from 'react-native';

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
    borderRadius: 20,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  mgTop: {
    marginTop: 15,
  },
  mgBottom: {
    marginBottom: 15,
  },
  mgRight: {
    marginRight: 15,
  },
  containerSmallCard: {
    width: 150,
    height: 150,
    ...PALETTE.shadowBox,
  },
  footerComponent: {
    margin: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
