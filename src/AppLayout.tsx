import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import {DrawerNavigator} from './navigators/DrawerNavigator';

export const AppLayout = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return <DrawerNavigator />;
};
