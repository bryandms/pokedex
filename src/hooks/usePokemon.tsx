/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useState, useEffect} from 'react';

// App imports
import {Pokemon} from '~interfaces/pokemon';
import {pokemonAPI} from '~api/pokemonAPI';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface UsePokemonResponse {
  isLoading: boolean;
  pokemonDetails: Pokemon;
}

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const usePokemon = (id: string): UsePokemonResponse => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>({} as Pokemon);

  useEffect(() => {
    loadPokemon();
  }, []);

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const loadPokemon = async (): Promise<void> => {
    const response = await pokemonAPI.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemonDetails(response.data);
    setIsLoading(false);
  };

  return {
    isLoading,
    pokemonDetails,
  };
};
