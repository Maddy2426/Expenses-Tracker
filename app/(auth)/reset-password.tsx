import { Back, Logo } from "@/src/assets";
import FieldComponent from "@/src/components/authComponents/FieldComponent";
import Button from "@/src/components/General-Components/Button";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    // .max(20, "Password must be less than 20 characters")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    // ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This makes the error appear on the confirmPassword field
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const Resetpassword = () => {
  const resetPasswordLocal = useLocalAuthStore((s) => s.resetPasswordLocal);
  const [success, setSuccess] = useState(false);
  const { control, handleSubmit } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const SuccessScreen = () => {
    return (
      <View className="flex-1 justify-center ">
        <View className="items-center">
          <Logo width={90} height={90} />
          <View className="items-center mt-14">
            <Text className="text-[42px] font-bold text-dark">
              Password changed
            </Text>
            <Text className="text-titlemedium font-normal text-subtext pt-3 px-11 text-center">
              Your password has been changed succesfully{" "}
            </Text>
          </View>
        </View>
        <View className="mt-9">
          <Button
            label="Back to login"
            onPress={() => router.push("/")}
            className="rounded-xl"
            size="xl"
          />
        </View>
      </View>
    );
  };
  const onSubmit = async (data: ResetPasswordValues) => {
    const ok = await resetPasswordLocal({ newPassword: data.password });
    if (ok) {
      setSuccess(true);
    } else {
      Alert.alert("Failed to reset password");
    }
    setSuccess(true);
    console.log(data);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="flex-1 p-6 ">
          {success ? (
            <SuccessScreen />
          ) : (
            <View className="flex-1">
              <Pressable
                onPress={() => router.back()}
                className="flex-row items-center justify-between gap-2"
              >
                <Back width={40} height={40} />
                <Logo />
              </Pressable>

              <View>
                <View className="mr-20">
                  <Text className="text-[42px] font-bold pt-14 text-dark">
                    Reset Password
                  </Text>
                </View>

                <View className="flex-row items-center">
                  <Text className="text-titlemedium font-normal text-subtext pt-4">
                    Please type something you&apos;ll remember
                  </Text>
                </View>

                <View className="gap-[22px] mt-10">
                  <FieldComponent
                    control={control}
                    name="password"
                    label="New password"
                    placeholder="must be 8 characters"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    showPasswordToggle={true}
                  />
                  <FieldComponent
                    control={control}
                    name="confirmPassword"
                    label="Confirm new password"
                    placeholder="repeat password"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    showPasswordToggle={true}
                  />
                  <Button
                    label="Reset password"
                    onPress={handleSubmit(onSubmit)}
                    className="rounded-xl"
                    size="xl"
                  />
                </View>
              </View>
              <View className="flex-1 justify-end items-center pb-6">
                <View className="flex-row items-center gap-2">
                  <Text className="text-titlemedium font-normal text-subtext">
                    Already have an account?
                  </Text>
                  <Pressable
                    onPress={() => router.push("/")}
                    className="flex-row items-center gap-2"
                  >
                    <Text className="text-titlemedium font-normal text-secondary-400">
                      Log in
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Resetpassword;
