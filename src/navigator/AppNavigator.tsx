/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';

// Third-party imports
import {createStackNavigator} from '@react-navigation/stack';

// App imports
import {colors} from '~themes/colors';
import {PokemonBase} from '~interfaces/pokemon';
import {HomeScreen} from '~screens/HomeScreen';
import {PokemonScreen} from '~screens/PokemonScreen';

/* ––
 * –––– Types definition
 * –––––––––––––––––––––––––––––––––– */
export type RootStackParams = {
  HomeScreen: undefined;
  PokemonScreen: {
    pokemon: PokemonBase;
    color: string;
  };
};

/* ––
 * –––– Navigator definition
 * –––––––––––––––––––––––––––––––––– */
const Stack = createStackNavigator<RootStackParams>();

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
