// lib/api/axiosInstance.ts
// This file creates a centralized Axios instance with interceptors for request/response handling.
// Includes support for AbortController via signal and a 401 error handler.

import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { BASE_URL } from "./apiUrls";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL, // Dynamically set baseURL from apiUrls (adjust if needed)
  timeout: 10000, // 10 seconds timeout, adjustable
  headers: {
    "Content-Type": "application/json",
    // Add other default headers, e.g., 'Accept': 'application/json'
  },
});

// Request Interceptor: Add auth token if available (e.g., from localStorage or cookies)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Add Bearer token from localStorage (adapt for your auth system)
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 errors (e.g., redirect to login or refresh token)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Custom 401 handler: e.g., logout, redirect to login, or refresh token
      console.error("Unauthorized (401): Redirecting to login...");

      // Example: Attempt token refresh (implement your logic)
      // const refreshToken = localStorage.getItem('refreshToken');
      // if (refreshToken) {
      //   try {
      //     const refreshResponse = await axios.post(API_URLS.auth.refreshToken(), { refreshToken });
      //     localStorage.setItem('accessToken', refreshResponse.data.accessToken);
      //     // Retry original request
      //     return axiosInstance(error.config as InternalAxiosRequestConfig);
      //   } catch (refreshError) {
      //     // Refresh failed: Logout
      //     localStorage.removeItem('accessToken');
      //     localStorage.removeItem('refreshToken');
      //     if (typeof window !== 'undefined') {
      //       window.location.href = '/login'; // Redirect to login page
      //     }
      //   }
      // } else {
      //   // No refresh token: Direct logout
      //   localStorage.removeItem('accessToken');
      //   if (typeof window !== 'undefined') {
      //     window.location.href = '/login';
      //   }
      // }

      // For now, just reject with a message (customize as needed)
      return Promise.reject(new Error("Session expired. Please log in again."));
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
