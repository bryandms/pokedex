/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {Text} from 'react-native';

// App imports
import {colors, typography, ColorsTheme, TypographyTheme} from '~themes/fonts';

type TypographyProps = React.ComponentProps<typeof Text> & {
  color?: keyof ColorsTheme;
  type?: keyof TypographyTheme;
};

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const TypographyComponent = ({
  color = 'black',
  type = 'body',
  ...props
}: TypographyProps): JSX.Element => {
  return (
    <Text style={{color: colors[color], ...typography[type]}} {...props} />
  );
};
