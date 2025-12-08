import { Clock } from "@/assets";
import React from "react";
import { Pressable, Text, View } from "react-native";

interface CardsProps {
  title: string;
  subtitle: string;
  amount?: number;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  type?: string;
  subicon?: boolean;
  rightIconClassName?: string;
  onPress?: () => void;
  titleclassName?: string;
  subtitleclassName?: string;
  borderbottom?: boolean;
}

const Cards = ({
  title,
  subtitle,
  amount,
  icon,
  rightIcon,
  className,
  type,
  subicon = true,
  rightIconClassName = "bg-secondary-400 p-2 rounded-full",
  titleclassName = "font-normal text-bodymedium text-dark",
  subtitleclassName = "font-normal text-subtext text-bodysmall",
  borderbottom = false,
  onPress,
}: CardsProps) => {
  return (
    <Pressable
      className={`flex-row justify-between items-center pl-6 pr-4 py-5 rounded-3xl ${className} ${
        type === "Expense" ? "bg-accent" : "bg-success-100"
      }`}
      onPress={onPress}
    >
      <View className=" gap-2">{icon && <Text>{icon}</Text>}</View>
      <View className="flex-1">
        <View className="flex-1 flex-row justify-between items-center pl-2 ">
          <View className="flex-col gap-1">
            <Text className={`${titleclassName}`}>{title}</Text>
            <View className="gap-1.5 flex-row">
              {subicon && <Clock />}
              <Text className={` ${subtitleclassName}`}>{subtitle}</Text>
            </View>
          </View>
          {amount && (
            <Text className="font-normal text-bodymedium">
              {"₹"} {amount}
            </Text>
          )}
          {rightIcon && (
            <View className={`${rightIconClassName}`}>{rightIcon}</View>
          )}
        </View>
        {borderbottom && <View className="border-b border-accent w-full " />}
      </View>
    </Pressable>
  );
};

export default Cards;
