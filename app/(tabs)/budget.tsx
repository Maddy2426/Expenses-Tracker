import { View, Text, Pressable } from "react-native";
import React from "react";
import { Expense, ExpensesEmptyData, Menu } from "@/src/assets";
import { router } from "expo-router";
import Button from "@/src/components/General-Components/Button";

const Budget = () => {
  return (
    <View className="flex-1 p-6 pt-5">
      <View className="flex-row justify-between items-center pb-6">
        <Text className="text-titlelarge font-normal text-dark">Budget</Text>
        <Pressable onPress={() => router.push("/(budget)/budgetSet")}>
          <Menu width={32} height={32} />
        </Pressable>
      </View>
      <Text className="text-textcolor text-headlinemedium font-medium">
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </Text>
      <View className="flex-1 items-center justify-center">
        <ExpensesEmptyData width={250} height={250} />
      </View>
      <Button
        label="Create Budget"
        variant="primary"
        size="sm"
        onPress={() => router.push("/(budget)/budgetSet")}
        fullWidth
        rounded="rounded-full"
        className="py-4"
      />
    </View>
  );
};

export default Budget;
