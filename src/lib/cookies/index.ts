import { getCookie, setCookie, deleteCookie, hasCookie } from "cookies-next/server"; // Server-side
import {
  getCookie as getClientCookie,
  setCookie as setClientCookie,
  deleteCookie as deleteClientCookie,
  hasCookie as hasClientCookie,
} from "cookies-next"; // Client-side
import { randomBytes, createCipheriv, createDecipheriv } from "crypto";
import { COOKIE_ENCRYPTION_KEY, NODE_ENV } from "@/constant/env.constant";

// Encryption key (must be 32 bytes for AES-256, set in .env)
const ENCRYPTION_KEY = Buffer.from(COOKIE_ENCRYPTION_KEY as string, "hex");
const ALGORITHM = "aes-256-gcm";

// Encrypts data (string, object, or array) into a secure string
export function encryptData(data: string | object | any[]): string {
  const stringifiedData = typeof data === "string" ? data : JSON.stringify(data);
  const iv = randomBytes(12); // Random initialization vector
  const cipher = createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(stringifiedData, "utf8", "base64");
  encrypted += cipher.final("base64");

  const authTag = cipher.getAuthTag();
  return Buffer.concat([Buffer.from("v1"), iv, authTag, Buffer.from(encrypted, "base64")]).toString("base64");
}

// Decrypts data and returns string, object, or array
export function decryptData<T = string | object | any[]>(encryptedData: string): T | undefined {
  try {
    const buffer = Buffer.from(encryptedData, "base64");
    const prefix = buffer.subarray(0, 2); // Check version
    if (prefix.toString() !== "v1") throw new Error("Invalid encryption format");

    const iv = buffer.subarray(2, 14); // 12 bytes for IV
    const authTag = buffer.subarray(14, 30); // 16 bytes for auth tag
    const ciphertext = buffer.subarray(30);

    const decipher = createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, undefined, "utf8");
    decrypted += decipher.final("utf8");

    try {
      return JSON.parse(decrypted) as T;
    } catch {
      return decrypted as T;
    }
  } catch (error) {
    console.error("Decryption failed:", error);
    return undefined;
  }
}

// Client-side cookie operations (for client components/pages)
export const clientCookies = {
  // Set a cookie (string, object, or array)
  set: (
    name: string,
    value: string | object | any[],
    options: {
      expires?: Date | number;
      path?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    } = {}
  ) => {
    if (typeof window === "undefined") return;

    const encryptedValue = encryptData(value);
    // Convert number to Date if necessary
    const expires = typeof options.expires === "number" ? new Date(options.expires) : options.expires;
    setClientCookie(name, encryptedValue, {
      expires,
      path: options.path ?? "/",
      secure: options.secure ?? process.env.NODE_ENV === "production",
      sameSite: options.sameSite ?? "lax",
    });
  },

  // Get a cookie (string, object, or array)
  get: <T = string | object | any[]>(name: string): T | undefined => {
    if (typeof window === "undefined") return undefined;

    const encryptedValue = getClientCookie(name, { secure: process.env.NODE_ENV === "production" });
    if (!encryptedValue) return undefined;

    return decryptData<T>(encryptedValue as string);
  },

  // Delete a cookie
  delete: (name: string, options: { path?: string } = {}) => {
    if (typeof window === "undefined") return;

    deleteClientCookie(name, {
      path: options.path ?? "/",
      secure: process.env.NODE_ENV === "production",
    });
  },

  // Check if a cookie exists
  has: (name: string): any => {
    if (typeof window === "undefined") return false;

    return hasClientCookie(name, { secure: process.env.NODE_ENV === "production" });
  },
};

// Default secure cookie settings
export const secureCookieOptions = {
  secure: NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  httpOnly: true,
};

// Usage in server:
// const data = await serverCookies.get("myCookie");
// await serverCookies.set("myCookie", { name: "John", age: 30 });
// await serverCookies.delete("myCookie");
// const hasCookie = await serverCookies.has("myCookie");

// await serverCookies.set(COOKIE_KEYS.USER_PREFS, prefs, {
//   ...secureCookieOptions,
//   expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
//   httpOnly: false, // Allow client-side access if needed
// });

// usage in client:
// const data = await clientCookies.get("myCookie");
// clientCookies.set("myCookie", { name: "John", age: 30 });
// clientCookies.delete("myCookie");
// const hasCookie = clientCookies.has("myCookie");

// const handleSave = () => {
//   clientCookies.set(COOKIE_KEYS.USER_PREFS, prefs, {
//     ...secureCookieOptions,
//     expires: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
//     httpOnly: false, // Allow client-side access
//   });

// };
