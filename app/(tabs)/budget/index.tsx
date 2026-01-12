import { View, Text } from "react-native";
import React from "react";
import { Menu } from "@/src/assets";

const index = () => {
  return (
    <View className="flex-1 p-6 pt-5">
      <View className="flex-row justify-between items-center">
        <Text className="text-titlelarge font-normal text-dark">Budget</Text>
        <Menu width={32} height={32} />
      </View>
      <Text>index</Text>
    </View>
  );
};

export default index;
