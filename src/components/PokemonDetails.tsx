/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

// App imports
import {Pokemon} from '~interfaces/pokemon';
import {Typography} from '~components/Typography';
import {FadeInImage} from '~components/FadeInImage';

/* ––
 * –––– Interfaces definition
 * –––––––––––––––––––––––––––––––––– */
interface PokemonDetailsProps {
  pokemon: Pokemon;
}

/* ––
 * –––– Component definition
 * –––––––––––––––––––––––––––––––––– */
export const PokemonDetails = ({pokemon}: PokemonDetailsProps): JSX.Element => {
  /* –– Helper methods
   * –––––––––––––––––––––––––––––––––– */
  const hectogramsToKilograms = (hectograms: number): number => hectograms / 10;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.spacer}>
        <View style={styles.content}>
          <Typography type="title">Types</Typography>
          <View style={styles.row}>
            {pokemon.types.map(({type}) => (
              <Typography key={type.name} type="body" style={styles.list}>
                {type.name}
              </Typography>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Typography type="title">Base skills</Typography>
          <View style={styles.row}>
            {pokemon.abilities.map(({ability}) => (
              <Typography key={ability.name} type="body" style={styles.list}>
                {ability.name}
              </Typography>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Typography type="title">Weight</Typography>
          <View style={styles.row}>
            <Typography type="body">
              {hectogramsToKilograms(pokemon.weight)} kg
            </Typography>
          </View>
        </View>

        <View style={styles.content}>
          <Typography type="title">Sprites</Typography>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
            <FadeInImage
              uri={pokemon.sprites.back_default}
              style={styles.basicSprite}
            />
            <FadeInImage
              uri={pokemon.sprites.front_shiny}
              style={styles.basicSprite}
            />
            <FadeInImage
              uri={pokemon.sprites.back_shiny}
              style={styles.basicSprite}
            />
          </ScrollView>
        </View>

        <View style={styles.content}>
          <Typography type="title">Base skills</Typography>
          <View style={[styles.row, styles.horizontalListContainer]}>
            {pokemon.moves.map(({move}) => (
              <Typography key={move.name} type="body" style={styles.list}>
                {move.name}
              </Typography>
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <Typography type="title">Stats</Typography>
          <View>
            {pokemon.stats.map((stat, index) => (
              <View key={stat.stat.name + index} style={styles.row}>
                <Typography type="body" style={{...styles.list, width: 150}}>
                  {stat.stat.name}
                </Typography>

                <Typography
                  type="body"
                  style={{...styles.list, fontWeight: 'bold'}}>
                  {stat.base_stat}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

/* ––
 * –––– Styles definition
 * –––––––––––––––––––––––––––––––––– */
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  spacer: {
    marginTop: 380,
    marginBottom: 90,
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    marginRight: 10,
  },
  horizontalListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
});
