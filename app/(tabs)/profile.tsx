import { View, Text, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import Button from "@/src/components/General-Components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-dark text-2xl font-bold">Profile</Text>
      <View className="flex-row gap-4">
        <Button
          label="Logout"
          onPress={applogout}
          className="rounded-xl"
          size="xl"
        />
        <Button
          label="Delete Account"
          onPress={clearAllData}
          className="rounded-xl"
          size="xl"
        />
      </View>
    </View>
  );
};

export default Profile;
