/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import {useState, useEffect} from 'react';

/* ––
 * –––– Hook definition
 * –––––––––––––––––––––––––––––––––– */
export const useDebouncedValue = (input: string = '', time: number = 500) => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return debouncedValue;
};
