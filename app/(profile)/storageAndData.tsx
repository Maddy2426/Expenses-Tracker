import { Back } from '@/src/assets';
import Button from '@/src/components/General-Components/Button';
import { CustomCheckbox } from '@/src/components/General-Components/checkBox';
import * as FileSystem from 'expo-file-system/legacy';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface StorageInfo {
    userDataSize: number;
    cacheSize: number;
    totalSize: number;
}


export default function StorageAndData() {
    const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);
    // ... state

    const getStorageInfo = async () => {
        let userDataSize = 0; // in bytes
        if (FileSystem.documentDirectory) {
            const userFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);

            // Get actual size of each file
            for (const file of userFiles) {
                const filePath = FileSystem.documentDirectory + file;
                const fileInfo = await FileSystem.getInfoAsync(filePath);
                if (fileInfo.exists && !fileInfo.isDirectory) {
                    userDataSize += fileInfo.size || 0;
                }
            }
        }

        let cacheDataSize = 0; // in bytes
        if (FileSystem.cacheDirectory) {
            const cacheFiles = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);

            for (const file of cacheFiles) {
                const filePath = FileSystem.cacheDirectory + file;
                const fileInfo = await FileSystem.getInfoAsync(filePath);
                if (fileInfo.exists && !fileInfo.isDirectory) {
                    cacheDataSize += fileInfo.size || 0;
                }
            }
        }

        // Convert bytes to MB
        const userDataSizeMB = userDataSize / (1024 * 1024);
        const cacheDataSizeMB = cacheDataSize / (1024 * 1024);
        const totalSizeMB = userDataSizeMB + cacheDataSizeMB;

        setStorageInfo({
            userDataSize: Math.round(userDataSizeMB * 100) / 100, // Round to 2 decimals
            cacheSize: Math.round(cacheDataSizeMB * 100) / 100,
            totalSize: Math.round(totalSizeMB * 100) / 100,
        });
    };

    useEffect(() => {
        getStorageInfo();
    }, []);

    // ... getTotalStorage

    const handleClearData = async () => {
        if (storageInfo && isConfirmed) {
            const totalSize = storageInfo.userDataSize + storageInfo.cacheSize;

            if (totalSize > 0) {
                console.log("Clearing data...");

                try {
                    // 1. Delete Cache Directory Content
                    if (FileSystem.cacheDirectory) {
                        const cacheFiles = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory);
                        for (const file of cacheFiles) {
                            await FileSystem.deleteAsync(FileSystem.cacheDirectory + file);
                        }
                    }

                    // 2. Delete Document Directory Content (Be careful with this!)
                    // This deletes ALL user data in the document folder.
                    if (FileSystem.documentDirectory) {
                        const userFiles = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
                        for (const file of userFiles) {
                            await FileSystem.deleteAsync(FileSystem.documentDirectory + file);
                        }
                    }

                    console.log("Data cleared successfully");

                    // 3. Refresh the UI to show 0 MB
                    await getStorageInfo();

                } catch (error) {
                    console.error("Error clearing data:", error);
                }

            } else {
                console.log("No data to clear");
            }
        }
    };
    return (
        <View className="flex-1 p-6 pt-5">
            <View className="flex-row items-center pb-6 gap-3">
                <Pressable onPress={() => router.back()}>
                    <Back width={32} height={32} />
                </Pressable>
                <Text className="text-titlelarge font-normal text-dark">
                    Storage and Data
                </Text>
            </View>
            <View className="flex-1 justify-between" >
                <View className="mt-6 p-3 gap-1 border border-subtext rounded-xl">
                    <Text className="text-bodysmall font-normal text-dark">User</Text>
                    <Text className="text-titlemedium font-mediu text-dark">{storageInfo?.userDataSize} MB</Text>
                </View>
                <View className='gap-4'>
                    <Text className='text-bodysmall font-normal text-dark'>Clearing all data will permanently delete all past data stored in your account and cannot be restored.</Text>
                    <CustomCheckbox
                        label="I have reviewed the information carefully"
                        value={isConfirmed}
                        onValueChange={setIsConfirmed}
                    />
                    <Button label="Erase and Clear data" variant="danger" onPress={() => handleClearData()} />
                </View>
            </View>
        </View>
    );
}
