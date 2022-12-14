/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useEffect, useRef, useState} from 'react';

// App imports
import {PokemonBase, PokemonPaginatedResponse} from '~interfaces/pokemon';
import {mapPokemonList} from '~helpers/mapPokemonList';
import {pokemonAPI} from '~api/pokemonAPI';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface UsePokemonPaginatedResponse {
  isLoading: boolean;
  pokemonList: PokemonBase[];
  loadPokemons: () => Promise<void>;
}

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const usePokemonPaginated = (): UsePokemonPaginatedResponse => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<PokemonBase[]>([]);
  const nextPageURL = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  useEffect(() => {
    loadPokemons();
  }, []);

  /* –– Public API
   * –––––––––––––––––––––––––––––––––– */
  const loadPokemons = async (): Promise<void> => {
    if (!nextPageURL.current) {
      return;
    }

    setIsLoading(true);
    const response = await pokemonAPI.get<PokemonPaginatedResponse>(
      nextPageURL.current,
    );
    nextPageURL.current = response.data.next;
    const newPokemonList = mapPokemonList(response.data.results);
    setPokemonList([...pokemonList, ...newPokemonList]);
    setIsLoading(false);
  };

  return {
    isLoading,
    pokemonList,
    loadPokemons,
  };
};
