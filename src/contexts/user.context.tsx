"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { apiPost, apiGet, apiPut } from "@/lib/api/apiUtilities";
import { LoginSchema } from "@/lib/validation/loginForm.validation";
import { API_URLS } from "@/lib/api/apiUrls";
import {
  LoginResponse,
  UserProfileResponse,
  User,
  UserRegistrationResponse,
  ChangePasswordResponse,
} from "@/types/apiResponse.type";
import { STORAGE_KEYS } from "@/lib/localstorage/localstorage.keys";
import { SignUpSchema } from "@/lib/validation/registerForm.validation";
import { localStorageUtils } from "@/lib/localstorage";
import { clientCookies } from "@/lib/cookies";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
  login: (data: LoginSchema, successMessage?: string) => Promise<void>;
  register: (data: SignUpSchema, successMessage?: string) => Promise<void>;
  logout: (successMessage?: string) => Promise<void>;
  getUserProfile: (successMessage?: string) => Promise<void>;
  updateUserProfile: (data: Partial<User>, successMessage?: string) => Promise<void>;
  clearMessages: () => void;
  changePassword: (data: { currentPassword: string; newPassword: string }, successMessage?: string) => Promise<void>;
  sendOtpInEmail: (data: { email: string }, successMessage?: string) => any;
  resetPassword: (data: { email: string; code: string; newPassword: string }, successMessage?: string) => any;
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

        // setIsAuthenticated(true);
        setSuccess(successMessage);
        toast.success(successMessage);
        getUserProfile();

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

  async function getUserProfile(successMessage = "Profile fetched successfully!") {
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

          setError("Session expired. Please log in again.");
          toast.error("Session expired. Please log in again.");
        } else {
          const errorMessage = response.error.message || "Failed to fetch user profile";
          setError(errorMessage);
          toast.error(errorMessage);
        }
        return;
      }

      // Currently api response is not consistent, thats why this check.
      if (response?.data?.success) {
        console.log({ response });
        setUser(response.data!.data!);
        setIsAuthenticated(true);
        setSuccess(successMessage);
        toast.success(successMessage);
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function updateUserProfile(data: Partial<User>, successMessage = "Profile updated successfully!") {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiPut<UserProfileResponse["data"]>(API_URLS.users.updateProfile(), data);
      if (response.error) {
        const errorMessage = response.error.message || "Failed to update user profile";
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }

      setUser(response.data!.data!);
      setSuccess(successMessage);
      toast.success(successMessage);
    } catch (err) {
      console.log({ err });

      const errorMessage = "An unexpected error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const changePassword = useCallback(
    async (
      data: { currentPassword: string; newPassword: string },
      successMessage = "Password changed successfully!"
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await apiPost<any>(API_URLS.auth.changePassword(), data);

        if (response?.data?.error) {
          const errorMessage = response?.data?.error?.message || "Change password failed";
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (response?.data?.success) {
          setSuccess(successMessage);
          toast.success(successMessage);
        }
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage || "Change password failed");
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const sendOtpInEmail = useCallback(async (data: { email: string }, successMessage = "Email send successfully!") => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await apiPost<any>(API_URLS.auth.sendOtpInEmail(), data);

      console.log({ response });

      if (response?.data?.error) {
        const errorMessage = response?.data?.error?.message || "Send mail failed";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
        return;
      }

      if (response?.data?.success) {
        setSuccess(successMessage);
        toast.success(successMessage);
        return response;
      }
    } catch (err) {
      const errorMessage = "An unexpected error occurred";
      setError(errorMessage || "Send mail failed");
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(
    async (
      data: {
        email: string;
        code: string;
        newPassword: string;
      },
      successMessage = "Password has been reset successfully."
    ) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await apiPost<any>(API_URLS.auth.resetPassword(), data);

        if (response?.data?.error) {
          const errorMessage = response?.data?.error?.message || "Password reset failed.";
          setError(errorMessage);
          toast.error(errorMessage);
          setLoading(false);
          return;
        }

        if (response?.data?.success) {
          setSuccess(successMessage);
          toast.success(successMessage);
          localStorageUtils.delete(STORAGE_KEYS.STORE_EMAIL);

          return response;
        }
      } catch (err) {
        const errorMessage = "An unexpected error occurred";
        setError(errorMessage || "Password reset failed");
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Check if user is authenticated
  useEffect(() => {
    const accessToken = localStorageUtils.get<string>(STORAGE_KEYS.ACCESS_TOKEN);

    if (accessToken) {
      // setIsAuthenticated(true); // need to remove later.
      getUserProfile();
    }
  }, []);

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

        getUserProfile,
        updateUserProfile,
        clearMessages,
        changePassword,
        sendOtpInEmail,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
