/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

// Third-party imports
import Icon from 'react-native-vector-icons/Ionicons';

// App imports
import {colors} from '~themes/colors';
import {useDebouncedValue} from '~hooks/useDebouncedValue';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface SearchInputProps {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
}

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const SearchInput = ({
  style,
  onDebounce,
}: SearchInputProps): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [textValue, setTextValue] = useState('');
  const debouncedValue = useDebouncedValue(textValue);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <View style={[styles.textInputContainer, style]}>
      <TextInput
        placeholder="Search pokemon..."
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        value={textValue}
        onChangeText={setTextValue}
      />

      <Icon name="search-outline" color={colors.gray} size={30} />
    </View>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    top: Platform.OS === 'ios' ? 0 : 2,
  },
});
