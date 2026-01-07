import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import GradientScreenBackground from "@/src/components/General-Components/GradingComponent";
import { useColorScheme } from "@/src/hooks/use-color-scheme";
import RootStack from "@/src/navigation/RootStack";
import { useEffect, useRef, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/src/utils/notification";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      name: "Default",
      importance: Notifications.AndroidImportance.HIGH,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
      enableVibrate: true,
      vibrationPattern: [0, 250, 250, 250],
    }),
  });

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        // Request permissions + get Expo Push Token
        const { expoPushToken } = await registerForPushNotificationsAsync();
        setExpoPushToken(expoPushToken ?? null);

        // Listener: Foreground notification received
        notificationListener.current =
          Notifications.addNotificationReceivedListener((notification) => {
            // console.log("📩 Notification Received:", notification);
          });

        // Listener: Tapped notification response
        responseListener.current =
          Notifications.addNotificationResponseReceivedListener((response) => {
            // console.log("📲 Notification Response:", response);
          });
      } catch (e) {
        // console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();

    // Cleanup
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Poppins-Thin": require("@/src/assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("@/src/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@/src/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("@/src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("@/src/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("@/src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("@/src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@/src/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("@/src/assets/fonts/Poppins-Black.ttf"),
  });
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    console.log("fontsLoaded");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <GradientScreenBackground>
            <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
              />
              {/* <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: "transparent" },
                }}
              >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              </Stack> */}
              <RootStack />
            </SafeAreaView>
          </GradientScreenBackground>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
