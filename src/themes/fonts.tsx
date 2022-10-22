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
 * –––– Constants definition
 * –––––––––––––––––––––––––––––––––– */
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
