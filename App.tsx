/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import 'react-native-gesture-handler';
import React from 'react';

// Third-party imports
import {NavigationContainer} from '@react-navigation/native';

// App imports
import {AppTabNavigator} from '~navigator/AppTabNavigator';

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
const App = () => {
  return (
    <NavigationContainer>
      <AppTabNavigator />
    </NavigationContainer>
  );
};

export default App;
