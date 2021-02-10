import React from 'react';
import {View, Text} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';

// STYLES
import {GlobalStyles} from '@utils/GlobalStyles';
import {Styles} from './HeaderRightStyles';

export const HeaderRight = () => {
  return (
    <NetworkConsumer>
      {({isConnected}) => (
        <View style={Styles.containerText}>
          <Text style={[GlobalStyles.text, Styles.statusText]}>
            {isConnected ? 'Online' : 'Offline'}
          </Text>
        </View>
      )}
    </NetworkConsumer>
  );
};
