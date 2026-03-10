import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens
import MapScreen from './src/components/screens/MapScreen';
import CacheListScreen from './src/components/screens/CacheListScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  // Initialisations ---------------------
  
  // State -------------------------------
  
  // Handlers ----------------------------
  
  // View --------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Map"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;