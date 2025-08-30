export const COOKIE_KEYS = {
  AUTH_TOKEN: "auth_token",
  THEME: "theme",

  USER_INFO: "user_info",

  CART_INFO: "cart_info",
} as const;

export type CookieKeys = keyof typeof COOKIE_KEYS;
