import { Budget, Clock, Home, User, Filter, Transaction } from "@/src/assets";
import Cards from "@/src/components/General-Components/Cards";
import SearchBar from "@/src/components/General-Components/SearchBar";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const Index = () => {
  const [dateNavBarValue, setDateNavBarValue] = useState(new Date());
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const iconMap: Record<string, React.ComponentType<any>> = {
    Home: Home,
    User: User,
    Budget: Budget,
    Transaction: Transaction,
    Clock: Clock,
  };

  const data = [
    {
      id: 1,
      title: "Transaction 1",
      subtitle: "Transaction 1",
      amount: 100,
      type: "Expense",
      icon: "Home",
    },
    {
      id: 2,
      title: "Transaction 2",
      subtitle: "Transaction 2",
      amount: 200,
      type: "Income",
      icon: "User",
    },
    {
      id: 3,
      title: "Transaction 3",
      subtitle: "Transaction 3",
      amount: 300,
      type: "Expense",
      icon: "Budget",
    },
    {
      id: 4,
      title: "Transaction 4",
      subtitle: "Transaction 4",
      amount: 400,
      type: "Income",
      icon: "Transaction",
    },
    {
      id: 5,
      title: "Transaction 5",
      subtitle: "Transaction 5",
      amount: 500,
      type: "Expense",
      icon: "Transaction",
    },
    {
      id: 6,
      title: "Transaction 6",
      subtitle: "Transaction 6",
      amount: 600,
      type: "Income",
      icon: "Transaction",
    },
    {
      id: 7,
      title: "Transaction 7",
      subtitle: "Transaction 7",
      amount: 700,
      type: "Expense",
      icon: "Transaction",
    },
    {
      id: 8,
      title: "Transaction 8",
      subtitle: "Transaction 8",
      amount: 800,
      type: "Income",
      icon: "Transaction",
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    const IconComponent = iconMap[item.icon] || Clock; // Default to Clock if not found
    return (
      <Cards
        title={item.title}
        subtitle={item.subtitle}
        icon={<IconComponent width={20} height={20} />}
        amount={item.amount}
        type={item.type}
        textcolor={true}
        className="bg-white"
        onPress={() => {
          router.push({
            pathname: "/transaction/transactiondetail",
            params: {
              id: item.id.toString(),
              title: item.title,
              subtitle: item.subtitle,
              amount: item.amount,
              type: item.type,
              icon: item.icon,
            },
          });
        }}
      />
    );
  };

  return (
    <View className="flex-1 p-6">
      <View className="pt-10 pb-6">
        <View className="flex-row items-center justify-between pb-6">
          <Text className="text-dark text-titlelarge font-normal ">
            Transactions History
          </Text>
          <Filter width={32} height={32} />
        </View>
        <SearchBar placeholder="Search" />
      </View>
      <View className="flex-1">
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

export default Index;
