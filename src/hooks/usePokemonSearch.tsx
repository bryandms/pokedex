/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useEffect, useState} from 'react';

// App imports
import {PokemonBase, PokemonPaginatedResponse} from '~interfaces/pokemon';
import {mapPokemonList} from '~helpers/mapPokemonList';
import {pokemonAPI} from '~api/pokemonAPI';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface usePokemonSearchResponse {
  isLoading: boolean;
  pokemonList: PokemonBase[];
}

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const usePokemonSearch = (): usePokemonSearchResponse => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<PokemonBase[]>([]);

  useEffect(() => {
    loadPokemons();
  }, []);

  /* –– Public API
   * –––––––––––––––––––––––––––––––––– */
  const loadPokemons = async (): Promise<void> => {
    const response = await pokemonAPI.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );
    const newPokemonList = mapPokemonList(response.data.results);
    setPokemonList([...pokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  return {
    isLoading,
    pokemonList,
  };
};
