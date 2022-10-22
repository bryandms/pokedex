/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';

// Third-party imports
import {createStackNavigator} from '@react-navigation/stack';

// App imports
import {colors} from '~themes/colors';
import {HomeScreen} from '~screens/HomeScreen';
import {PokemonScreen} from '~screens/PokemonScreen';

/* ––
 * –––– Navigator definition
 * –––––––––––––––––––––––––––––––––– */
const Stack = createStackNavigator();

export const AppNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colors.white},
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
