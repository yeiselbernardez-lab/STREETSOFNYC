import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CharacterType, getCharacterDefinition } from '../types/characters';

type Props = {
  type: CharacterType;
  count: number;
  onPress: (type: CharacterType) => void;
};

export function CharacterButton({ type, count, onPress }: Props) {
  const def = getCharacterDefinition(type);

  return (
    <Pressable
      onPress={() => onPress(type)}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Spawn ${def.label}`}
    >
      <View style={[styles.swatch, { backgroundColor: def.palette.outfit }]} />
      <View style={styles.textCol}>
        <Text style={styles.label} numberOfLines={1}>
          {def.label}
        </Text>
        <Text style={styles.count}>Spawned: {count}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
    flexBasis: '48%',
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  swatch: {
    width: 14,
    height: 36,
    borderRadius: 8,
  },
  textCol: {
    flex: 1,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  count: {
    marginTop: 2,
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    fontWeight: '600',
  },
});

