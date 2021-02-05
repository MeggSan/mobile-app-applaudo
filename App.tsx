import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

// COMPONENTS
import {AppLayout} from './src/AppLayout';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <AppLayout />
      </SafeAreaView>
    </>
  );
};

export default App;
