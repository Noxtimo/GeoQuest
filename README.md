# GeoQuest 🗺️

**GeoQuest** is a mobile treasure hunt application built with React Native and Expo. Users can discover caches on an interactive map, join private events, and compete on a leaderboard. The app combines location-based gaming with social competition to create an engaging outdoor adventure experience.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (if developing)

### Installation

```bash
# Clone the repository
git clone https://github.com/Noxtimo/GeoQuest.git
cd GeoQuest

# Install dependencies
npm install

# Start the development server
npm start
# or 
expo start
```

### Running on Your Device

After running `npm start`, you'll see options to:
- **Android**: Press `a` in the terminal
- **iOS**: Press `i` in the terminal (macOS only)
- **Web**: Press `w` in the terminal

---

## ✨ Features

- 📍 **Geolocation-Based Map**: View nearby caches on an interactive map powered by React Native Maps
- 🎯 **Cache Discovery**: Browse all available caches with detailed information including clues, points, and images
- 🔐 **Private Event Filter**: Enter an event code to view exclusive caches available only for that event
- 👤 **User Authentication**: Create an account, sign up, and manage your user profile securely
- 🏆 **Leaderboard**: Compete with other players and track your ranking
- 🎨 **User-Friendly UI**: Clean interface with error handling and placeholder images for missing assets
- 💾 **Persistent Storage**: Your found caches are saved locally using AsyncStorage

---

## 🏗️ Technology Stack

- **Frontend**: React Native 0.81.5
- **Navigation**: React Navigation with Native Stack
- **Maps**: React Native Maps
- **Location**: Expo Location
- **Storage**: AsyncStorage
- **Authentication**: Custom Auth Context (React Context API)
- **Build Tool**: Expo

---

## 📁 Project Structure

```
GeoQuest/
├── App.js                          # Main app entry with auth navigation
├── index.js                        # App registration
├── package.json                    # Dependencies
├── src/
│   ├── config.js                   # API configuration
│   ├── context/
│   │   └── AuthContext.js          # Authentication state management
│   └── components/
│       ├── data/
│       │   └── caches.js           # Cache data utilities
│       ├── layout/
│       │   ├── Screen.js           # Common screen wrapper
│       │   └── TreasureChestPlaceholder.js  # Image fallback component
│       ├── screens/
│       │   ├── LoginScreen.js      # User login
│       │   ├── RegistrationScreen.js   # User registration
│       │   ├── MapScreen.js        # Map view with cache markers
│       │   ├── CacheListScreen.js  # Cache list with event filter
│       │   ├── CacheDetailScreen.js    # Individual cache details
│       │   ├── LeaderboardScreen.js    # User rankings
│       │   └── PermissionDeniedScreen.js   # Permission error handling
│       └── storage/
│           └── foundCacheStorage.js    # Local cache storage management
└── assets/                         # Images and static files
```

---

## 🔑 Key Features Explained

### 1. **User Authentication**
- Sign up with username, email, and password
- Login with email and password
- Secure token storage with AsyncStorage
- Auto-login on app restart

### 2. **Map View**
- Real-time GPS location tracking
- Interactive cache markers with details
- User-friendly location permission fallback screen
- Floating button navigation to cache list

### 3. **Cache Discovery**
- Browse all available caches
- Filter by event code for private events
- Mark caches as found and track discoveries locally
- Placeholder treasure chest image for missing cache images

### 4. **Leaderboard**
- View player rankings
- Track your personal score
- Real-time competition data

---

## 🔌 API Integration

The app connects to a backend API at:
```
http://mark0s.com/geoquest/v1/api
```

**Endpoints Used:**
- `GET /caches` - Fetch all caches
- `GET /caches/events/{id}` - Fetch caches for a specific event
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

---

## 📋 Agile Task Backlog

### ✅ Completed Tasks

1. **Task 1: User Registration & Authentication**
   - ✅ Create AuthContext for state management
   - ✅ Build LoginScreen with form validation
   - ✅ Build RegistrationScreen with account creation
   - ✅ Implement token persistence with AsyncStorage
   - ✅ Add conditional navigation based on auth state
   - 🔗 Branch: `feat/task-1-user-reg`

2. **Task 2: Private Event Filter (Option B)**
   - ✅ Add event code text input to CacheListScreen
   - ✅ Implement dynamic API fetching (/api/caches/events/{id})
   - ✅ Add "Clear" button for resetting filters
   - ✅ Fallback to all caches when no event code entered
   - 🔗 Branch: `feat/task-2-private-event-filter`

3. **Task 3: UI Polish & Error Handling**
   - ✅ Create PermissionDeniedScreen for location permission errors
   - ✅ Replace raw alerts with user-friendly fallback UI
   - ✅ Add step-by-step permission instructions
   - ✅ Create TreasureChestPlaceholder component for missing images
   - ✅ Update MapScreen to use permission error screen
   - ✅ Update CacheListScreen to use treasure chest placeholder
   - 🔗 Branch: `feat/task-3-ui-polish-error-handling`

4. **Task 4: Complete README.md Documentation**
   - ✅ Write comprehensive README with project description
   - ✅ Add setup and installation instructions
   - ✅ Document all features and tech stack
   - ✅ Include project structure diagram
   - ✅ Create Agile Task Backlog section
   - 🔗 Branch: `feat/task-4-readme-documentation`

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Build and run on Android emulator |
| `npm run ios` | Build and run on iOS simulator |
| `npm run web` | Run in web browser |

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes
3. Commit with descriptive messages: `git commit -m "feat: description"`
4. Push to the branch: `git push origin feat/your-feature`
5. Create a Pull Request

---

## 📄 License

This project is part of an educational assignment.

---

## 👨‍💼 Project Team

- **Developer**: MahamudW19
- **API Provider**: Graeme (mark0s.com)

---

## 📞 Support

For issues or questions, please create a GitHub issue: [GeoQuest Issues](https://github.com/Noxtimo/GeoQuest/issues)

---

**Last Updated**: March 27, 2026
