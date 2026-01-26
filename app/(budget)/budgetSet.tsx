import { View, Text, Pressable, Switch } from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { Back } from "@/src/assets";
import { router } from "expo-router";
import { TextInput } from "react-native";
import Button from "@/src/components/General-Components/Button";
import CustomBottomSheet, { CustomBottomSheetRef } from "@/src/components/General-Components/CustomBottomSheet";
import CustomDropdown from "@/src/components/General-Components/CustomDropdown";

const BudgetSet = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [receivedNotification, setReceivedNotification] = useState(false);
  const [alertAmount, setAlertAmount] = useState(0);
  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.open();
  }, []);

  const categoryItems = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Housing", value: "housing" },
    { label: "Utilities", value: "utilities" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Education", value: "education" },
    { label: "Travel", value: "travel" },
    { label: "Shopping", value: "shopping" },
    { label: "Other", value: "other" },
    { label: "Other", value: "other" },
  ];

  return (
    <View className="flex-1 p-6 pt-5">
      <View className="flex-row items-center pb-6 gap-3">
        <Pressable onPress={() => router.back()}>
          <Back width={32} height={32} />
        </Pressable>
        <Text className="text-titlelarge font-normal text-dark">
          Budget Setting
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-headlinemedium font-medium text-textcolor">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Text>
        <View className="pt-6">
          <Text className="text-titlemedium font-medium text-textcolor">
            Total budget amount for this month
          </Text>
          <View className="">
            <TextInput
              className="text-displaylarge font-medium text-dark"
              placeholder="₹ 0"
              style={{ width: "100%", minHeight: 100 }}
              keyboardType="numeric"
              numberOfLines={1}
              onChangeText={(text) => {
                const numValue = parseFloat(text) || 0;
                setTotalBudget(numValue);
              }}
            />
          </View>
        </View>
      </View>
      <View className="flex-row items-center justify-center gap-2 pb-4">
        <Button
          label="Add Category"
          variant="secondary"
          size="xxl"
          onPress={openBottomSheet}
        />
        <Button
          label="Finalize"
          variant="primary"
          size="xxl"
          onPress={() => {}}
        />
      </View>
      <CustomBottomSheet
        ref={bottomSheetRef}
        snapPoints={["25%"]}
        doubleButton={false}
      >
        <View className="flex-1 p-6">
            <View className="justify-center items-center">
                <Text className="text-titlelarge font-medium text-dark">
                    Add Category
                </Text>
            </View>
            <View className="gap-4 pt-4">
                <CustomDropdown
                value={selectedCategory}
                items={categoryItems}
                onChange={setSelectedCategory}
                />
                <View>
                    <Text className="text-subtext text-titlesmall font-medium">How much do you want spend ?</Text>
                    <TextInput
                        className="text-displaylarge font-medium text-dark"
                        placeholder="₹ 0"
                        keyboardType="numeric"
                        numberOfLines={1}
                        style={{ width: "100%", minHeight: 85 }}
                        onChangeText={(text) => {
                            const numValue = parseFloat(text) || 0;
                            setTotalBudget(numValue);
                        }}
                    />
                <View className="flex-row items-center justify-between ">
                    <Text className="text-subtext text-titlesmall font-medium">Received Alert ?</Text>
                    <Switch
                        value={receivedNotification}
                        onValueChange={setReceivedNotification}
                    />
                </View>
                <View className="gap-3">
                    <Text className="text-subtext text-labelmedium font-medium">Enter the amount or swipe the percentage to receive alert</Text>
                    <Text className="text-headlinesmall font-medium text-textcolor">₹ 0</Text>
                    
                </View>
                <View>
                    <Button
                    label="Add Category"
                    variant="primary"
                    size="xxl"
                    onPress={() => {}}
                    />
                </View>
                </View>
            </View>
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default BudgetSet;
