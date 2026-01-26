import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{ animation: "slide_from_right", contentStyle: { backgroundColor: "transparent" } }}>
      <Stack.Screen name="budgetSet" options={{ headerShown: false }} />
      <Stack.Screen name="transactionDetail" options={{ headerShown: false }} />
      <Stack.Screen name="monthlyBudgetReset" options={{ headerShown: false }} />
      <Stack.Screen name="personalDetails" options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout