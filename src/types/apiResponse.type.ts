// Generic API Error structure
export interface ApiError {
  code: number;
  message: string;
  status: string;
  timestamp?: string;
}

// Base API Response wrapper
export interface ApiResponse<T> {
  data: {
    success: boolean;
    data: T | null;
    message?: string | null;
    error?: ApiError | null;
    timestamp?: string;
  };
}

// Login response data
export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
}

// User profile response data
export interface User {
  id: number;
  name: string;
  email: string;
}

// Typed responses
export type LoginResponse = ApiResponse<LoginResponseData>;
export type UserProfileResponse = ApiResponse<User>;
