import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import * as LocalAuthentication from "expo-local-authentication";

const KEY_USER = "local_user";

type StoredUser = {
  email: string;
  passwordHash: string;
};

async function hash(text: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, text);
}

type LocalAuthState = {
  userEmail: string | null;
  isLoggedIn: boolean;

  signupLocal: (args: { email: string; password: string }) => Promise<void>;
  loginLocal: (args: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;

  resetPasswordLocal: (args: { newPassword: string }) => Promise<boolean>;

  // ✅ this is what makes FaceID actually “log you in”
  biometricLogin: () => Promise<boolean>;

  // optional helper: check if a local account exists
  hasLocalAccount: () => Promise<boolean>;
};

export const useLocalAuthStore = create<LocalAuthState>((set) => ({
  userEmail: null,
  isLoggedIn: false,

  signupLocal: async ({ email, password }) => {
    const stored: StoredUser = {
      email: email.trim().toLowerCase(),
      passwordHash: await hash(password),
    };

    await AsyncStorage.setItem(KEY_USER, JSON.stringify(stored));
    set({ userEmail: stored.email, isLoggedIn: true });
  },

  loginLocal: async ({ email, password }) => {
    const raw = await AsyncStorage.getItem(KEY_USER);
    if (!raw) return false;

    const stored: StoredUser = JSON.parse(raw);
    if (stored.email !== email.trim().toLowerCase()) return false;

    const ok = (await hash(password)) === stored.passwordHash;
    if (ok) set({ userEmail: stored.email, isLoggedIn: true });

    return ok;
  },

  logout: async () => {
    set({ userEmail: null, isLoggedIn: false });
  },

  resetPasswordLocal: async ({ newPassword }) => {
    const raw = await AsyncStorage.getItem(KEY_USER);
    if (!raw) return false;

    const stored: StoredUser = JSON.parse(raw);

    const updated: StoredUser = {
      ...stored,
      passwordHash: await hash(newPassword),
    };

    await AsyncStorage.setItem(KEY_USER, JSON.stringify(updated));
    return true;
  },

  biometricLogin: async () => {
    // 1) Must have local account saved
    const raw = await AsyncStorage.getItem(KEY_USER);
    if (!raw) return false;

    const stored: StoredUser = JSON.parse(raw);

    // 2) Device must support + user must have enrolled FaceID/Fingerprint
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !enrolled) return false;

    // 3) Show biometric prompt
    const res = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock with biometrics",
      cancelLabel: "Cancel",
      fallbackLabel: "Use passcode",
      disableDeviceFallback: false,
    });

    if (!res.success) return false;

    // 4) SUCCESS => mark logged in (this is the key)
    set({ userEmail: stored.email, isLoggedIn: true });
    return true;
  },

  hasLocalAccount: async () => {
    const raw = await AsyncStorage.getItem(KEY_USER);
    return !!raw;
  },
}));
