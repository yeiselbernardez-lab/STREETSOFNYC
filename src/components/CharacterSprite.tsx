import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CharacterType, getCharacterDefinition } from '../types/characters';

type Props = {
  type: CharacterType;
  /**
   * Pixel size multiplier for the sprite.
   * Keep small-ish so multiple walkers can be on-screen.
   */
  scale?: number;
};

/**
 * Lightweight placeholder character "illustrations" made from Views.
 * This keeps the app asset-free and compatible with Expo Web.
 */
export function CharacterSprite({ type, scale = 1 }: Props) {
  const { palette } = getCharacterDefinition(type);

  const s = getScaledStyles(scale);

  const hasAfro = type === 'black_woman_afro' || type === 'man_afro_beard';
  const hasBlondeHair = type === 'white_woman_blonde';
  const hasBigBeard = type === 'man_afro_beard';
  const isLittleGirl = type === 'little_girl_curly';
  const isOldMan = type === 'old_man_beard_cane';

  return (
    <View style={s.wrapper} pointerEvents="none">
      {/* Head */}
      <View style={[s.head, { backgroundColor: palette.skin }]}>
        {/* Hair */}
        {hasAfro ? <View style={[s.afro, { backgroundColor: palette.hair }]} /> : null}
        {hasBlondeHair ? <View style={[s.blonde, { backgroundColor: palette.hair }]} /> : null}
        {isLittleGirl ? <View style={[s.curls, { borderColor: palette.hair }]} /> : null}
      </View>

      {/* Beard(s) */}
      {hasBigBeard ? <View style={[s.bigBeard, { backgroundColor: palette.hair }]} /> : null}
      {isOldMan ? <View style={[s.longBeard, { backgroundColor: palette.hair }]} /> : null}

      {/* Body */}
      <View style={[s.body, { backgroundColor: palette.outfit }]} />

      {/* Legs */}
      <View style={s.legsRow}>
        <View style={[s.leg, { backgroundColor: palette.accessory }]} />
        <View style={[s.leg, { backgroundColor: palette.accessory }]} />
      </View>

      {/* Cane */}
      {isOldMan ? (
        <View style={s.caneWrap}>
          <View style={[s.cane, { borderColor: palette.accessory }]} />
        </View>
      ) : null}

      {/* Accessory: simple bag for the women/girl */}
      {type === 'black_woman_afro' || type === 'white_woman_blonde' || isLittleGirl ? (
        <View style={[s.bag, { backgroundColor: palette.accessory }]} />
      ) : null}
    </View>
  );
}

function getScaledStyles(scale: number) {
  const w = 46 * scale;
  const h = 64 * scale;
  const head = 20 * scale;

  return StyleSheet.create({
    wrapper: {
      width: w,
      height: h,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    head: {
      width: head,
      height: head,
      borderRadius: head / 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2 * scale,
    },
    afro: {
      position: 'absolute',
      top: -6 * scale,
      width: (head + 12 * scale),
      height: (head + 12 * scale),
      borderRadius: (head + 12 * scale) / 2,
      opacity: 0.95,
    },
    blonde: {
      position: 'absolute',
      top: -4 * scale,
      width: (head + 8 * scale),
      height: (head + 8 * scale),
      borderTopLeftRadius: (head + 8 * scale) / 2,
      borderTopRightRadius: (head + 8 * scale) / 2,
      borderBottomLeftRadius: 6 * scale,
      borderBottomRightRadius: 6 * scale,
      opacity: 0.95,
    },
    curls: {
      position: 'absolute',
      top: -2 * scale,
      width: (head + 8 * scale),
      height: (head + 8 * scale),
      borderRadius: (head + 8 * scale) / 2,
      borderWidth: 3 * scale,
      opacity: 0.85,
    },
    bigBeard: {
      marginTop: -2 * scale,
      width: 18 * scale,
      height: 12 * scale,
      borderBottomLeftRadius: 10 * scale,
      borderBottomRightRadius: 10 * scale,
      opacity: 0.95,
    },
    longBeard: {
      marginTop: -2 * scale,
      width: 18 * scale,
      height: 20 * scale,
      borderBottomLeftRadius: 12 * scale,
      borderBottomRightRadius: 12 * scale,
      opacity: 0.95,
    },
    body: {
      marginTop: 3 * scale,
      width: 26 * scale,
      height: 22 * scale,
      borderRadius: 6 * scale,
    },
    legsRow: {
      flexDirection: 'row',
      gap: 6 * scale,
      marginTop: 2 * scale,
    },
    leg: {
      width: 6 * scale,
      height: 14 * scale,
      borderRadius: 3 * scale,
    },
    bag: {
      position: 'absolute',
      right: 6 * scale,
      top: 30 * scale,
      width: 10 * scale,
      height: 10 * scale,
      borderRadius: 3 * scale,
      opacity: 0.95,
    },
    caneWrap: {
      position: 'absolute',
      left: 4 * scale,
      top: 34 * scale,
    },
    cane: {
      width: 10 * scale,
      height: 22 * scale,
      borderLeftWidth: 3 * scale,
      borderTopWidth: 3 * scale,
      borderTopLeftRadius: 10 * scale,
      opacity: 0.95,
    },
  });
}

