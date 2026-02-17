import {
  Back,
  EditProfile,
  Email,
  Logout,
  Password,
  UserName,
} from "@/src/assets";
import CustomBottomSheet, {
  CustomBottomSheetRef,
} from "@/src/components/General-Components/CustomBottomSheet";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

type ViewState = "input" | "otp" | "success";

const PersonalDetails = () => {
  const { userEmail } = useLocalAuthStore();
  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);
  const [title, setTitle] = useState<string>("");
  const [currentItem, setCurrentItem] = useState<string>("");
  const [viewState, setViewState] = useState<ViewState>("input");

  // Form states
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  // Password visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // OTP Timer
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const data = [
    {
      id: "1",
      label: "Email",
      value: userEmail ?? "No email found",
      icon: Email,
    },
    {
      id: "2",
      label: "Username",
      value: userEmail ?? "No username found",
      icon: UserName,
    },
    {
      id: "3",
      label: "Name",
      value: userEmail ?? "No name found",
      icon: UserName,
    },
    { id: "4", label: "Password", value: "********", icon: Password },
  ];

  const handleEdit = (item: { id: string; label: string }) => {
    setTitle(item.label);
    setCurrentItem(item.id);
    setViewState("input");
    // Reset all form states
    setEmail("");
    setUsername("");
    setName("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOtp("");
    setEmailError("");
    setUsernameError("");
    setPasswordError("");
    setOtpTimer(0);
    bottomSheetRef.current?.open();
  };

  const renderItem = ({
    item,
  }: {
    item: {
      id: string;
      label: string;
      value: string;
      icon: React.ComponentType<{ width?: number; height?: number }>;
    };
  }) => {
    const Icon = item.icon;
    return (
      <View>
        <View className="flex-row items-center justify-between pb-5">
          <View className="gap-2">
            <View className="flex-row items-center gap-1">
              <Icon width={16} height={16} />
              <Text className="text-labelsmall font-normal text-dark">
                {item.label}
              </Text>
            </View>
            <Text className="text-bodymedium font-normal text-dark">
              {item.value}
            </Text>
          </View>
          <Pressable onPress={() => handleEdit(item)}>
            <EditProfile width={16} height={16} />
          </Pressable>
        </View>
        {item.id === "4" ? (
          <Text className="text-subtext text-bodysmall font-medium -mt-4">
            Last changed: 15/08/2025
          </Text>
        ) : (
          <View
            className="w-full pb-3 mb-5"
            style={{ borderBottomWidth: 0.5, borderBottomColor: "#E5E5E5" }}
          />
        )}
      </View>
    );
  };

  const renderBottomSheetContent = (title: string) => {
    return (
      <View>
        {title === "Email" && (
          <View>
            <Text className="text-titlesmall font-normal">
              We've sent code to madddy@gmail.com
            </Text>
            {/* <OtpInput/> */}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 p-6 pt-5">
      <View className="flex-row items-center justify-between pb-6 gap-3">
        <View className="flex-row items-center gap-2">
          <Pressable onPress={() => router.back()}>
            <Back width={32} height={32} />
          </Pressable>
          <Text className="text-titlelarge font-normal text-dark">
            Personal Details
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/(auth)")}
          className="flex-row items-center gap-1.5"
        >
          <Text className="text-bodymedium font-normal text-warning-300">
            Sign-Out
          </Text>
          <Logout width={16} height={16} />
        </Pressable>
      </View>
      <View className="flex-1 border border-subtext rounded-xl p-3 mb-16">
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className="flex-1" />
      <CustomBottomSheet
        ref={bottomSheetRef}
        title={viewState === "success" ? "" : `Update ${title}`}
        snapPoints={viewState === "success" ? ["40%"] : ["25%"]}
        doubleButton={false}
      >
        <View className="flex-1 px-6 pt-14">
          {renderBottomSheetContent(title)}
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default PersonalDetails;
