import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
} from 'react-native';
import Screen from '../layout/Screen';
import { useNavigation } from '@react-navigation/native';

const PermissionDeniedScreen = ({ permissionType = 'location' }) => {
  const navigation = useNavigation();

  const getPermissionMessage = () => {
    switch (permissionType) {
      case 'location':
        return {
          title: 'Location Permission Denied',
          message: 'We need access to your location to show nearby caches on the map. Please enable location services in your device settings.',
          icon: '📍',
        };
      default:
        return {
          title: 'Permission Denied',
          message: 'We need the required permissions to provide the full experience. Please check your device settings.',
          icon: '⚙️',
        };
    }
  };

  const permission = getPermissionMessage();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.icon}>{permission.icon}</Text>
          <Text style={styles.title}>{permission.title}</Text>
          <Text style={styles.message}>{permission.message}</Text>

          <View style={styles.steps}>
            <Text style={styles.stepsTitle}>How to fix:</Text>
            <Text style={styles.step}>1. Open your device Settings</Text>
            <Text style={styles.step}>2. Go to Apps or Application Manager</Text>
            <Text style={styles.step}>3. Find and select "GeoQuest"</Text>
            <Text style={styles.step}>4. Tap Permissions</Text>
            <Text style={styles.step}>5. Enable Location permission</Text>
            <Text style={styles.step}>6. Return to GeoQuest</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('CacheList')}
          >
            <Text style={styles.secondaryButtonText}>View Cache List</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  steps: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  stepsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  step: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 10,
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e0e0e0',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PermissionDeniedScreen;
