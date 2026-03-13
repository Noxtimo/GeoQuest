## Directory Structure
```
.
./.expo
./.expo/devices.json
./app.json
./index.js
./babel.config.js
./.gitignore
./package.json
./assets
./assets/icon.png
./assets/android-icon-background.png
./assets/favicon.png
./assets/android-icon-foreground.png
./assets/android-icon-monochrome.png
./assets/splash-icon.png
./App.js
./src
./src/components
./src/components/layout
./src/components/layout/Screen.js
./src/components/screens
./src/components/screens/MapScreen.js
./src/components/screens/CacheListScreen.js
./src/components/data
./src/components/data/caches.js
./src/data
```

---
### File: ./.expo/devices.json
```
{
  "devices": []
}

```

---
### File: ./app.json
```
{
  "expo": {
    "name": "GeoQuest",
    "slug": "GeoQuest",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}

```

---
### File: ./index.js
```
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

```

---
### File: ./babel.config.js
```
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

---
### File: ./package.json
```
{
  "name": "geoquest",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-navigation/native": "^7.1.33",
    "@react-navigation/native-stack": "^7.14.4",
    "expo": "^54.0.33",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0"
  },
  "private": true,
  "devDependencies": {
    "babel-preset-expo": "~54.0.10"
  }
}

```

---
### File: ./App.js
```
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
```

---
### File: ./src/components/layout/Screen.js
```
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

const Screen = ({ children }) => {
  return (
    <View style={styles.screen}>
      {/* Sets the status bar text to light against the dark header  */}
      <StatusBar style="light" />
      {/* Renders the specific content for whatever screen is using this layout  */}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Screen;
```

---
### File: ./src/components/screens/MapScreen.js
```
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Screen from '../layout/Screen';

const MapScreen = () => {
  return (
    <Screen>
      <Text style={styles.text}>Map Screen - Discover Caches Here</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: { fontSize: 18, textAlign: 'center', marginTop: 20 },
});

export default MapScreen;
```

---
### File: ./src/components/screens/CacheListScreen.js
```
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

```

---
### File: ./src/components/data/caches.js
```
const caches = [
  {
    CacheID: 1,
    CacheName: 'Forest Trail Box',
    CacheType: 'Traditional',
    Difficulty: 2,
    Terrain: 2,
    Hint: 'Near the old oak log',
    CacheImage:
      'https://images.freeimages.com/images/small-previews/5e8/forest-path-1402249.jpg',
  },
  {
    CacheID: 2,
    CacheName: 'Hilltop Viewpoint',
    CacheType: 'Multi-Cache',
    Difficulty: 3,
    Terrain: 3,
    Hint: 'Look below the trig point',
    CacheImage:
      'https://images.freeimages.com/images/small-previews/5a4/the-way-1478468.jpg',
  },
  {
    CacheID: 3,
    CacheName: 'Riverside Stone',
    CacheType: 'Traditional',
    Difficulty: 1,
    Terrain: 1,
    Hint: 'Behind the largest flat rock',
    CacheImage:
      'https://images.freeimages.com/images/small-previews/f29/river-3-1398429.jpg',
  },
];

export default caches;

```

