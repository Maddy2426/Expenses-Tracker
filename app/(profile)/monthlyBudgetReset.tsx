import { View, Text, Pressable, Switch } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Back, Budget } from '@/src/assets'

const monthlybudgetreset = () => {
    return (
        <View className="flex-1 p-6 pt-5">
            <View className="flex-row items-center pb-6 gap-3">
                <Pressable onPress={() => router.back()}>
                    <Back width={32} height={32} />
                </Pressable>
                <Text className="text-titlelarge font-normal text-dark">
                    Monthly Budget Reset
                </Text>
            </View>
            <View className="flex-1">
                <View className="flex-row items-center justify-between gap-2">
                    <View className="flex-row items-center gap-2">
                        <View className="bg-secondary-100 p-2 rounded-xl">
                            <Budget width={24} height={24} />
                        </View>
                        <Text className='text-bodymedium font-normal text-dark'>
                            Budget Reset (Monthly)
                        </Text>
                    </View>
                    <Switch
                        value={true}
                        onValueChange={() => { }}
                    />
                </View>
                <Text className='text-bodymedium font-normal text-subtext'>Turning this on will automatically reset your monthly budget to the previous month’s amount. You can change this anytime here.</Text>
            </View>
        </View>
    )
}

export default monthlybudgetreset