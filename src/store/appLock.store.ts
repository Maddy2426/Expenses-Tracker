import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

const KEY_ENABLED = "biometric_enabled";
const KEY_ASKED = "biometric_asked";

type BiometricPrefState = {
  biometricEnabled: boolean;
  askedOnce: boolean;

  init: () => Promise<void>;
  markAsked: () => Promise<void>;
  enableBiometric: () => Promise<boolean>;
  disableBiometric: () => Promise<void>;
};

export const useBiometricPrefStore = create<BiometricPrefState>((set, get) => ({
  biometricEnabled: false,
  askedOnce: false,

  init: async () => {
    const enabled = (await AsyncStorage.getItem(KEY_ENABLED)) === "true";
    const asked = (await AsyncStorage.getItem(KEY_ASKED)) === "true";
    set({ biometricEnabled: enabled, askedOnce: asked });
  },

  markAsked: async () => {
    await AsyncStorage.setItem(KEY_ASKED, "true");
    set({ askedOnce: true });
  },

  enableBiometric: async () => {
    // don’t keep annoying user
    await get().markAsked();

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !enrolled) return false;

    // this triggers FaceID/Fingerprint prompt ONCE to enable
    const res = await LocalAuthentication.authenticateAsync({
      promptMessage: "Enable biometric unlock",
      cancelLabel: "Cancel",
      fallbackLabel: "Use passcode",
      disableDeviceFallback: false,
    });

    if (!res.success) return false;

    await AsyncStorage.setItem(KEY_ENABLED, "true");
    set({ biometricEnabled: true });
    return true;
  },

  disableBiometric: async () => {
    await AsyncStorage.setItem(KEY_ENABLED, "false");
    set({ biometricEnabled: false });
  },
}));
