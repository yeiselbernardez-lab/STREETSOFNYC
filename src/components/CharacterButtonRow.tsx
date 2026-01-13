import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CharacterType, CHARACTER_ORDER } from '../types/characters';
import { CharacterButton } from './CharacterButton';

type Props = {
  counts: Record<CharacterType, number>;
  onPress: (type: CharacterType) => void;
};

export function CharacterButtonRow({ counts, onPress }: Props) {
  return (
    <View style={styles.wrap}>
      {CHARACTER_ORDER.map((type) => (
        <CharacterButton key={type} type={type} count={counts[type]} onPress={onPress} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    marginTop: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 6,
    paddingBottom: 24,
  },
});

