import { decryptData, encryptData } from "../cookies";

// Client-side localStorage operations (for client components/pages)
export const localStorageUtils = {
  // Set a localStorage item (string, object, or array)
  set: (key: string, value: string | object | any[]) => {
    if (typeof window === "undefined") return;

    const encryptedValue = encryptData(value);
    window.localStorage.setItem(key, encryptedValue);
  },

  // Get a localStorage item (string, object, or array)
  get: <T = string | object | any[]>(key: string): T | undefined => {
    if (typeof window === "undefined") return undefined;

    const encryptedValue = window.localStorage.getItem(key);
    if (!encryptedValue) return undefined;

    return decryptData<T>(encryptedValue);
  },

  // Delete a localStorage item
  delete: (key: string) => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(key);
  },

  // Check if a localStorage item exists
  has: (key: string): boolean => {
    if (typeof window === "undefined") return false;

    return window.localStorage.getItem(key) !== null;
  },
};
