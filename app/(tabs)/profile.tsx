import { ArrowRight, Budget, Categories, Notifications, PersonalDetails, Storage } from "@/src/assets";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import React from "react";
import { Alert, Platform, Pressable, Text, View } from "react-native";

const Profile = () => {
  const logout = useLocalAuthStore((s) => s.logout);
  console.log("logout", logout);
  const applogout = async () => {
    await logout();
    router.push("/(auth)");
  };
  const clearAllData = async () => {
    await AsyncStorage.clear();
    Alert.alert("Cleared", "All local data removed. Restart the app.");
  };

  const menuItems = [
    { id: "1", Icon: PersonalDetails, title: "Personal Details", path: "/(profile)/personalDetails" },
    { id: "2", Icon: Categories, title: "Categories", path: "/(profile)/categorieslist" },
    { id: "3", Icon: Budget, title: "Monthly Budget reset", path: "/(profile)/monthlyBudgetReset" },
    { id: "4", Icon: Notifications, title: "Notifications", path: "/notifications", openSettings: true },
    { id: "5", Icon: Storage, title: "Storage", path: "/(profile)/storageAndData" },
  ];

  const handleItemPress = async (item: typeof menuItems[0]) => {
    if (item.openSettings) {
      if (Platform.OS === "android") {
        await Linking.openSettings();
        return;
      }
      await Linking.openSettings();
    } else {
      router.push({
        pathname: item.path as any,
      });
    }
  };

  const renderItem = ({ item, index }: { item: typeof menuItems[0]; index: number }) => (
    <>
      <Pressable className="flex-row items-center justify-between gap-2" onPress={() => handleItemPress(item)}>
        <View className="flex-row items-center gap-2">
          <View className="bg-accent p-2 rounded">
            <item.Icon width={20} height={20} />
          </View>
          <Text className="text-bodymedium font-normal text-dark">{item.title}</Text>
        </View>
        <ArrowRight width={16} height={16} />
      </Pressable>
      <View className="border-b border-accent w-full pt-3 mb-3" />
    </>
  );

  return (
    <View className="flex-1 p-6 pt-5">
      <Text className="text-titlelarge font-normal text-dark">Profile</Text>

      <View className="flex-row items-center gap-3 pb-2 mt-5 p-3 border rounded-xl border-subtext">
        <Text className="text-headlinesmall font-bold px-2.5 py-[9px] bg-secondary-400 rounded-tl-3xl rounded-lg text-light">
          JP
        </Text>
        <View className="flex-col">
          <Text className="text-bodymedium font-normal text-dark">
            no name
          </Text>
          <Text className="text-subtext text-bodysmall font-medium">
            @maddy
          </Text>
        </View>
      </View>
      <View className="mt-3 bg-secondary-100 p-1 rounded-xl">
        <Text className="text-secondary-400 text-labelsmall font-normal">Update your name anytime from your Personal Details.</Text>
      </View>
      <View className="flex-1 mt-5 border border-subtext rounded-xl p-3" style={{ borderWidth: 0.5 }}>
        <FlashList
          data={menuItems}
          renderItem={({ item }) => renderItem({ item, index: Number(item.id) })}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className="flex-1 mt-5">
        <Text className="text-displaylarge font-bold text-secondary-200">Save. Grow. Prosper.</Text>
      </View>
    </View>
  );
};

export default Profile;

// ... existing code ...