'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { store } from '../store';
import { handleUnauthorized } from '../store/authSlice';

// Handler to call on 401 Unauthorized
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
  onUnauthorized = handler;
};

const axiosClient = axios.create({
  baseURL: 'https://schoolmanger.test/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
  },
  withCredentials: true,
  timeout: 120000, // Increased timeout to 120 seconds
});

// Add token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
axiosClient.interceptors.response.use(
  (response) => {
    console.log('response is ', response.data.token);
    // Check if the response contains a token and set it in cookies
    if (response.data?.token) {
      try {
        // Set token with a 1-day expiration
        Cookies.set('token', response.data.token, { expires: 1, secure: true, sameSite: 'strict' });
      } catch (error) {
        console.error('Error setting token cookie:', error);
      }
    }
    
    // Check for empty user data in responses to user-related endpoints
    if (response.config.url === '/user' && response.status === 200) {
      if (!response.data.user) {
        // console.warn('Received empty user data from /user endpoint with status 200');
        // We'll let the thunk handle this case, but log it for monitoring
      }
    }
    
    return response;
  },
  (error) => {
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED') {
      toast.error('Request timed out. Please try again.');
      return Promise.reject(error);
    }

    // Handle network errors (no response)
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const status = error.response.status;
    // console.log(`API error: ${status}`, error.response.data);

    switch (status) {
      case 401:
        // console.log('unauthorized, status code is ', status);

        // Handle unauthorized access (expired or invalid token)
        try {
          Cookies.remove('token');
          
          // Dispatch the handleUnauthorized action to update Redux state
          store.dispatch(handleUnauthorized());
          
          // Use the registered handler or redirect to login
          if (onUnauthorized) {
            onUnauthorized();
          } else {
            // Add a small delay to allow the toast to be seen
            setTimeout(() => {
              // window.location.href = '/auth/signin';
            }, 1000);
          }
        } catch (cookieError) {
          console.error('Error removing token cookie:', cookieError);
        }
        break;

      case 422:
        // Handle validation errors
        const validationErrors = error.response.data.errors;
        if (validationErrors) {
          const firstError = Object.values(validationErrors)[0];
          toast.error(Array.isArray(firstError) ? firstError[0] : String(firstError));
        } else {
          toast.error(error.response.data.error || error.response.data.message || 'Validation error occurred.');
        }
        break;

      default:
        // Handle other errors
        // if (error.response.data?.message || error.response.data?.error) {
        //   toast.error(error.response.data.message || error.response.data.error);
        // } else {
        //   toast.error('An error occurred. Please try again later.');
        // }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;