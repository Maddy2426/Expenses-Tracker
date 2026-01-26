import {
  ArrowLeftWithOutTail,
  ArrowRightWithTail,
  Budget,
  Home,
  Transaction,
  User,
} from "@/src/assets";
import Button from "@/src/components/General-Components/Button";
import Cards from "@/src/components/General-Components/Cards";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export const AmountCard = () => {
  return (
    <View className="bg-accent p-4 rounded-[20px] flex-row justify-between items-center">
      <View className=" gap-2">
        <Text className="text-bodysmall font-normal text-subtext">2025</Text>
        <Text className="text-bodymedium font-normal text-textcolor">
          November
        </Text>
      </View>
      <View>
        <Text className="text-titlemedium font-medium text-dark">
          {"₹"} 1000
        </Text>
      </View>
    </View>
  );
};

const index = () => {
  const categories = [
    {
      id: 1,
      name: "Food",
      icon: <Home width={44} height={44} />,
      iconName: "Home",
    },
    {
      id: 2,
      name: "Transport",
      icon: <User width={44} height={44} />,
      iconName: "User",
    },
    {
      id: 3,
      name: "Entertainment",
      icon: <Budget width={44} height={44} />,
      iconName: "Budget",
    },
    {
      id: 4,
      name: "Shopping",
      icon: <Transaction width={44} height={44} />,
      iconName: "Transaction",
    },
    {
      id: 5,
      name: "Other",
      icon: <ArrowRightWithTail width={44} height={44} />,
      iconName: "ArrowRight",
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Cards
        title={item.name}
        subtitle={item.name}
        icon={item.icon}
        type="Expense"
        rightIcon={<ArrowRightWithTail width={16} height={16} />}
        subicon={false}
        className="bg-white rounded-none"
        titleclassName="text-textcolor"
        borderbottom={true}
        subtitleclassName="text-dark"
        rightIconClassName="bg-secondary-400 p-2 rounded-full"
        onPress={() => {
          router.push({
            pathname: "/categories/[id]",
            params: {
              id: item.id.toString(),
              name: item.name,
              iconName: item.iconName,
            },
          });
        }}
      />
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
          startIcon={<ArrowLeftWithOutTail width={11} height={11} />}
          className="w-3 h-10 rounded-full"
        />
        <Text className="text-titlelarge font-normal text-dark">
          Categories
        </Text>
      </View>
      <AmountCard />
      <View className="pt-5 flex-1">
        <FlashList
          data={categories}
          renderItem={({ item }) => renderItem({ item })}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default index;
