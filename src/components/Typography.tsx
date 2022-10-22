/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

// App imports
import {typography, TypographyTheme} from '~themes/fonts';
import {colors, ColorsTheme} from '~themes/colors';

/* ––
 * –––– Types definition
 * –––––––––––––––––––––––––––––––––– */
type TypographyProps = React.ComponentProps<typeof Text> & {
  color?: keyof ColorsTheme;
  type?: keyof TypographyTheme;
  style?: StyleProp<TextStyle>;
};

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const Typography = ({
  color = 'black',
  type = 'body',
  style,
  ...props
}: TypographyProps): JSX.Element => {
  return (
    <Text
      style={[{color: colors[color], ...typography[type]}, style]}
      {...props}
    />
  );
};
