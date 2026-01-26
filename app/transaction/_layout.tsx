import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "transparent" } }}>
            <Stack.Screen name="transactionDetail" options={{ headerShown: false }} />
        </Stack>
    )
}

export default _layout