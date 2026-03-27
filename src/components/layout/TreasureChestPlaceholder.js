import React from 'react';
import { View, StyleSheet } from 'react-native';

/**
 * TreasureChestPlaceholder - A styled SVG-like treasure chest icon
 * Used as a fallback when CacheImageURL is not available
 */
const TreasureChestPlaceholder = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      {/* Chest Lid */}
      <View style={styles.lid} />
      
      {/* Chest Body */}
      <View style={styles.body}>
        {/* Gold accent stripes */}
        <View style={styles.stripe} />
        <View style={styles.stripe} />
      </View>
      
      {/* Lock */}
      <View style={styles.lock} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  lid: {
    width: '90%',
    height: '25%',
    backgroundColor: '#A0522D',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 2,
    borderWidth: 2,
    borderColor: '#654321',
  },
  body: {
    width: '90%',
    height: '60%',
    backgroundColor: '#8B4513',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 2,
    borderColor: '#654321',
  },
  stripe: {
    height: 3,
    backgroundColor: '#FFD700',
    marginVertical: 5,
    markWidth: '100%',
  },
  lock: {
    width: 16,
    height: 16,
    backgroundColor: '#FFD700',
    borderRadius: 3,
    position: 'absolute',
    top: '28%',
    left: '50%',
    marginLeft: -8,
    borderWidth: 1,
    borderColor: '#DAA520',
  },
});

export default TreasureChestPlaceholder;
