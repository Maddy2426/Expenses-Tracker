import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}>
            <Stack.Screen name="monthlyBudgetReset" options={{ headerShown: false }} />
            <Stack.Screen name="personalDetails" options={{ headerShown: false }} />
            <Stack.Screen name="storageAndData" options={{ headerShown: false }} />
            <Stack.Screen name="categorieslist" options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout