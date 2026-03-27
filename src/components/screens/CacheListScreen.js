import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Screen from "../layout/Screen";
import TreasureChestPlaceholder from "../layout/TreasureChestPlaceholder";
import { getFoundCacheIds } from "../storage/foundCacheStorage";
import { getApiUrl } from "../../config";

const CacheListScreen = () => {
  const navigation = useNavigation();
  const [caches, setCaches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foundCacheIds, setFoundCacheIds] = useState([]);
  const [eventCode, setEventCode] = useState("");

  const loadFoundCaches = useCallback(async () => {
    const ids = await getFoundCacheIds();
    setFoundCacheIds(ids);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFoundCaches();
    }, [loadFoundCaches])
  );

  // Fetch data from Graeme's API when the component mounts or when eventCode changes
  useEffect(() => {
    const fetchCaches = async () => {
      try {
        setIsLoading(true);
        // If eventCode is provided, fetch from events endpoint, otherwise fetch all caches
        const endpoint = eventCode.trim() 
          ? `caches/events/${eventCode.trim()}`
          : 'caches';
        const response = await fetch(getApiUrl(endpoint));
        if (!response.ok) {
          throw new Error('Failed to fetch caches');
        }
        const data = await response.json();
        setCaches(data);
      } catch (error) {
        console.error("Error fetching caches:", error);
        Alert.alert("Error", "Could not load caches from the server.");
        setCaches([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaches();
  }, [eventCode]);

  const handlePress = (cache) => {
    navigation.navigate("CacheDetail", { cache: cache });
  };

  const isFound = (cacheId) => foundCacheIds.includes(Number(cacheId));

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>
          Cache List - View Your Discovered Treasures
        </Text>

        <View style={styles.eventCodeContainer}>
          <TextInput
            style={styles.eventCodeInput}
            placeholder="Enter Event Code"
            placeholderTextColor="#999"
            value={eventCode}
            onChangeText={setEventCode}
            editable={!isLoading}
          />
          {eventCode !== "" && (
            <Pressable
              style={styles.clearButton}
              onPress={() => setEventCode("")}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.navRow}>
          <Pressable
            style={styles.navButton}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.navButtonText}>Go to Map</Text>
          </Pressable>
          <Pressable
            style={styles.navButton}
            onPress={() => navigation.navigate("Leaderboard")}
          >
            <Text style={styles.navButtonText}>Leaderboard</Text>
          </Pressable>
        </View>
      </View>

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
              {/* Use TreasureChestPlaceholder if image not available */}
              {cache.CacheImageURL ? (
                <Image source={{ uri: cache.CacheImageURL }} style={styles.image} />
              ) : (
                <TreasureChestPlaceholder style={styles.image} />
              )}

              <View style={styles.info}>
                <View style={styles.codeRow}>
                  <Text style={styles.code}>
                    {cache.CacheCode || `Cache #${cache.CacheID}`}
                  </Text>
                  {isFound(cache.CacheID) ? (
                    <Text style={styles.foundBadge}>Found</Text>
                  ) : null}
                </View>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 15,
    fontWeight: "bold",
  },
  eventCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  eventCodeInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },
  clearButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  navButtonText: {
    color: "white",
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
  codeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  code: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  foundBadge: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#155724",
    backgroundColor: "#d4edda",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: "#555",
  },
});

export default CacheListScreen;
