import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Alert, Pressable, Image } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../layout/Screen';

const CacheDetailScreen = ({ route, navigation }) => {
  // We receive the specific cache data passed from the previous screen
  const { cache } = route.params; 
  
  const [distance, setDistance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [photoUri, setPhotoUri] = useState(null);
  const [isLogging, setIsLogging] = useState(false);

  // The Haversine Formula: Calculates distance between two GPS coordinates in meters
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const toRad = (value) => (value * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  useEffect(() => {
    const checkProximity = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location is needed to unlock caches.');
        setIsLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      
      const dist = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        cache.CacheLatitude,
        cache.CacheLongitude
      );
      
      setDistance(Math.round(dist));
      setIsLoading(false);
    };

    checkProximity();
  }, [cache]);

  const handleUnlockAndLog = async () => {
    // Request Camera Permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permission Refused", "You need to allow camera access to take photo evidence.");
      return;
    }

    // Open Camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      postFindToAPI(result.assets[0].uri);
    }
  };

  const postFindToAPI = async (imageUri) => {
    setIsLogging(true);
    
    // Constructing the Find Object based on Graeme's API Docs
    const findData = {
      FindPlayerID: 1, // Hardcoded for now until user login is built
      FindCacheID: cache.CacheID,
      FindDatetime: new Date().toISOString(), // ISO 8601 format as requested by the API
      FindImageURL: imageUri // Storing local URI for now
    };

    try {
      const response = await fetch("http://mark0s.com/geoquest/v1/api/finds?key=16gv8f", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(findData),
      });

      if (response.ok) {
        Alert.alert("Success!", `You found ${cache.CacheName} and earned ${cache.CachePoints} points!`);
        navigation.goBack(); // Send them back to the list/map
      } else {
        Alert.alert("Error", "Failed to log the find on the server.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Could not connect to the API.");
    } finally {
      setIsLogging(false);
    }
  };

  // We require the user to be within 50 meters to unlock it
  const isWithinRange = distance !== null && distance <= 50;

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{cache.CacheName}</Text>
        <Text style={styles.description}>{cache.CacheDescription}</Text>
        <Text style={styles.clue}>Clue: {cache.CacheClue}</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.statusContainer}>
            <Text style={styles.distanceText}>
              Distance: {distance} meters away
            </Text>
            
            {isWithinRange ? (
              <Text style={styles.successText}>You are close enough to unlock this cache!</Text>
            ) : (
              <Text style={styles.warningText}>Get within 50 meters to unlock.</Text>
            )}

            <Pressable 
              style={[styles.button, (!isWithinRange || isLogging) && styles.buttonDisabled]} 
              onPress={handleUnlockAndLog}
              disabled={!isWithinRange || isLogging}
            >
              <Text style={styles.buttonText}>
                {isLogging ? "Logging..." : "Take Photo & Unlock Cache"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  clue: { fontSize: 16, fontStyle: 'italic', color: '#555', marginBottom: 30 },
  statusContainer: { alignItems: 'center', width: '100%' },
  distanceText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  successText: { color: 'green', marginBottom: 20, fontSize: 16, textAlign: 'center' },
  warningText: { color: 'red', marginBottom: 20, fontSize: 16, textAlign: 'center' },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#cccccc' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default CacheDetailScreen;
