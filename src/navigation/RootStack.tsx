import { Stack } from "expo-router";
import React from "react";

const RootStack = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },
        animation: "slide_from_bottom", // Add animation here
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="categories"
        options={{
          headerShown: false,
          animation: "slide_from_right", // Or set it per screen
        }}
      />
    </Stack>
  );
};

export default RootStack;
