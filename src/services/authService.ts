import axios from 'axios';
import { API_ENDPOINTS } from '../lib/authContants';

const API_BASE_URL = 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include if using cookies for auth
});

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post(API_ENDPOINTS.LOGIN, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login error details:', {
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
    }
    throw error;
  }
};

// Other service functions with similar error handling
export const signUp = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await api.post(API_ENDPOINTS.SIGNUP, data);
    
    // Handle successful registration
    if (response.status === 201) {
      // Store email for verification page if needed
      localStorage.setItem('emailForVerification', data.email);
      // Redirect to verification page
      window.location.href = '/verify-email';
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific error cases
      if (error.response?.status === 409) {
        throw new Error('User already exists');
      }
      if (error.response?.status === 400) {
        throw new Error('All fields are required');
      }
    }
    handleApiError(error, 'Signup failed');
    throw error;
  }
};

// Utility function for error handling
function handleApiError(error: unknown, defaultMessage: string) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || defaultMessage;
    console.error(`${message}:`, error.response?.data);
    throw new Error(message);
  }
  console.error(defaultMessage, error);
  throw new Error(defaultMessage);
}