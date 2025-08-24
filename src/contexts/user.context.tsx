"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { apiPost, apiGet, apiPatch, cancelRequest } from "@/lib/api/apiUtilities";
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
  login: (data: { username: string; password: string }, successMessage?: string) => Promise<void>;
  logout: (successMessage?: string) => Promise<void>;
  resetPassword: (email: string, successMessage?: string) => Promise<void>;
  getUserProfile: (successMessage?: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>, successMessage?: string) => Promise<void>;
  cancelRequest: (requestId?: string) => void;
  clearMessages: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const login = useCallback(
    async (data: { username: string; password: string }, successMessage = "Login successful!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const { data: authResponse, requestId } = await apiPost<AuthResponse>(API_URLS.auth.login(), data, {
          requestId: "login",
        });
        setUser(authResponse.user);
        setIsAuthenticated(true);
        setSuccess(successMessage);
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", authResponse.accessToken);
          localStorage.setItem("refreshToken", authResponse.refreshToken);
        }
      } catch (err: any) {
        // console.error("Login Error:", err); // Debug log
        setError(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(
    async (successMessage = "Logged out successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        await apiPost<unknown>(API_URLS.auth.logout(), {}, { requestId: "logout" });
        setUser(null);
        setIsAuthenticated(false);
        setSuccess(successMessage);
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        }
        router.push("/login");
      } catch (err: any) {
        console.error("Logout Error:", err); // Debug log
        setError(err.message || "Logout failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const resetPassword = useCallback(async (email: string, successMessage = "Password reset email sent!") => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await apiPost<unknown>(API_URLS.auth.resetPassword(), { email }, { requestId: "reset-password" });
      setSuccess(successMessage);
    } catch (err: any) {
      console.error("Reset Password Error:", err); // Debug log
      setError(err.message || "Reset password failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserProfile = useCallback(
    async (successMessage = "Profile fetched successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const { data, requestId } = await apiGet<User>(API_URLS.users.profile(), { requestId: "get-profile" });
        setUser(data);
        setIsAuthenticated(true);
        setSuccess(successMessage);
      } catch (err: any) {
        console.error("getUserProfile Error:", err); // Debug log
        setError(err.message || "Failed to fetch user profile");
        if (err.status === 401 && typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsAuthenticated(false);
          setUser(null);
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const updateUserProfile = useCallback(
    async (data: Partial<User>, successMessage = "Profile updated successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const { data: updatedUser, requestId } = await apiPatch<User>(API_URLS.users.updateProfile(), data, {
          requestId: "update-profile",
        });
        setUser(updatedUser);
        setSuccess(successMessage);
      } catch (err: any) {
        console.error("Update Profile Error:", err); // Debug log
        setError(err.message || "Failed to update user profile");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if (accessToken) {
      getUserProfile().catch((err) => {
        console.error("Initial getUserProfile Error:", err); // Catch unhandled rejection
        if (err.status === 401) {
          setError("Session expired. Please log in again.");
          router.push("/login");
        }
      });
    }
    return () => {
      cancelRequest("get-profile");
    };
  }, [getUserProfile, router]);

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
        cancelRequest,
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
