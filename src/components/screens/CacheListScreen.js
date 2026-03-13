import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Screen from "../layout/Screen";

const CacheListScreen = () => {
  const navigation = useNavigation(); // <-- Add this
  const [caches, setCaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Graeme's API when the component mounts
  useEffect(() => {
    const fetchCaches = async () => {
      try {
        // Using the public key provided in the assignment email
        const response = await fetch("http://mark0s.com/geoquest/v1/api/caches?key=16gv8f");
        const data = await response.json();
        setCaches(data);
      } catch (error) {
        console.error("Error fetching caches:", error);
        Alert.alert("Error", "Could not load caches from the server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaches();
  }, []);

  const handlePress = (cache) => {
    // Pass the selected cache object to the Detail screen
    navigation.navigate("CacheDetail", { cache: cache }); 
  };

  return (
    <Screen>
      <Text style={styles.title}>
        Cache List - View Your Discovered Treasures
      </Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView>
          {caches.map((cache) => (
            <Pressable
              key={cache.CacheID}
              style={styles.card}
              onPress={() => handlePress(cache)}
            >
              {/* Updated to use the correct API property: CacheImageURL */}
              {cache.CacheImageURL ? (
                <Image source={{ uri: cache.CacheImageURL }} style={styles.image} />
              ) : (
                <View style={[styles.image, { backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }]}>
                  <Text>No Image</Text>
                </View>
              )}

              <View style={styles.info}>
                <Text style={styles.name}>{cache.CacheName}</Text>
                <Text style={styles.details}>{cache.CacheDescription}</Text>
                <Text style={styles.details}>Clue: {cache.CacheClue}</Text>
                <Text style={styles.details}>Points: {cache.CachePoints}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 16,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#555',
  },
});

export default CacheListScreen;