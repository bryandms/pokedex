/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// App imports
import {PokemonBase, Result} from '~interfaces/pokemon';

/* ––
 * –––– Helper methods
 * –––––––––––––––––––––––––––––––––– */
export const mapPokemonList = (pokemons: Result[]): PokemonBase[] => {
  const newPokemonList: PokemonBase[] = pokemons.map(({name, url}) => {
    const id = getPokemonIdFromURL(url);
    const picture = getPokemonImage(id);

    return {id, name, picture};
  });

  return newPokemonList;
};

const getPokemonIdFromURL = (url: string): string => {
  const urlParts = url.split('/');
  const id = urlParts[urlParts.length - 2];

  return id;
};

const getPokemonImage = (id: string): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
