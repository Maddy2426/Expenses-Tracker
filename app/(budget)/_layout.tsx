import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}>
            <Stack.Screen name="budgetSet" options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout