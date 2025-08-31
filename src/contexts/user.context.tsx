"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { apiPost, apiGet, apiPatch } from "@/lib/api/apiUtilities";
import { API_URLS } from "@/lib/api/apiUrls";
import { LoginSchema } from "@/lib/validation/loginForm.validation";

import { useRouter } from "next/navigation";
import { LoginResponse, UserProfileResponse, User, UserRegistrationResponse } from "@/types/apiResponse.type";
import { STORAGE_KEYS } from "@/lib/localstorage/localstorage.keys";
import { localStorageUtils } from "@/lib/localstorage";
import { toast } from "sonner";
import { clientCookies } from "@/lib/cookies";
import { SignUpSchema } from "@/lib/validation/registerForm.validation";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
  login: (data: LoginSchema, successMessage?: string) => Promise<void>;
  register: (data: SignUpSchema, successMessage?: string) => Promise<void>;
  logout: (successMessage?: string) => Promise<void>;
  resetPassword: (email: string, successMessage?: string) => Promise<void>;
  getUserProfile: (successMessage?: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>, successMessage?: string) => Promise<void>;
  clearMessages: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const login = useCallback(
    async (data: LoginSchema, successMessage = "Login successful!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await apiPost<LoginResponse["data"]>(API_URLS.auth.login(), data);

        if (!response.data?.success || !response.data?.data) {
          const errorMessage = response?.data?.error?.message || "Login failed";

          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        const { accessToken, refreshToken } = response.data.data;

        // Save tokens and user
        localStorageUtils.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        localStorageUtils.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

        clientCookies.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
        clientCookies.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

        setIsAuthenticated(true);
        setSuccess(successMessage);
        toast.success(successMessage);

        // Redirect to dashboard or home
        // router.push("/dashboard");
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: SignUpSchema, successMessage = "Registration successful!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await apiPost<UserRegistrationResponse["data"]>(API_URLS.auth.register(), data);

        if (!response.data?.success || !response.data?.data) {
          const errorMessage = response?.data?.error?.message || "Login failed";

          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        setSuccess(response.data.message || successMessage);
        toast.success(response.data.message || successMessage);
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(
    async (successMessage = "Logged out successfully!") => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await apiPost<unknown>(API_URLS.auth.logout(), {});
        if (response.error) {
          const errorMessage = response.error.message || "Logout failed";
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        setUser(null);
        setIsAuthenticated(false);
        setSuccess(successMessage);
        toast.success(successMessage);
        localStorageUtils.delete(STORAGE_KEYS.ACCESS_TOKEN);
        localStorageUtils.delete(STORAGE_KEYS.REFRESH_TOKEN);
        router.push("/login");
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
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
      const response = await apiPost<unknown>(API_URLS.auth.resetPassword(), { email });
      if (response.error) {
        const errorMessage = response.error.message || "Reset password failed";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return;
      }
      setSuccess(successMessage);
      toast.success(successMessage);
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
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
        const response = await apiGet<UserProfileResponse["data"]>(API_URLS.users.profile());
        if (response.error) {
          if (response.error.status === 401) {
            localStorageUtils.delete(STORAGE_KEYS.ACCESS_TOKEN);
            localStorageUtils.delete(STORAGE_KEYS.REFRESH_TOKEN);
            setIsAuthenticated(false);
            setUser(null);
            router.push("/");
            setError("Session expired. Please log in again.");
            toast.error("Session expired. Please log in again.");
          } else {
            const errorMessage = response.error.message || "Failed to fetch user profile";
            setError(errorMessage);
            toast.error(errorMessage);
          }
          setLoading(false);
          return;
        }
        setUser(response.data!.data!);
        setIsAuthenticated(true);
        setSuccess(successMessage);
        toast.success(successMessage);
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
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
        const response = await apiPatch<UserProfileResponse["data"]>(API_URLS.users.updateProfile(), data);
        if (response.error) {
          const errorMessage = response.error.message || "Failed to update user profile";
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }
        setUser(response.data!.data!);
        setSuccess(successMessage);
        toast.success(successMessage);
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const accessToken = localStorageUtils.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
    console.log("accessToken", accessToken);

    if (accessToken) {
      setIsAuthenticated(true);
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
        register,
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
