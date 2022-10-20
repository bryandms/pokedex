/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
export interface PokemonPaginatedResponse {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}

export interface Pokemon {
  id: string;
  name: string;
  picture: string;
  color?: string;
}
