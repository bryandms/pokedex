/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useEffect, useRef, useState} from 'react';

// App imports
import {
  Pokemon,
  PokemonPaginatedResponse,
  Result,
} from '~interfaces/pokemonInterface';
import {pokemonAPI} from '~api/pokemonAPI';

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const usePokemonPaginated = () => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const nextPageURL = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  useEffect(() => {
    loadPokemons();
  }, []);

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const loadPokemons = async (): Promise<void> => {
    setIsLoading(true);
    const response = await pokemonAPI.get<PokemonPaginatedResponse>(
      nextPageURL.current,
    );
    nextPageURL.current = response.data.next;
    mapPokemonList(response.data.results);
    setIsLoading(false);
  };

  const mapPokemonList = (pokemons: Result[]): void => {
    const newPokemonList: Pokemon[] = pokemons.map(({name, url}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, name, picture};
    });

    setPokemonList([...pokemonList, ...newPokemonList]);
  };

  /* –– Public API
   * –––––––––––––––––––––––––––––––––– */
  return {
    isLoading,
    pokemonList,
  };
};
