import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

import GradientScreenBackground from "@/components/TabBar-Components/GradingComponent";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import RootStack from "@/navigation/RootStack";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
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
