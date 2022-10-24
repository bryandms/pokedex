/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React, {useCallback, useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// Third-party imports
import {useNavigation} from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';

// App imports
import {colors} from '~themes/colors';
import {PokemonBase} from '~interfaces/pokemon';
import {Typography} from '~components/Typography';
import {FadeInImage} from '~components/FadeInImage';

/* ––
 * –––– Constants definition
 * –––––––––––––––––––––––––––––––––– */
const windowWidth = Dimensions.get('window').width - 20;

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface PokemonCardProps {
  pokemon: PokemonBase;
}

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const PokemonCard = ({pokemon}: PokemonCardProps): JSX.Element => {
  /* –– Hooks
   * –––––––––––––––––––––––––––––––––– */
  const [backgroundColor, setBackgroundColor] = useState(colors.gray);
  const isMounted = useRef(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (!isMounted) return;

    setPokemonCardBackground();

    return () => {
      isMounted.current = false;
    };
  }, []);

  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const setPokemonCardBackground = useCallback(async () => {
    const imageColors = await ImageColors.getColors(pokemon.picture);
    const {platform} = imageColors;
    const cardBackground =
      platform === 'ios' ? imageColors.background : imageColors.dominant;

    setBackgroundColor(cardBackground || colors.gray);
  }, [pokemon.picture]);

  const navigateToPokemon = () =>
    navigation.navigate('PokemonScreen', {pokemon, color: backgroundColor});

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigateToPokemon}>
      <View style={styles.shadow} />
      <View style={{...styles.cardContainer, backgroundColor}}>
        <View>
          <Typography color="white" style={styles.cardHeader}>
            {pokemon.name}
          </Typography>
          <Typography color="white" style={styles.cardHeader}>
            #{pokemon.id}
          </Typography>
        </View>

        <View style={styles.pokeballContainer}>
          <Image
            source={require('~assets/white-pokeball.png')}
            style={styles.pokeball}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    height: 120,
    width: windowWidth * 0.4 + 2,
    left: 10,
    bottom: 22,
    borderRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.2)',
  },
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: windowWidth * 0.4,
    marginBottom: 25,
    borderRadius: 10,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -8,
  },
});
