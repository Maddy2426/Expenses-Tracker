import { registerForPushNotificationsAsync } from "@/src/utils/notification"; // adjust path if needed
import * as Notifications from "expo-notifications";

export async function scheduleAfterSeconds() {
  console.log("scheduleAfterSeconds");

  // ✅ ensures permission is granted (your existing function)
  await registerForPushNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello 👋",
      body: "Scheduled notification (after 5 seconds)",
      data: { route: "/(tabs)/profile" }, // optional deep-link
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
}

export async function scheduleDaily(hour = 17, minute = 35) {
  await registerForPushNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Reminder",
      body: "Open the app",
      data: { route: "/(tabs)" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: hour,
      minute: minute,
    },
  });
}
