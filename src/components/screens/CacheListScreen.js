import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Screen from "../layout/Screen";
import caches from "../data/caches";

const CacheListScreen = () => {
  const handlePress = (cache) => {
    Alert.alert("Cache Selected", `${cache.CacheCode} - ${cache.CacheName}`);
  };

  return (
    <Screen>
      <Text style={styles.title}>
        Cache List - View Your Discovered Treasures
      </Text>

      <ScrollView>
        {caches.map((cache) => (
          <Pressable
            key={cache.CacheID}
            style={styles.card}
            onPress={() => handlePress(cache)}
          >
            <Image source={{ uri: cache.CacheImage }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.code}>{cache.CacheCode}</Text>
              <Text style={styles.name}>{cache.CacheName}</Text>
              <Text style={styles.details}>{cache.CacheDescription}</Text>
              <Text style={styles.details}>Clue: {cache.CacheClue}</Text>
              <Text style={styles.details}>Points: {cache.CachePoints}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
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
  code: {
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 15,
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
  },
});

export default CacheListScreen;
