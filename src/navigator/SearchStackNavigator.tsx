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
import {SearchScreen} from '~screens/SearchScreen';
import {PokemonScreen} from '~screens/PokemonScreen';

/* ––
 * –––– Types definition
 * –––––––––––––––––––––––––––––––––– */
export type SearchStackParams = {
  SearchScreen: undefined;
  PokemonScreen: {
    pokemon: PokemonBase;
    color: string;
  };
};

/* ––
 * –––– Navigator definition
 * –––––––––––––––––––––––––––––––––– */
const Stack = createStackNavigator<SearchStackParams>();

export const SearchStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: colors.white},
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
    </Stack.Navigator>
  );
};
