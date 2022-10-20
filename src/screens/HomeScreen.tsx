/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

// App imports
import {usePokemonPaginated} from '~hooks/usePokemonPaginated';
import {FadeInImageComponent} from '~components/FadeInImageComponent';

/* ––
 * –––– Screen definition
 * –––––––––––––––––––––––––––––––––– */
export const HomeScreen = (): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const {pokemonList, loadPokemons} = usePokemonPaginated();

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const renderActivityIndicator = (): JSX.Element => (
    <ActivityIndicator style={styles.loadingIndicator} size={20} color="grey" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('~assets/pokebola.png')}
        style={styles.pokeBallBackground}
      />

      <FlatList
        data={pokemonList}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <FadeInImageComponent uri={item.picture} style={styles.avatar} />
        )}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderActivityIndicator}
      />
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
  loadingIndicator: {
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
  },
});
