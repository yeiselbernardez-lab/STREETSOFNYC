import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { CharacterButtonRow } from './src/components/CharacterButtonRow';
import { StreetScene } from './src/components/StreetScene';
import { Walker, WalkerInstance } from './src/components/Walker';
import { CharacterType, CHARACTER_ORDER } from './src/types/characters';

export default function App() {
  const { width: windowWidth } = useWindowDimensions();

  const [stageWidth, setStageWidth] = useState<number>(Math.min(640, windowWidth));
  const [walkers, setWalkers] = useState<WalkerInstance[]>([]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') {
      return;
    }

    const scriptId = 'effectivegatecpm-ad-unit';
    if (document.getElementById(scriptId)) {
      return;
    }

    // Inject the ad unit script only on web builds.
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://pl28642362.effectivegatecpm.com/a5/75/af/a575af2a70fb4d8e9cfb15941a9e8298.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  // Track click counts per character type.
  const [counts, setCounts] = useState<Record<CharacterType, number>>(() => {
    return CHARACTER_ORDER.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {} as Record<CharacterType, number>);
  });

  // Stable ID generator for unique walker instances.
  const idCounterRef = useRef(0);
  const spawnIndexRef = useRef(0);

  const laneCount = 4;
  const laneYs = useMemo(() => {
    // Tuned for the crosswalk stage height in StreetScene (150px).
    const baseTop = 44;
    const gap = 18;
    return Array.from({ length: laneCount }).map((_, i) => baseTop + i * gap);
  }, []);

  const handleExited = useCallback((id: string) => {
    setWalkers((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const spawn = useCallback((type: CharacterType) => {
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    const nextIndex = spawnIndexRef.current++;
    const lane = nextIndex % laneCount;

    const id = `${type}-${Date.now()}-${idCounterRef.current++}`;
    const instance: WalkerInstance = { id, type, lane };
    setWalkers((prev) => [...prev, instance]);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Big, high-contrast title "button" near the top. */}
        <Pressable
          onPress={() => {
            // Title is intentionally a button per requirements; no action required.
          }}
          style={({ pressed }) => [styles.titleButton, pressed && styles.titleButtonPressed]}
          accessibilityRole="button"
          accessibilityLabel="The Streets of New York"
        >
          <Text style={styles.titleText}>THE STREETS OF NEW YORK</Text>
        </Pressable>

        <View style={styles.sceneWrap}>
          <StreetScene onStageLayout={setStageWidth}>
            {walkers.map((w) => (
              <Walker
                key={w.id}
                instance={w}
                stageWidth={stageWidth || Math.min(640, windowWidth)}
                laneY={laneYs[w.lane] ?? laneYs[0]}
                onExited={handleExited}
              />
            ))}
          </StreetScene>
        </View>

        <CharacterButtonRow counts={counts} onPress={spawn} />
      </View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleButton: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: '#0b1020',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  titleButtonPressed: {
    opacity: 0.92,
  },
  titleText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  sceneWrap: {
    width: '100%',
    marginTop: 14,
  },
});
