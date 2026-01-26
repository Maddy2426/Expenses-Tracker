import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import DateandTime from "@/src/components/General-Components/DateandTime";
import { Back, Budget, Home, User, Clock, Transaction } from "@/src/assets";
import { router, useLocalSearchParams } from "expo-router";

const TransactionDetail = () => {
  const { id, title, subtitle, amount, type, icon } = useLocalSearchParams<{
    id: string;
    title: string;
    subtitle: string;
    amount: string; // Change to string (URL params are always strings)
    type: string;
    icon: string;
  }>();

  console.log(icon);

  // Convert amount to number if needed
  const amountNum = amount ? parseFloat(amount) : 0;

  const iconMap: Record<string, React.ComponentType<any>> = {
    Home: Home,
    User: User,
    Budget: Budget,
    Transaction: Transaction,
    Clock: Clock,
  };
  const IconComponent = iconMap[icon] || Clock; // Default to Clock if not found

  return (
    <View className="flex-1 p-6">
      <View className="flex-row items-center gap-4 pb-6">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center justify-between gap-2"
        >
          <Back width={40} height={40} />
        </Pressable>
      </View>
      <View className="items-start">
        <DateandTime
          typeParam={type === "Expense" ? "expense" : "income"}
          todate={new Date()}
          time={new Date()}
        />
      </View>
      <View className="pt-6 pb-7">
        <Text
          className={`text-displaylarge font-normal ${
            type === "Expense" ? "text-warning-400" : "text-success-400"
          }`}
        >
          ₹ {amountNum}
        </Text>
      </View>
      <View className="flex-row items-center gap-2">
        <Text>{icon && <IconComponent width={50} height={50} />}</Text>
        <Text>{title}</Text>
      </View>
      <View className="flex-1 pt-4">
        <Text>Description</Text>
        <View className="pt-6 gap-2">
          <Text>Attachments</Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionDetail;
