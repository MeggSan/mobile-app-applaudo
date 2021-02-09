import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// STYLES / OTHERS
import {Styles} from './HeaderLeftStyles';
import {COLORS} from '@constants/Colors';

export const HeaderLeft = ({navigation}) => {
  const handleOpenDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <Pressable style={Styles.containerIcon} onPress={handleOpenDrawer}>
      <Icon name="menu" size={30} color={COLORS.WHITE} />
    </Pressable>
  );
};
