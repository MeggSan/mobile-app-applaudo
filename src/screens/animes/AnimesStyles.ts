import {COLORS} from 'library/constants/Colors';
import {StyleSheet} from 'react-native';

export const Styles = StyleSheet.create({
  containerPressable: {
    marginBottom: 20,
  },
  containerCard: {
    width: '100%',
    height: 200,
  },
  imageBackground: {
    borderRadius: 20,
  },
  containerFlatList: {
    padding: 20,
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
});
