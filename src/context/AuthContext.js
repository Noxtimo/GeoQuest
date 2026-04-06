import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return { ...prevState, userToken: action.payload, isLoading: false };
        case 'SIGN_IN':
        case 'SIGN_UP':
          return { ...prevState, isSignout: false, userToken: action.payload.token, user: action.payload.user };
        case 'SIGN_OUT':
          return { ...prevState, isSignout: true, userToken: null, user: null };
        case 'SET_USER':
          return { ...prevState, user: action.payload };
      }
    },
    { isLoading: true, isSignout: false, userToken: null, user: null }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userJson = await AsyncStorage.getItem('user');
        if (token && userJson) {
          dispatch({ type: 'RESTORE_TOKEN', payload: token });
          dispatch({ type: 'SET_USER', payload: JSON.parse(userJson) });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', payload: null });
        }
      } catch (e) {
        dispatch({ type: 'RESTORE_TOKEN', payload: null });
      }
    };
    bootstrapAsync();
  }, []);

  const authContext = {
    // FIXED SIGN IN: GET users and match credentials
    sign_in: useCallback(async (username, password) => {
      try {
        const response = await fetch(getApiUrl('users'));
        const users = await response.json();

        // Find a user that matches the username and password
        const foundUser = users.find(
          (u) => u.UserUsername === username && u.UserPassword === password
        );

        if (!foundUser) {
          throw new Error('Invalid username or password');
        }

        // We use the UserID as the token for simplicity in this app
        const token = foundUser.UserID.toString();
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('user', JSON.stringify(foundUser));
        
        dispatch({ type: 'SIGN_IN', payload: { token, user: foundUser } });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, []),

    // FIXED SIGN UP: POST to /api/users
    // FIXED SIGN UP: POST to /api/users with full payload
    sign_up: useCallback(async (username, password) => {
      try {
        // We must provide all fields defined in the GeoQuest API documentation
        const newUser = {
          UserFirstname: "New",
          UserLastname: "Explorer",
          UserPhone: "000000000000",
          UserUsername: username,
          UserPassword: password,
          UserLatitude: 0,
          UserLongitude: 0,
          UserTimestamp: Date.now(),
          UserImageURL: "https://via.placeholder.com/150"
        };

        const response = await fetch(getApiUrl('users'), {
          method: 'POST',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(newUser),
        });

        if (!response.ok) {
          const serverErrorText = await response.text();
          console.error("Graeme's Server Error:", serverErrorText);
          throw new Error(`Server rejected registration. Check your terminal for details.`);
        }

        const createdUser = await response.json();
        // THIS IS FOR YOU: Let's see what the server is actually returning!
        console.log("Success! Server returned:", createdUser);

        // Let's safely try to find the ID, no matter how the server formatted it
        let newUserId = createdUser.UserID || createdUser.id || createdUser.insertId;

        // If it's an array (e.g., [{"UserID": 123}])
        if (!newUserId && Array.isArray(createdUser)) {
          newUserId = createdUser[0]?.UserID;
        }

        // If the server DID NOT return the user data/ID at all (just a success message)
        if (!newUserId) {
           // We return a special flag so the UI knows to send them to the Login screen
           return { 
             success: false, 
             error: "Registration successful! Please tap 'Sign In' to log into your new account." 
           };
        }

        const token = newUserId.toString();
        await AsyncStorage.setItem('userToken', token);
        // Save the correct user object format depending on if it's an array
        const userToSave = Array.isArray(createdUser) ? createdUser[0] : createdUser;
        await AsyncStorage.setItem('user', JSON.stringify(userToSave));
        dispatch({ type: 'SIGN_UP', payload: { token, user: userToSave } });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, []),

    sign_out: useCallback(async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
        dispatch({ type: 'SIGN_OUT' });
      } catch (error) {
        console.error('Sign out error:', error);
      }
    }, []),
  };

  return (
    <AuthContext.Provider value={{ state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};