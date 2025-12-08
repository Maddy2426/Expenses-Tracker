import {
  Add,
  Budget,
  BudgetActive,
  Close,
  Home,
  HomeActive,
  Transaction,
  TransactionActive,
  User,
  UserActive,
} from "@/assets";
import { HapticTab } from "@/components/TabBar-Components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        sceneStyle: { backgroundColor: "light" },
        tabBarStyle: {
          paddingBottom: 15,
          height: 72,
          gap: 5,
          // backgroundColor,
          borderColor: "#FAFCFE",
        },
        tabBarItemStyle: { paddingTop: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <HomeActive width={24} height={24} />
            ) : (
              <Home width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              // style={
              //   focused
              //     ? { color: "#4B4DED", fontWeight: "400", fontSize: 12 }
              //     : { color: "#4A4A68", fontWeight: "400", fontSize: 12 }
              // }
              className={`${
                focused ? "text-secondary-400" : "text-textcolor"
              } text-xs font-normal`}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <TransactionActive width={20} height={20} />
            ) : (
              <Transaction width={20} height={20} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-secondary-400" : "text-textcolor"
              } text-xs font-normal`}
            >
              Transaction
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="createexpenses"
        options={{
          title: "Create Expenses",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Close width={10} height={10} />
            ) : (
              <Add width={14} height={14} />
            ),
          tabBarButton: (props) => (
            <HapticTab
              {...props}
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#4B4DED",
                left: 15,
                width: 45,
                height: 45,
                borderRadius: 25,
              }}
            />
          ),

          // ... existing code ...

          tabBarLabel: ({ focused }) => focused && null,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: "Budget",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <BudgetActive
                width={24}
                height={24}
                color={"#fff"}
                strokeWidth={1.5}
              />
            ) : (
              <Budget width={24} height={24} color={"#fff"} strokeWidth={1.5} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-secondary-400" : "text-textcolor"
              } text-xs font-normal`}
            >
              Budget
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <UserActive width={24} height={24} />
            ) : (
              <User width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-secondary-400" : "text-textcolor"
              } text-xs font-normal`}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
