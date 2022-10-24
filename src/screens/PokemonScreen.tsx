/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Third-party imports
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// App imports
import {RootStackParams} from '~navigator/AppNavigator';
import {Typography} from '~components/Typography';
import {FadeInImage} from '~components/FadeInImage';
import {usePokemon} from '~hooks/usePokemon';
import {PokemonDetails} from '~components/PokemonDetails';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface PokemonScreenProps
  extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

/* ––
 * –––– Screen definition
 * –––––––––––––––––––––––––––––––––– */
export const PokemonScreen = ({
  navigation,
  route,
}: PokemonScreenProps): JSX.Element => {
  /* –– Properties
   * –––––––––––––––––––––––––––––––––– */
  const {pokemon, color} = route.params;
  const {id, name, picture} = pokemon;

  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const {top} = useSafeAreaInsets();
  const {isLoading, pokemonDetails} = usePokemon(id);

  return (
    <View style={styles.container}>
      <View style={{...styles.headerContainer, backgroundColor: color}}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{...styles.backButton, top: top + 5}}
          onPress={() => navigation.pop()}>
          <Icon name="arrow-back-outline" color="white" size={35} />
        </TouchableOpacity>

        <Typography
          color="white"
          type="title"
          style={{...styles.title, top: top + 40}}>
          {`${name}\n#${id}`}
        </Typography>

        <Image
          source={require('~assets/white-pokeball.png')}
          style={styles.pokeball}
        />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonDetails} />
      )}
    </View>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  title: {
    alignSelf: 'flex-start',
    left: 20,
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
