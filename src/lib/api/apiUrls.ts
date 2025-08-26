// lib/api/apiUrls.ts
// This file contains all API endpoints as constants or functions for easy management and reuse.
// Update base URL as per your environment (e.g., from env variables).

import { API_BASE_URL } from "@/constant/env.constant";

export const BASE_URL = API_BASE_URL || "https://api.example.com";

export const API_URLS = {
  // User-related endpoints
  users: {
    list: () => `${BASE_URL}/users`,
    getById: (id: string | number) => `${BASE_URL}/users/${id}`,
    create: () => `${BASE_URL}/users`,
    update: (id: string | number) => `${BASE_URL}/users/${id}`,
    delete: (id: string | number) => `${BASE_URL}/users/${id}`,
    profile: () => `${BASE_URL}/auth/me`,
    updateProfile: () => `${BASE_URL}/users/profile`,
  },

  // Add more endpoints as needed, e.g., auth, products, etc.
  auth: {
    login: () => `${BASE_URL}/auth/login`,
    logout: () => `${BASE_URL}/auth/logout`,
    register: () => `${BASE_URL}/auth/register`,
    refreshToken: () => `${BASE_URL}/auth/refresh`,
    resetPassword: () => `${BASE_URL}/auth/reset-password`,
  },

  // Example for products
  products: {
    list: () => `${BASE_URL}/products`,
    getById: (id: string | number) => `${BASE_URL}/products/${id}`,
  },
};
