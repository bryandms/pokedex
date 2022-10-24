/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// App imports
import {colors} from '~themes/colors';
import {PokemonBase} from '~interfaces/pokemon';
import {usePokemonSearch} from '~hooks/usePokemonSearch';
import {SearchInput} from '~components/SearchInput';
import {PokemonCard} from '~components/PokemonCard';
import {Typography} from '~components/Typography';

/* ––
 * –––– Constants definition
 * –––––––––––––––––––––––––––––––––– */
const screenWidth = Dimensions.get('screen').width - 40;

/* ––
 * –––– Screen definition
 * –––––––––––––––––––––––––––––––––– */
export const SearchScreen = (): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemonList} = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonBase[]>([]);

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredPokemon([]);
    }

    filterPokemon();
  }, [term]);

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const filterPokemon = (): void => {
    isNaN(Number(term)) ? filterPokemonByName() : filterPokemonById();
  };

  const filterPokemonByName = (): void => {
    const results = pokemonList.filter(({name}) =>
      name.toLowerCase().includes(term.toLowerCase()),
    );
    setFilteredPokemon(results);
  };

  const filterPokemonById = (): void => {
    const result = pokemonList.find(({id}) => id === term);
    setFilteredPokemon(result ? [result] : []);
  };

  const renderAppTitle = (): JSX.Element => (
    <Typography
      type="title"
      style={{
        ...styles.title,
        marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
      }}>
      {term}
    </Typography>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={colors.gray} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchInput
        onDebounce={setTerm}
        style={{
          ...styles.searchInput,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      {filteredPokemon.length ? (
        <FlatList
          data={filteredPokemon}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={renderAppTitle}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Image
            source={require('~assets/search-empty-state.png')}
            style={styles.imageEmptyState}
          />
          <Typography type="body">Search pokemons by name and id</Typography>
        </View>
      )}
    </View>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    marginBottom: 10,
  },
  searchInput: {
    position: 'absolute',
    zIndex: 999,
    width: screenWidth,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmptyState: {
    width: 200,
    height: 200,
  },
});
