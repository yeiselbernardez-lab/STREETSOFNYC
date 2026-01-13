import React, { ReactNode } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';

type Props = {
  /** Called with the measured width of the crosswalk stage for animations. */
  onStageLayout: (width: number) => void;
  /** Animated walkers are rendered inside the crosswalk stage. */
  children?: ReactNode;
};

/**
 * A playful NYC-inspired street scene built from simple Views.
 * Everything is web-safe (no native-only APIs).
 */
export function StreetScene({ onStageLayout, children }: Props) {
  const handleStageLayout = (e: LayoutChangeEvent) => {
    onStageLayout(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.sceneOuter}>
      <View style={styles.sky}>
        <View style={[styles.building, styles.b1]} />
        <View style={[styles.building, styles.b2]} />
        <View style={[styles.building, styles.b3]} />
        <View style={[styles.building, styles.b4]} />
        <View style={[styles.building, styles.b5]} />
        <Text style={styles.skyLabel}>NYC</Text>
      </View>

      <View style={styles.storefrontRow}>
        <Storefront name="BODEGA" color="#ffcc00" />
        <Storefront name="COFFEE" color="#c8a27a" />
        <Storefront name="DELI" color="#7dd3fc" />
      </View>

      <View style={styles.street}>
        <View style={styles.signs}>
          <PedSignal label="WALK" light="#34a853" />
          <PedSignal label="STOP" light="#ea4335" />
        </View>

        {/* Crosswalk stage: walkers overlay here. */}
        <View style={styles.crosswalkStage} onLayout={handleStageLayout}>
          <View style={styles.crosswalkStripes}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={i} style={styles.stripe} />
            ))}
          </View>
          {children}
        </View>
      </View>
    </View>
  );
}

function Storefront({ name, color }: { name: string; color: string }) {
  return (
    <View style={styles.storefront}>
      <View style={[styles.storeSign, { backgroundColor: color }]}>
        <Text style={styles.storeSignText}>{name}</Text>
      </View>
      <View style={styles.storeBody}>
        <View style={styles.storeWindow} />
        <View style={styles.storeDoor} />
      </View>
    </View>
  );
}

function PedSignal({ label, light }: { label: string; light: string }) {
  return (
    <View style={styles.signal}>
      <View style={styles.signalBox}>
        <View style={[styles.signalLight, { backgroundColor: light }]} />
      </View>
      <Text style={styles.signalText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sceneOuter: {
    width: '100%',
    maxWidth: 640,
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#e8eef7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },

  // Skyline
  sky: {
    height: 140,
    backgroundColor: '#cfe3ff',
    position: 'relative',
  },
  skyLabel: {
    position: 'absolute',
    right: 12,
    top: 10,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: 'rgba(0,0,0,0.35)',
  },
  building: {
    position: 'absolute',
    bottom: 0,
    width: 64,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#8aa7c7',
    opacity: 0.9,
  },
  b1: { left: 18, height: 110, width: 70, backgroundColor: '#88a0bf' },
  b2: { left: 92, height: 88, width: 58, backgroundColor: '#6e8fb3' },
  b3: { left: 156, height: 130, width: 76, backgroundColor: '#7f9ec1' },
  b4: { left: 240, height: 96, width: 62, backgroundColor: '#6a86a6' },
  b5: { left: 310, height: 120, width: 82, backgroundColor: '#7a98bb' },

  // Storefronts
  storefrontRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#e6f0ff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  storefront: {
    flex: 1,
    maxWidth: 190,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  storeSign: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  storeSignText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: 'rgba(0,0,0,0.75)',
    textAlign: 'center',
  },
  storeBody: {
    flexDirection: 'row',
    gap: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeWindow: {
    width: 34,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  storeDoor: {
    width: 18,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#c7c7c7',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
  },

  // Street / crosswalk
  street: {
    backgroundColor: '#3a3a3a',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  signs: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 14,
    marginBottom: 10,
  },
  signal: {
    alignItems: 'center',
  },
  signalBox: {
    width: 30,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  signalLight: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  signalText: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.8,
  },
  crosswalkStage: {
    height: 150,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#4a4a4a',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    position: 'relative',
  },
  crosswalkStripes: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  stripe: {
    width: 18,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    flex: 1,
  },
});

