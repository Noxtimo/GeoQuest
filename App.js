import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';

// Import providers and context
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Import screens
import MapScreen from './src/components/screens/MapScreen';
import CacheListScreen from './src/components/screens/CacheListScreen';
import CacheDetailScreen from './src/components/screens/CacheDetailScreen';
import LeaderboardScreen from './src/components/screens/LeaderboardScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import RegistrationScreen from './src/components/screens/RegistrationScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#1e90ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'black' },
          headerTintColor: 'white',
        }}
      >
        {state.userToken == null ? (
          // Auth Stack
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Sign In',
                headerShown: false,
                animationEnabled: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{
                title: 'Create Account',
                animationEnabled: false,
              }}
            />
          </>
        ) : (
          // App Stack
          <>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
