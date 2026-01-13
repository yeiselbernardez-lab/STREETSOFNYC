import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { CharacterType } from '../types/characters';
import { CharacterSprite } from './CharacterSprite';

export type WalkerInstance = {
  id: string;
  type: CharacterType;
  /**
   * Which "lane" (vertical offset) within the crosswalk the walker uses.
   * This helps reduce full overlap when multiple walkers are spawned quickly.
   */
  lane: number;
};

type Props = {
  instance: WalkerInstance;
  stageWidth: number;
  laneY: number;
  onExited: (id: string) => void;
};

const SPRITE_WIDTH = 46;

/**
 * A single animated walker that enters from the left, crosses the stage,
 * then notifies the parent to remove it from state when it exits right.
 */
export function Walker({ instance, stageWidth, laneY, onExited }: Props) {
  const translateX = useRef(new Animated.Value(-SPRITE_WIDTH - 24)).current;
  const bob = useRef(new Animated.Value(0)).current;

  const durationMs = useMemo(() => {
    // Slight randomness so groups feel less robotic.
    const base = 6500;
    const jitter = (instance.lane % 3) * 250;
    return base + jitter;
  }, [instance.lane]);

  useEffect(() => {
    const bobbing = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: -4,
          duration: 260,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 260,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );

    // Walk to just beyond the right edge.
    const walk = Animated.timing(translateX, {
      toValue: stageWidth + SPRITE_WIDTH + 24,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    bobbing.start();
    walk.start(({ finished }) => {
      if (finished) onExited(instance.id);
    });

    return () => {
      bobbing.stop();
      translateX.stopAnimation();
    };
  }, [bob, durationMs, instance.id, onExited, stageWidth, translateX]);

  return (
    <Animated.View
      style={[
        styles.walker,
        {
          top: laneY,
          transform: [{ translateX }, { translateY: bob }],
        },
      ]}
      pointerEvents="none"
    >
      <View style={styles.shadow} />
      <CharacterSprite type={instance.type as CharacterType} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  walker: {
    position: 'absolute',
    left: 0,
    // top set by prop
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shadow: {
    position: 'absolute',
    bottom: 6,
    width: 30,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.18)',
    transform: [{ scaleX: 1.1 }],
  },
});

