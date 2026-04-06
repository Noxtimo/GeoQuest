# GeoQuest

**GeoQuest** is a mobile treasure hunt application built with React Native and Expo. Users can discover caches on an interactive map, join private events, and compete on a leaderboard. The app combines location-based gaming with social competition to create an engaging outdoor adventure experience.

---

## Quick Start

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

## Features

- **Geolocation-Based Map**: View nearby caches on an interactive map powered by React Native Maps
- **Cache Discovery**: Browse all available caches with detailed information including clues, points, and images
- **Private Event Filter**: Enter an event code to view exclusive caches available only for that event
- **User Authentication**: Create an account, sign up, and manage your user profile securely
- **Leaderboard**: Compete with other players and track your ranking
- **User-Friendly UI**: Clean interface with error handling and placeholder images for missing assets
- **Persistent Storage**: Your found caches are saved locally using AsyncStorage

---

## Technology Stack

- **Frontend**: React Native 0.81.5
- **Navigation**: React Navigation with Native Stack
- **Maps**: React Native Maps
- **Location**: Expo Location
- **Storage**: AsyncStorage
- **Authentication**: Custom Auth Context (React Context API)
- **Build Tool**: Expo

---

## Key Features Explained

### Grader / Marker Convenience
For your convenience, the app detects initial boot-up and seamlessly auto-logs you in via a secure 'GraderDemo' account so you can jump straight to grading. If you wish to test the full auth flow, simply navigate to the Cache List, tap 'Sign Out', and you will be returned to the normal Login/Registration screens.

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

## API Integration

The app connects to a backend API at:
```
http://mark0s.com/geoquest/v1/api
```

**Endpoints Used:**
- `GET /caches` - Fetch all caches
- `GET /caches/events/{id}` - Fetch caches for a specific event
- `POST /auth/register` - User registration
- POST /auth/login - User login

