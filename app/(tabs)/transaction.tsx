import Cards from "@/src/components/General-Components/Cards";
import DateNavBar from "@/src/components/General-Components/DateNavBar";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Transaction = () => {
  const [dateNavBarValue, setDateNavBarValue] = useState(new Date());
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const data = [
    {
      id: 1,
      title: "Transaction 1",
      subtitle: "Transaction 1",
      amount: 100,
      type: "Expense",
    },
    {
      id: 2,
      title: "Transaction 2",
      subtitle: "Transaction 2",
      amount: 200,
      type: "Income",
    },
    {
      id: 3,
      title: "Transaction 3",
      subtitle: "Transaction 3",
      amount: 300,
      type: "Expense",
    },
    {
      id: 4,
      title: "Transaction 4",
      subtitle: "Transaction 4",
      amount: 400,
      type: "Income",
    },
    {
      id: 5,
      title: "Transaction 5",
      subtitle: "Transaction 5",
      amount: 500,
      type: "Expense",
    },
    {
      id: 6,
      title: "Transaction 6",
      subtitle: "Transaction 6",
      amount: 600,
      type: "Income",
    },
    {
      id: 7,
      title: "Transaction 7",
      subtitle: "Transaction 7",
      amount: 700,
      type: "Expense",
    },
    {
      id: 8,
      title: "Transaction 8",
      subtitle: "Transaction 8",
      amount: 800,
      type: "Income",
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Cards
        title={item.title}
        subtitle={item.subtitle}
        icon={<></>}
        amount={item.amount}
        type={item.type}
      />
    );
  };

  return (
    <View className="flex-1 p-6">
      <View className="pt-11 pb-6">
        <DateNavBar
          value={dateNavBarValue}
          onChange={(date: any) => {
            setDateNavBarValue(date);
          }}
          minDate={minDate}
          maxDate={maxDate}
        />
      </View>
      <View className="flex-1">
        <View className="bg-accent h-56 rounded-xl "></View>
        <View className="flex-1 pt-6">
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="gap-4"
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Transaction;
