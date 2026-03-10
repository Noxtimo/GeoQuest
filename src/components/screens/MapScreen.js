import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../layout/Screen';

const MapScreen = () => {
  return (
    <Screen>
      <Text style={styles.text}>Map Screen - Discover Caches Here</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default MapScreen;