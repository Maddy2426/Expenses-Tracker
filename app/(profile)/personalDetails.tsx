import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Back, Logout } from '@/src/assets'

const personalDetails = () => {
    return (
        <View className="flex-1 p-6 pt-5">
            <View className="flex-row items-center justify-between pb-6 gap-3">
                <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => router.back()}>
                        <Back width={32} height={32} />
                    </Pressable>
                    <Text className="text-titlelarge font-normal text-dark">
                        Personal Details
                    </Text>
                </View>
                <Pressable onPress={() => router.push("/(auth)")} className='flex-row items-center gap-1.5'>
                    <Text className='text-bodymedium font-normal text-warning-300'>Sign-Out</Text>
                    <Logout width={16} height={16} />
                </Pressable>
            </View>
        </View>
    )
}

export default personalDetails