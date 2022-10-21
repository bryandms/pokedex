/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useRef} from 'react';
import {Animated} from 'react-native';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface UseAnimationResponse {
  opacity: Animated.Value;
  position: Animated.Value;
  fadeIn: (duration?: number) => void;
  fadeOut: (duration?: number) => void;
  startMovingPosition: (initPosition: number, duration?: number) => void;
}

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const useAnimation = (): UseAnimationResponse => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const opacity = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.Value(0)).current;

  /* –– Public API
   * –––––––––––––––––––––––––––––––––– */
  const fadeIn = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (duration: number = 300) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const startMovingPosition = (
    initPosition: number,
    duration: number = 300,
  ) => {
    position.setValue(initPosition);
    Animated.timing(position, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return {
    opacity,
    position,
    fadeIn,
    fadeOut,
    startMovingPosition,
  };
};
