// import * as LocalAuthentication from "expo-local-authentication";

// export async function canUseBiometrics() {
//   const hasHardware = await LocalAuthentication.hasHardwareAsync();
//   const enrolled = await LocalAuthentication.isEnrolledAsync();
//   return hasHardware && enrolled;
// }

// export async function promptBiometric() {
//   const res = await LocalAuthentication.authenticateAsync({
//     promptMessage: "Confirm to enable biometric unlock",
//     cancelLabel: "Cancel",
//     fallbackLabel: "Use phone passcode",
//     disableDeviceFallback: false,
//   });
//   return res.success;
// }
