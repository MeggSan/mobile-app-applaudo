import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// CONSTANTS
import {COLORS} from '@constants/Colors';

// STYLES
import {Styles} from './HeaderLeftStyles';

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
