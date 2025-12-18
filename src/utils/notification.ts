import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync(): Promise<{
  expoPushToken: string | null;
}> {
  if (!Device.isDevice) {
    // console.log("Push notifications require a physical device.");
    return { expoPushToken: null };
  }

  // iOS permission
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    console.warn("Notification permission not granted.");
    return { expoPushToken: null };
  }

  // Android: set a channel (heads-up banners)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  // IMPORTANT: projectId must match your EAS project (you already have it in app.json -> extra.eas.projectId)
  let expoPushToken: string | null = null;
  try {
    const tokenResult = await Notifications.getExpoPushTokenAsync({
      projectId: "b22b1d80-c70f-4aba-be2e-e1bd70f51311",
    });
    expoPushToken = tokenResult.data;
    console.log("✅ ExpoPushToken:", expoPushToken);
  } catch (error: any) {
    // Handle transient errors (like 503) gracefully
    // Local notifications don't require push token, so this is not critical
    if (error?.code === "SERVICE_UNAVAILABLE" || error?.isTransient) {
      console.warn(
        "⚠️ Expo push token service temporarily unavailable. Local notifications will still work."
      );
    } else {
      console.warn(
        "⚠️ Failed to get Expo push token:",
        error?.message || error
      );
    }
  }

  return { expoPushToken };
}
