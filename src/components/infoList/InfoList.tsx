import React from 'react';
import {View, Text} from 'react-native';

// COMPONENTS
import {BottomLine} from '@components/bottomLine/BottomLine';
import {List} from '@components/list/List';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './InfoListStyles';

export const InfoList = ({information}: {information: any}) => {
  return (
    <View style={Styles.marginTopText}>
      <Text style={GlobalStyles.title}>{information.TITLE}</Text>
      <BottomLine />
      <List array={information.CONTENT} />
    </View>
  );
};
