import { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

export interface ApiResponse<T> {
  data: T | null;
  error?: ApiError;
}

// Generic API request function
const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    let response: AxiosResponse<T>;
    switch (method) {
      case "get":
        response = await axiosInstance.get<T>(url, config);
        break;
      case "post":
        response = await axiosInstance.post<T>(url, data, config);
        break;
      case "put":
        response = await axiosInstance.put<T>(url, data, config);
        break;
      case "delete":
        response = await axiosInstance.delete<T>(url, config);
        break;
      case "patch":
        response = await axiosInstance.patch<T>(url, data, config);
        break;
      default:
        return {
          data: null,
          error: { message: "Unsupported method" },
        };
    }
    return { data: response.data, error: undefined };
  } catch (error: any) {
    console.error(`${method.toUpperCase()} Error:`, error);
    return {
      data: null,
      error: {
        message: error.response?.data?.message || error.message || "An error occurred",
        status: error.response?.status,
        data: error.response?.data,
      },
    };
  }
};

// Reusable API functions
export const apiGet = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  return apiRequest<T>("get", url, undefined, config);
};

export const apiPost = async <T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  return apiRequest<T>("post", url, data, config);
};

export const apiPut = async <T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  return apiRequest<T>("put", url, data, config);
};

export const apiDelete = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  return apiRequest<T>("delete", url, undefined, config);
};

export const apiPatch = async <T>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<ApiResponse<T>> => {
  return apiRequest<T>("patch", url, data, config);
};
