import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {NetworkProvider} from 'react-native-offline';
import {NavigationContainer} from '@react-navigation/native';

// COMPONENTS / OTHERS
import {AppLayout} from './src/AppLayout';
import store from '@redux/Store';

const App = () => {
  return (
    <Provider store={store}>
      <NetworkProvider>
        <NavigationContainer>
          <AppLayout />
        </NavigationContainer>
      </NetworkProvider>
    </Provider>
  );
};

export default App;
