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
  const expoPushToken = (
    await Notifications.getExpoPushTokenAsync({
      projectId: "b22b1d80-c70f-4aba-be2e-e1bd70f51311",
    })
  ).data;

  console.log("✅ ExpoPushToken:", expoPushToken);
  return { expoPushToken };
}
