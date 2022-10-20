/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import 'react-native-gesture-handler';
import React from 'react';

// Third-party imports
import {NavigationContainer} from '@react-navigation/native';

// App imports
import {AppNavigator} from '~navigator/AppNavigator';

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
