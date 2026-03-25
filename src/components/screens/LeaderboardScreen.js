import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import Screen from '../layout/Screen';
import { getApiUrl } from '../../config'; // Using the config file we made earlier!

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndCalculateLeaderboard = async () => {
      try {
        // 1. Fetch all finds from the API
        const response = await fetch(getApiUrl('finds'));
        const finds = await response.json();

        // 2. Aggregate the points per Player
        const scores = {};

        finds.forEach((find) => {
          // The API returns nested objects based on Graeme's docs
          // We safely extract the Player ID, Name, and the Points for the cache they found
          const playerId = find.FindPlayerID;
          const playerName = find.FindPlayer?.PlayerUser?.UserFirstname || `Player ${playerId}`;
          const points = find.FindCache?.CachePoints || 0;

          if (!scores[playerId]) {
            scores[playerId] = {
              id: playerId,
              name: playerName,
              totalPoints: 0,
              cachesFound: 0,
            };
          }

          scores[playerId].totalPoints += points;
          scores[playerId].cachesFound += 1;
        });

        // 3. Convert to an array and sort by Total Points (Highest to Lowest)
        const sortedLeaderboard = Object.values(scores).sort((a, b) => b.totalPoints - a.totalPoints);
        
        setLeaderboardData(sortedLeaderboard);
      } catch (error) {
        console.error("Leaderboard Error:", error);
        Alert.alert("Error", "Could not load the leaderboard.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndCalculateLeaderboard();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.stats}>{item.cachesFound} Caches Found</Text>
      </View>
      <Text style={styles.points}>{item.totalPoints} pts</Text>
    </View>
  );

  return (
    <Screen>
      <Text style={styles.headerTitle}>Global Leaderboard</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={leaderboardData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={<Text style={styles.emptyText}>No finds yet. Be the first!</Text>}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  rank: { fontSize: 20, fontWeight: 'bold', color: '#007AFF', width: 40 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600' },
  stats: { fontSize: 12, color: '#666', marginTop: 4 },
  points: { fontSize: 20, fontWeight: 'bold', color: '#4CAF50' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }
});

export default LeaderboardScreen;