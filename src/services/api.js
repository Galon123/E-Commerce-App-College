import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const BASE_URL = 'http://127.0.0.1:8000'

const api= axios.create({
    base_URL:{BASE_URL}
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2. The Loop-Proof Error Handler
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // IF error is 401 AND we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // 🛑 CRITICAL FIX: If the URL that failed was ALREADY '/refresh', stop!
      // This prevents the infinite loop.
      if (originalRequest.url.includes('/refresh')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Try to get a new token
        const userToken = await AsyncStorage.getItem('userToken'); // Or refresh token if you store it separately
        
        // Call your backend refresh endpoint
        // Adjust '/refresh' to match your actual backend route
        const response = await axios.post(`${BASE_URL}/refresh`, {}, {
           headers: { Authorization: `Bearer ${userToken}` }
        });

        const { access_token } = response.data;

        // Save new token
        await AsyncStorage.setItem('userToken', access_token);

        // Update the header and retry the original failed request
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        
        return api(originalRequest);

      } catch (refreshError) {
        // If refresh fails, we are truly logged out.
        console.log("Refresh failed - Session expired.");
        // We reject so the UI knows to show the Login Screen
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;