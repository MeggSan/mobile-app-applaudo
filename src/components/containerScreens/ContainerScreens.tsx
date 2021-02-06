import React from 'react';
import {View, ScrollView} from 'react-native';

// STYLES
import {Styles} from './ContainerScreensStyles';

export const ContainerScreens = ({children}) => {
  return (
    <ScrollView>
      <View style={Styles.container}>{children}</View>
    </ScrollView>
  );
};
