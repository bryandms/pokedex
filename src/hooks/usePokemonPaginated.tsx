/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useEffect, useRef, useState} from 'react';

// App imports
import {
  PokemonBase,
  PokemonPaginatedResponse,
  Result,
} from '~interfaces/pokemon';
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

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const mapPokemonList = (pokemons: Result[]): void => {
    const newPokemonList: PokemonBase[] = pokemons.map(({name, url}) => {
      const id = getPokemonIdFromURL(url);
      const picture = getPokemonImage(id);

      return {id, name, picture};
    });

    setPokemonList([...pokemonList, ...newPokemonList]);
  };

  const getPokemonIdFromURL = (url: string): string => {
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2];

    return id;
  };

  const getPokemonImage = (id: string): string =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

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
    mapPokemonList(response.data.results);
    setIsLoading(false);
  };

  return {
    isLoading,
    pokemonList,
    loadPokemons,
  };
};
