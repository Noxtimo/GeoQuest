import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Screen from '../layout/Screen';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [caches, setCaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch the user's current GPS Location
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
    };

    // 2. Fetch the Cache data from the API
    const fetchCaches = async () => {
      try {
        const response = await fetch("http://mark0s.com/geoquest/v1/api/caches?key=16gv8f");
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
      <MapView
        style={styles.map}
        showsUserLocation={true} // Automatically shows the user's live GPS location (blue dot)
        showsMyLocationButton={true} // Adds a button to snap back to the user
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05, // Zoom level
          longitudeDelta: 0.05, // Zoom level
        }}
      >
        {/* Loop through API data and drop a pin for every cache */}
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
            {/* Callout appears when the user taps the map pin */}
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