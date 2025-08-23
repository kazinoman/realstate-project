import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

// Map to store AbortControllers for active requests, keyed by requestId (e.g., URL or custom ID)
const abortControllers = new Map<string, AbortController>();

// Utility to cancel a specific request or all requests
export const cancelRequest = (requestId?: string): void => {
  if (requestId) {
    // Cancel a specific request
    const controller = abortControllers.get(requestId);
    if (controller) {
      controller.abort();
      abortControllers.delete(requestId);
    }
  } else {
    // Cancel all active requests
    abortControllers.forEach((controller, id) => {
      controller.abort();
      abortControllers.delete(id);
    });
  }
};

// Generic API function wrapper with internal AbortController
const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  const requestId = config.requestId || url; // Use provided requestId or fallback to URL
  const abortController = new AbortController();

  // Store AbortController for cancellation
  abortControllers.set(requestId, abortController);

  try {
    let response: AxiosResponse<T>;
    switch (method) {
      case "get":
        response = await axiosInstance.get<T>(url, { ...config, signal: abortController.signal });
        break;
      case "post":
        response = await axiosInstance.post<T>(url, data, { ...config, signal: abortController.signal });
        break;
      case "put":
        response = await axiosInstance.put<T>(url, data, { ...config, signal: abortController.signal });
        break;
      case "delete":
        response = await axiosInstance.delete<T>(url, { ...config, signal: abortController.signal });
        break;
      case "patch":
        response = await axiosInstance.patch<T>(url, data, { ...config, signal: abortController.signal });
        break;
      default:
        throw new Error("Unsupported method");
    }
    // Clean up after successful request
    abortControllers.delete(requestId);
    return { data: response.data, abortController, requestId };
  } catch (error: any) {
    // Clean up on error
    abortControllers.delete(requestId);
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || "An error occurred",
      status: error.response?.status,
      data: error.response?.data,
    };
    throw apiError;
  }
};

// Reusable functions with internal AbortController
export const apiGet = async <T>(
  url: string,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  return apiRequest<T>("get", url, undefined, config);
};

export const apiPost = async <T>(
  url: string,
  data: any,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  return apiRequest<T>("post", url, data, config);
};

export const apiPut = async <T>(
  url: string,
  data: any,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  return apiRequest<T>("put", url, data, config);
};

export const apiDelete = async <T>(
  url: string,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  return apiRequest<T>("delete", url, undefined, config);
};

export const apiPatch = async <T>(
  url: string,
  data: any,
  config: Omit<AxiosRequestConfig, "signal"> & { requestId?: string } = {}
): Promise<{ data: T; abortController: AbortController; requestId: string }> => {
  return apiRequest<T>("patch", url, data, config);
};
