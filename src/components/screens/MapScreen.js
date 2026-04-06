import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert, Pressable } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import Screen from '../layout/Screen';
import PermissionDeniedScreen from './PermissionDeniedScreen';
import { getApiUrl } from '../../config';

const MapScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [caches, setCaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    // 1. Fetch the user's current GPS Location (Restored Robust Version)
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setPermissionDenied(true);
          setIsLoading(false);
          return;
        }

        // Fallback to getLastKnownPosition first for speed
        let currentLocation = await Location.getLastKnownPositionAsync({});
        
        // If no last known position, request current with a strict timeout
        if (!currentLocation) {
          currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
            timeout: 5000, // Give up after 5 seconds instead of hanging forever
          });
        }

        setLocation(currentLocation.coords);
      } catch (error) {
        console.warn("Could not fetch location:", error);
        // Fall back to a default location (London/Kingston) 
        // so the app still loads if the emulator is acting up.
        setLocation({ latitude: 51.4066, longitude: -0.3045 }); 
      }
    };

    // 2. Fetch the Cache data from the API
    const fetchCaches = async () => {
      try {
        const response = await fetch(getApiUrl('caches'));
        const data = await response.json();
        setCaches(data);
      } catch (error) {
        console.error("Error fetching caches:", error);
        Alert.alert("Error", "Could not load caches for the map.");
      }
    };

    // Run both tasks when the screen loads
    const loadMapData = async () => {
      await getUserLocation();
      await fetchCaches();
      setIsLoading(false);
    };

    loadMapData();
  }, []);

  if (permissionDenied) {
    return <PermissionDeniedScreen permissionType="location" />;
  }

  if (isLoading || !location) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Calibrating GPS and loading caches...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          showsUserLocation={true} 
          showsMyLocationButton={true} 
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05, 
            longitudeDelta: 0.05, 
          }}
        >
          {caches.map((cache) => (
            <Marker
              key={cache.CacheID}
              coordinate={{
                latitude: cache.CacheLatitude,
                longitude: cache.CacheLongitude,
              }}
              title={cache.CacheName}
              description={`Points: ${cache.CachePoints}`}
            >
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{cache.CacheName}</Text>
                  <Text>Points: {cache.CachePoints}</Text>
                  <Text style={styles.calloutClue}>Clue: {cache.CacheClue}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>

        <View style={styles.floatingNav}>
          <Pressable
            style={styles.navButton}
            onPress={() => navigation.navigate("CacheList")}
          >
            <Text style={styles.navButtonText}>View Cache List</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  floatingNav: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
  navButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  calloutContainer: {
    padding: 10,
    minWidth: 150,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  calloutClue: {
    fontStyle: 'italic',
    marginTop: 5,
    color: '#555',
  },
});

export default MapScreen;