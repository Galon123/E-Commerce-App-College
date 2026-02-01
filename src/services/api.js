import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Ensure this IP is correct (use your 'wlan0' IP from 'ip addr show')
export const BASE_URL = 'http://192.168.220.21:8000'; 

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// 1. Request Interceptor: Attach Token
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

// 2. Response Interceptor: Handle 401s
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // IF error is 401 Unauthorized
    if (error.response?.status === 401) {
      
      // 🛑 STOPPER 1: If we already tried to fix this request, don't try again.
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // 🛑 STOPPER 2: If the URL that failed WAS the refresh endpoint, 
      // it means our Refresh Token is expired too. STOP.
      // Adjust '/refresh' to match your actual backend URL exactly
      if (originalRequest.url.includes('refresh')) {
        // Optional: Trigger global logout here
        await AsyncStorage.clear(); 
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        console.log("Token expired. Attempting refresh...");
        const userToken = await AsyncStorage.getItem('userToken');
        
        // Call backend to get new token
        // Note: We create a NEW axios instance for this call to avoid circular loops
        const response = await axios.post("/refresh", {}, {
           headers: { Authorization: `Bearer ${userToken}` }
        });

        const { access_token } = response.data;
        
        if (!access_token) throw new Error("No token returned");

        // Save new token
        await AsyncStorage.setItem('userToken', access_token);

        // Update default headers for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
        
        // Update the failed request's headers and retry it
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.log("Refresh failed - Session completely expired.");
        
        // 🛑 FINAL FAILSAFE: Clear everything so the user is forced to Login
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userInfo');
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;