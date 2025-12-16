import {
  View,
  Text,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import { Facebook, Google, Logo } from "@/src/assets";
import FieldComponent from "@/src/components/authComponents/FieldComponent";
import { useForm } from "react-hook-form";
import Button from "@/src/components/General-Components/Button";
import { router } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required"),
  // .email("Enter a valid email")
  // .regex(
  //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  //   "Enter a valid email"
  // ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
  //   "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
  // ),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { control, handleSubmit, watch } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginValues) => {
    console.log("data", handleSubmit);
    router.replace("/(tabs)");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex-1 p-6">
          <View className="items-end gap-2">
            <Logo />
          </View>
          <Text className="text-headlinemedium font-bold pt-[54px] text-dark">
            Hi, Welcome! 👋
          </Text>
          <View className="pt-[38px]">
            <FieldComponent
              control={control}
              name="email"
              label="Email Address"
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
              showPasswordToggle={true}
            />
            <FieldComponent
              control={control}
              name="password"
              label="Password"
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              showPasswordToggle={true}
            />
          </View>
          <Pressable
            className="items-end"
            onPress={() => router.push("/(auth)/forgot-password")}
          >
            <Text className="text-labellarge font-normal text-dark">
              Forgot Password?
            </Text>
          </Pressable>
          <View className="pt-11">
            <Button
              label="Log in"
              onPress={handleSubmit(onSubmit)}
              rounded="rounded-[10px]"
              size="xl"
            />
          </View>
          <View className=" flex-row justify-center pt-24">
            <View className="border border-[#D8DADC] w-36 h-0 mt-2" />
            <Text className="text-labellarge font-normal text-dark px-5 ">
              Or with
            </Text>
            <View className="border border-[#D8DADC] flex-row w-36 h-0 mt-2" />
          </View>
          <View className="flex-row justify-center pt-6 gap-3">
            <Button
              label="Facebook"
              rounded="rounded-[10px]"
              variant="secondary"
              className="border-subtext bg-light px-10"
              startIconClassName="pr-3 "
              startIcon={<Facebook />}
              textColor="text-dark"
              onPress={() => console.log("facebook")}
            />
            <Button
              label="Google"
              rounded="rounded-[10px]"
              variant="outline"
              className="border-subtext bg-light px-10"
              textColor="text-dark"
              startIconClassName="pr-3"
              startIcon={<Google />}
              onPress={() => console.log("google")}
            />
          </View>
          <View className="flex-row justify-center pt-[50px]">
            <Text className="text-labellarge font-normal text-dark">
              Don’t have an account?
            </Text>
            <Pressable onPress={() => router.push("/(auth)/signup")}>
              <Text className="text-labellarge font-semibold text-secondary-400">
                {" "}
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
