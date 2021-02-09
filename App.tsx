import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NetworkProvider} from 'react-native-offline';
import {NavigationContainer} from '@react-navigation/native';
import {AppLayout} from './src/AppLayout';
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NetworkProvider>
        <NavigationContainer>
          <AppLayout />
        </NavigationContainer>
      </NetworkProvider>
    </>
  );
};

export default App;
