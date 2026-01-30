import { Add, Back, Export } from '@/src/assets';
import Button from '@/src/components/General-Components/Button';
import CustomBottomSheet, { CustomBottomSheetRef } from '@/src/components/General-Components/CustomBottomSheet';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCategoriesIconsStore } from '@/src/store/categoriesIcon.store';
import { useCategoriesStore } from '@/src/store/categories.store';

const Categorieslist = () => {
    const { icons, init: initIcons } = useCategoriesIconsStore();
    const { categories, init: initCategories, addCategory } = useCategoriesStore();
    const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
    const [categoryName, setCategoryName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState('');
    const [tempIcon, setTempIcon] = useState('');
    const [selectedIconType, setSelectedIconType] = useState<'font-awesome' | 'Ionicons'>('Ionicons');

    const isFormValid = categoryName.trim().length > 0 && selectedIcon.trim().length > 0;

    useEffect(() => {
        initIcons();
        initCategories();
    }, []);

    // Combine default categories (icons) with user-created categories
    const allCategories = useMemo(() => {
        const defaultCategories = icons.map(icon => ({
            id: icon.id,
            name: icon.name,
            icon: icon.icon,
            iconType: icon.type,
            isDefault: true,
        }));

        const userCategories = categories.map(cat => ({
            id: cat.id,
            name: cat.name,
            icon: cat.icon,
            iconType: cat.iconType,
            isDefault: false,
        }));

        return [...defaultCategories, ...userCategories];
    }, [icons, categories]);

    const handleAddCategory = async () => {
        // Validate both fields
        if (!categoryName.trim() || !selectedIcon.trim()) {
            console.log("Please fill category name and select an icon");
            return;
        }

        await addCategory({
            name: categoryName.trim(),
            icon: selectedIcon,
            iconType: selectedIconType,
        });

        // Reset form
        setCategoryName('');
        setSelectedIcon('');
        setTempIcon('');
        bottomSheetRef.current?.close();
        console.log("Category added successfully");
    };

    const handleIconSelect = (iconName: string, iconType?: 'font-awesome' | 'Ionicons') => {
        setTempIcon(iconName);
        if (iconType) {
            setSelectedIconType(iconType);
        }
    };

    const handleConfirmIcon = () => {
        setSelectedIcon(tempIcon);
        setIsModalVisible(false);
    };

    return (
        <>
            <View className='flex-1 p-6 pt-5'>
                <Pressable onPress={() => router.back()} className='flex-row items-center gap-2'>
                    <Back width={32} height={32} />
                    <Text className='text-titlelarge font-normal text-dark'>Categories</Text>
                </Pressable>
                <View className='flex-1'>
                    <FlashList
                        data={allCategories}
                        renderItem={({ item }) => (
                            <View className='gap-2'>
                                <View className=' items-center justify-center pb-5'>
                                    <View className='w-[72px] h-[72px] border border-gray-300 rounded-lg items-center justify-center bg-secondary-100'>
                                        {item.iconType === "font-awesome" ? <Icon name={item.icon as any} size={40} color="black" /> : <Ionicons name={item.icon as any} size={40} color="black" />}
                                    </View>
                                    <Text className='text-bodymedium font-normal text-dark'>{item.name}</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        contentContainerStyle={{ gap: 16, padding: 8 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <Button
                    label="Add New Category"
                    onPress={() => {
                        bottomSheetRef.current?.open();
                    }}
                    startIcon={<Add width={15} height={15} />}
                />
                <CustomBottomSheet
                    title="Add Category"
                    ref={bottomSheetRef}
                    snapPoints={['25%']}
                    doubleButton={false}
                >
                    <View className='flex-1 px-6 pb-4 pt-[68px] gap-1.5'>
                        <Text className='text-titlesmall font-normal text-dark'>Category Name</Text>
                        <TextInput
                            className='text-titlesmall font-medium text-dark border border-accent rounded-lg px-4 py-3'
                            placeholder='Type here...'
                            numberOfLines={1}
                            style={{ width: "100%", minHeight: 50 }}
                            value={categoryName}
                            onChangeText={(text) => {
                                setCategoryName(text);
                            }}
                        />
                    </View>
                    <Pressable className='px-6 flex-row items-center justify-between' onPress={() => {
                        setIsModalVisible(true);
                    }}>
                        <Text className={selectedIcon ? 'text-secondary-400 bg-secondary-100 px-2 py-1 rounded-lg text-titlesmall font-medium' : 'text-subtext text-titlesmall font-medium'}>{selectedIcon ? "Icon Selected" : "Select Icon"}</Text>
                        <Export width={16} height={16} />
                    </Pressable>
                    <View className='px-6 pt-4 pb-8'>
                        <Button
                            label="Add Category"
                            onPress={() => handleAddCategory()}
                            disabled={!isFormValid}
                        />
                    </View>
                </CustomBottomSheet>
            </View>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}
            >
                <Pressable
                    className='flex-1 justify-center items-center'
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onPress={() => setIsModalVisible(false)}
                >
                    <Pressable
                        className='bg-white rounded-2xl w-[90%] max-h-[80%]'
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View className='px-6 pt-6 pb-4'>
                            <Text className='text-titlelarge font-bold text-dark text-center'>Select Category Icon</Text>
                        </View>
                        <View className='px-4 pb-4' style={{ height: 400 }}>
                            <FlashList
                                data={icons}
                                renderItem={({ item }) => (
                                    <View className='items-center justify-center pb-5'>
                                        <Pressable
                                            className={`w-[72px] h-[72px] rounded-lg items-center justify-center ${tempIcon === item.icon ? 'bg-secondary-400' : ''}`}
                                            onPress={() => {
                                                handleIconSelect(item.icon, item.type);
                                            }}
                                        >
                                            {item.type === "font-awesome" ? <Icon name={item.icon as any} size={24} color={tempIcon === item.icon ? "white" : "black"} /> : <Ionicons name={item.icon as any} size={24} color={tempIcon === item.icon ? "white" : "black"} />}
                                        </Pressable>
                                    </View>
                                )}
                                keyExtractor={(item) => item.id}
                                numColumns={5}
                                contentContainerStyle={{ gap: 16, padding: 8 }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <View className='px-6 pb-6'>
                            <Button
                                label="Select"
                                onPress={handleConfirmIcon}
                            />
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
};

export default Categorieslist;