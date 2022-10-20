/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

// App imports
import {usePokemonPaginated} from '~hooks/usePokemonPaginated';
import {TypographyComponent} from '~components/TypographyComponent';

/* ––
 * –––– Screen definition
 * –––––––––––––––––––––––––––––––––– */
export const HomeScreen = (): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const {pokemonList} = usePokemonPaginated();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('~assets/pokebola.png')}
        style={styles.pokeBallBackground}
      />

      <TypographyComponent color="black" type="title">
        Pokedex
      </TypographyComponent>
    </SafeAreaView>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  pokeBallBackground: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
});
