import { Stack } from "expo-router";
import React from "react";

const RootStack = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "transparent" },

      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "slide_from_bottom" }} />
      <Stack.Screen
        name="categories"
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="(forms)"
        options={{
          headerShown: false,
          animation: "slide_from_left",
        }}
      />

      <Stack.Screen name="(budget)" options={{ headerShown: false, animation: "slide_from_left" }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false, animation: "slide_from_left" }} />
      <Stack.Screen name="transaction" options={{ headerShown: false, animation: "slide_from_left" }} />
    </Stack>
  );
};

export default RootStack;
