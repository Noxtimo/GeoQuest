import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import MapScreen from './src/components/screens/MapScreen';
import CacheListScreen from './src/components/screens/CacheListScreen';
import CacheDetailScreen from './src/components/screens/CacheDetailScreen';
import LeaderboardScreen from './src/components/screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // Initialisations ---------------------

  // State -------------------------------

  // Handlers ----------------------------

  // View --------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CacheList" // Temporarily set to List for easier testing!
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ title: 'GeoQuest Map' }}
        />
        <Stack.Screen
          name="CacheList"
          component={CacheListScreen}
          options={{ title: 'My Caches' }}
        />
        <Stack.Screen
          name="CacheDetail"
          component={CacheDetailScreen}
          options={{ title: 'Cache Details' }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{ title: 'Leaderboard' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
