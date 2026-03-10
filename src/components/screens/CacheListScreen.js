import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../layout/Screen';

const CacheListScreen = () => {
  return (
    <Screen>
      <Text style={styles.text}>Cache List - View Your Discovered Treasures</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default CacheListScreen;