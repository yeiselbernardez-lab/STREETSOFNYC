export type CharacterType =
  | 'black_woman_afro'
  | 'white_woman_blonde'
  | 'man_afro_beard'
  | 'little_girl_curly'
  | 'old_man_beard_cane';

export type CharacterDefinition = {
  type: CharacterType;
  /** Friendly label shown on buttons. */
  label: string;
  /** Accent colors used by the placeholder "sprite" drawings. */
  palette: {
    skin: string;
    hair: string;
    outfit: string;
    accessory: string;
  };
};

export const CHARACTER_DEFINITIONS: CharacterDefinition[] = [
  {
    type: 'black_woman_afro',
    label: 'Black woman (afro)',
    palette: {
      skin: '#7a4a2b',
      hair: '#1f1f1f',
      outfit: '#2f6fed',
      accessory: '#f2c94c',
    },
  },
  {
    type: 'white_woman_blonde',
    label: 'White woman (blonde)',
    palette: {
      skin: '#f1c9a4',
      hair: '#f2d16b',
      outfit: '#e94b6c',
      accessory: '#1f1f1f',
    },
  },
  {
    type: 'man_afro_beard',
    label: 'Man (afro + beard)',
    palette: {
      skin: '#8b5a36',
      hair: '#2b2b2b',
      outfit: '#34a853',
      accessory: '#1f1f1f',
    },
  },
  {
    type: 'little_girl_curly',
    label: 'Little girl (curly)',
    palette: {
      skin: '#d9a17a',
      hair: '#3b2a1a',
      outfit: '#8e44ad',
      accessory: '#ff6f61',
    },
  },
  {
    type: 'old_man_beard_cane',
    label: 'Old man (long beard + cane)',
    palette: {
      skin: '#d2b48c',
      hair: '#e9e9e9',
      outfit: '#4f4f4f',
      accessory: '#8d6e63',
    },
  },
];

export const CHARACTER_ORDER: CharacterType[] = CHARACTER_DEFINITIONS.map((c) => c.type);

export function getCharacterDefinition(type: CharacterType): CharacterDefinition {
  const found = CHARACTER_DEFINITIONS.find((c) => c.type === type);
  if (!found) {
    // This should be unreachable unless new types are added without definitions.
    throw new Error(`Unknown character type: ${type}`);
  }
  return found;
}

