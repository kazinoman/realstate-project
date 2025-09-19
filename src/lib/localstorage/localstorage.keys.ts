export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",

  THEME: "theme",
  SESSION_ID: "session_id",

  USER_PREFS: "user_prefs",
  RECENT_ITEMS: "recent_items",

  STORE_EMAIL: "email",
} as const;

export type LocalStorageKeys = keyof typeof STORAGE_KEYS;
