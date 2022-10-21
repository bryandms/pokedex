/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

// App imports
import {useAnimation} from '~hooks/useAnimation';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface FadeInImageProps {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const FadeInImageComponent = ({
  uri,
  style = {},
}: FadeInImageProps): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const {opacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = () => {
    setIsLoading(false);
  };

  const renderActivityIndicator = (): JSX.Element => (
    <ActivityIndicator style={styles.loadingIndicator} color="grey" size={30} />
  );

  return (
    <View
      style={{
        ...styles.container,
        ...(style as Object),
      }}>
      {isLoading && renderActivityIndicator()}

      <Animated.Image
        source={{uri}}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as Object),
          opacity,
        }}
      />
    </View>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    position: 'absolute',
  },
});
