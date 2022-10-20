/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {TextStyle} from 'react-native';

/* ––
 * –––– Types definition
 * –––––––––––––––––––––––––––––––––– */
export type TypographyTheme = {
  title: TextStyle;
  subtitle: TextStyle;
  body: TextStyle;
};

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
export interface ColorsTheme {
  white: string;
  black: string;
}

/* ––
 * –––– Constants definition
 * –––––––––––––––––––––––––––––––––– */
export const colors: ColorsTheme = {
  white: '#FFFFFF',
  black: '#323232',
};

export const typography: TypographyTheme = {
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '400',
  },
  body: {
    fontSize: 18,
    fontWeight: '400',
  },
};
