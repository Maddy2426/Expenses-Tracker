import {
  ArrowLeft,
  ArrowRight,
  Budget,
  Clock,
  Home,
  Transaction,
  User,
} from "@/assets";
import Button from "@/components/General-Components/Button";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AmountCard } from ".";

const CategoryDetails = () => {
  const { id, name, iconName } = useLocalSearchParams<{
    id: string;
    name: string;
    iconName: string;
  }>();

  // Map icon names to components
  const iconMap = {
    Home: Home,
    User: User,
    Budget: Budget,
    Transaction: Transaction,
    ArrowRight: ArrowRight,
  };

  const IconComponent = iconName
    ? iconMap[iconName as keyof typeof iconMap]
    : null;

  const categories = [
    {
      id: 1,
      description: "Description 1",
      amount: 100,
      time: "10:00 AM",
      date: "2021-01-01",
    },
    {
      id: 2,
      description: "Description 2",
      amount: 200,
      time: "11:00 AM",
      date: "2021-01-02",
    },
    {
      id: 3,
      description: "Description 3",
      amount: 300,
      time: "12:00 PM",
      date: "2021-01-03",
    },
    {
      id: 4,
      description: "Description 4",
      amount: 400,
      time: "01:00 PM",
      date: "2021-01-04",
    },
    {
      id: 5,
      description: "Description 5",
      amount: 500,
      time: "02:00 PM",
      date: "2021-01-05",
    },
    {
      id: 6,
      description: "Description 6",
      amount: 600,
      time: "03:00 PM",
      date: "2021-01-06",
    },
    {
      id: 7,
      description: "Description 7",
      amount: 700,
      time: "04:00 PM",
      date: "2021-01-07",
    },
    {
      id: 8,
      description: "Description 8",
      amount: 800,
      time: "05:00 PM",
      date: "2021-01-08",
    },
    {
      id: 9,
      description: "Description 9",
      amount: 900,
      time: "06:00 PM",
      date: "2021-01-09",
    },
    {
      id: 10,
      description: "Description 10",
      amount: 1000,
      time: "07:00 PM",
      date: "2021-01-10",
    },
  ];

  const CategoryCard = ({ item }: { item: any }) => {
    return (
      <View className="pt-5 justify-between">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <Text className="text-labelmedium font-medium text-textcolor">
              {item.date}
            </Text>
            <View className="flex-row items-center gap-1">
              <Clock width={10} height={10} />
              <Text className="text-labelmedium font-medium text-textcolor">
                {item.time}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-labellarge font-medium text-dark">
              {"₹"} {item.amount}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center pt-2">
          <Text className="text-bodysmall font-normal text-subtext">
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-6 pt-11">
      <View className="flex-row items-center gap-4 pb-6">
        <Button
          // label="Add Category"
          onPress={() => {
            router.back();
          }}
          startIcon={<ArrowLeft width={14} height={14} />}
          className="w-3 h-10 rounded-full"
        />
        <Text className="text-headlinelarge font-normal text-textcolor">
          Categories
        </Text>
      </View>
      <AmountCard />
      <View className="pt-5 justify-center items-center gap-3">
        {IconComponent && <IconComponent width={56} height={56} />}
        <Text className="text-labellarge font-medium text-dark">{name}</Text>
      </View>
      <View className="flex-1 px-3">
        <FlatList
          data={categories}
          renderItem={({ item }) => <CategoryCard item={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View className="h-6 border-b border-accent" />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CategoryDetails;
