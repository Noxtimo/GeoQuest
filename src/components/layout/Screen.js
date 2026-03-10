import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const Screen = ({ children }) => {
  return (
    <View style={styles.screen}>
      {/* Sets the status bar text to light against the dark header  */}
      <StatusBar style="light" />
      {/* Renders the specific content for whatever screen is using this layout  */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;