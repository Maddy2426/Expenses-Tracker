import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomCheckboxProps {
    label: string;
    value: boolean;
    onValueChange: (newValue: boolean) => void;
}

export const CustomCheckbox = ({ label, value, onValueChange }: CustomCheckboxProps) => {
    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            className="flex-row items-center gap-3"
        >
            {/* Checkbox Box */}
            <View
                className={`w-4 h-4 border items-center justify-center ${value ? 'bg-secondary-400 border-secondary-400' : 'border-gray-400 bg-transparent'
                    }`}
            >
                {value && (
                    <Ionicons name="checkmark" size={10} color="white" />
                )}
            </View>

            {/* Label */}
            {label && <Text className="text-body text-dark">{label}</Text>}
        </Pressable>
    );
};