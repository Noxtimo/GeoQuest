// src/config.js
export const API_BASE_URL = 'http://mark0s.com/geoquest/v1/api';
export const API_KEY = 'b4cko8'; // Graeme's private group key

// Helper function to build URLs easily
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}/${endpoint}?key=${API_KEY}`;
};
