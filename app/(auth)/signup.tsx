import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Facebook, Google, Logo } from "@/src/assets";
import FieldComponent from "@/src/components/authComponents/FieldComponent";
import { useForm } from "react-hook-form";
import Button from "@/src/components/General-Components/Button";
import { router } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalAuthStore } from "@/src/store/localAuth.store";

const signupSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be less than 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const { signupLocal } = useLocalAuthStore();
  const { control, handleSubmit } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (data: SignupValues) => {
    await signupLocal({ email: data.email, password: data.password });
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
            Sign up
          </Text>
          <View className="pt-[38px]">
            <FieldComponent
              control={control}
              name="email"
              label="Email Address"
              placeholder="Your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FieldComponent
              control={control}
              name="password"
              label="Create Password"
              placeholder="must be 8 characters"
              secureTextEntry={true}
              autoCapitalize="none"
              showPasswordToggle={true}
            />
            <FieldComponent
              control={control}
              name="confirmpassword"
              label="Confirm Password"
              placeholder="repeat password"
              secureTextEntry={true}
              autoCapitalize="none"
              showPasswordToggle={true}
            />
          </View>

          <View className="pt-11">
            <Button
              label="Log in"
              onPress={handleSubmit(onSubmit)}
              rounded="rounded-[10px]"
              size="xl"
            />
          </View>
          <View className=" flex-row justify-center pt-10">
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
              className="border-subtext bg-light "
              startIconClassName="pr-3 "
              startIcon={<Facebook />}
              textColor="text-dark"
              size="xxl"
              onPress={() => console.log("facebook")}
            />
            <Button
              label="Google"
              rounded="rounded-[10px]"
              variant="outline"
              className="border-subtext bg-light "
              textColor="text-dark"
              startIconClassName="pr-3"
              startIcon={<Google />}
              size="xxl"
              onPress={() => console.log("google")}
            />
          </View>
          <View className="flex-row justify-center pt-[50px]">
            <Text className="text-labellarge font-normal text-dark">
              Don’t have an account?
            </Text>
            <Pressable onPress={() => router.push("/(auth)")}>
              <Text className="text-labellarge font-semibold text-secondary-400">
                {" "}
                Log in
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
