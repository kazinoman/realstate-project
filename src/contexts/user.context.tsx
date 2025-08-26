"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { apiPost, apiGet, apiPatch } from "@/lib/api/apiUtilities";
import { API_URLS } from "@/lib/api/apiUrls";
import { LoginSchema } from "@/lib/validation/loginForm.validation";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
  login: (data: LoginSchema, successMessage?: string) => Promise<void>;
  logout: (successMessage?: string) => Promise<void>;
  resetPassword: (email: string, successMessage?: string) => Promise<void>;
  getUserProfile: (successMessage?: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>, successMessage?: string) => Promise<void>;
  clearMessages: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  // Clear success and error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Clear messages manually
  const clearMessages = useCallback(() => {
    setSuccess(null);
    setError(null);
  }, []);

  const login = useCallback(async (data: LoginSchema, successMessage = "Login successful!") => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const response = await apiPost<AuthResponse>(API_URLS.auth.login(), data);
    if (response.error) {
      setError(response.error.message || "Login failed");
      setLoading(false);
      return;
    } else {
      setUser(response.data!.user);
      setIsAuthenticated(true);
      setSuccess(successMessage);
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data!.accessToken);
        localStorage.setItem("refreshToken", response.data!.refreshToken);
      }
      setLoading(false);
    }
  }, []);

  const logout = useCallback(
    async (successMessage = "Logged out successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await apiPost<unknown>(API_URLS.auth.logout(), {});
      if (response.error) {
        setError(response.error.message || "Logout failed");
        setLoading(false);
        return;
      }
      setUser(null);
      setIsAuthenticated(false);
      setSuccess(successMessage);
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
      router.push("/login");
      setLoading(false);
    },
    [router]
  );

  const resetPassword = useCallback(async (email: string, successMessage = "Password reset email sent!") => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const response = await apiPost<unknown>(API_URLS.auth.resetPassword(), { email });
    if (response.error) {
      setError(response.error.message || "Reset password failed");
      setLoading(false);
      return;
    }
    setSuccess(successMessage);
    setLoading(false);
  }, []);

  const getUserProfile = useCallback(
    async (successMessage = "Profile fetched successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await apiGet<User>(API_URLS.users.profile());
      if (response.error) {
        if (response.error.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
          setUser(null);
          router.push("/login");
          setError("Session expired. Please log in again.");
        } else {
          setError(response.error.message || "Failed to fetch user profile");
        }
        setLoading(false);
        return;
      }
      setUser(response.data!);
      setIsAuthenticated(true);
      setSuccess(successMessage);
      setLoading(false);
    },
    [router]
  );

  const updateUserProfile = useCallback(
    async (data: Partial<User>, successMessage = "Profile updated successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await apiPatch<User>(API_URLS.users.updateProfile(), data);
      if (response.error) {
        setError(response.error.message || "Failed to update user profile");
        setLoading(false);
        return;
      }
      setUser(response.data!);
      setSuccess(successMessage);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (accessToken) {
      getUserProfile();
    }
  }, [getUserProfile]);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        success,
        login,
        logout,
        resetPassword,
        getUserProfile,
        updateUserProfile,
        clearMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
