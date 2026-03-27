import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            user: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.payload.token,
            user: action.payload.user,
          };
        case 'SET_USER':
          return {
            ...prevState,
            user: action.payload,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      user: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userJson = await AsyncStorage.getItem('user');
        if (token) {
          dispatch({ type: 'RESTORE_TOKEN', payload: token });
          if (userJson) {
            dispatch({ type: 'SET_USER', payload: JSON.parse(userJson) });
          }
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
    sign_in: useCallback(async (email, password) => {
      try {
        const response = await fetch('http://mark0s.com/geoquest/v1/api/auth/login?key=b4cko8', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'SIGN_IN', payload: data.token });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }, []),

    sign_up: useCallback(async (username, email, password) => {
      try {
        const response = await fetch('http://mark0s.com/geoquest/v1/api/auth/register?key=b4cko8', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        dispatch({ type: 'SIGN_UP', payload: { token: data.token, user: data.user } });
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
