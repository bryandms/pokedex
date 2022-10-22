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
  View,
} from 'react-native';

// App imports
import {usePokemonPaginated} from '~hooks/usePokemonPaginated';
import {PokemonCard} from '~components/PokemonCard';
import {Typography} from '~components/Typography';

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

  const renderAppTitle = (): JSX.Element => (
    <Typography type="title" style={styles.title}>
      Pokedex
    </Typography>
  );

  return (
    <SafeAreaView>
      <Image
        source={require('~assets/pokeball.png')}
        style={styles.pokeballBackground}
      />

      <View style={styles.container}>
        <FlatList
          data={pokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={renderAppTitle}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={renderActivityIndicator}
        />
      </View>
    </SafeAreaView>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pokeballBackground: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: -100,
    right: -100,
    opacity: 0.2,
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
  },
  loadingIndicator: {
    height: 100,
  },
});
