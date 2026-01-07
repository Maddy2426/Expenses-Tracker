import { Facebook, Google, Logo } from "@/src/assets";
import FieldComponent from "@/src/components/authComponents/FieldComponent";
import Button from "@/src/components/General-Components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import { useBiometricPrefStore } from "@/src/store/appLock.store";

const loginSchema = {
  email: "",
  password: "",
};

const Login = () => {
  const loginLocal = useLocalAuthStore((s) => s.loginLocal);
  const biometricLogin = useLocalAuthStore((s) => s.biometricLogin);
  const hasLocalAccount = useLocalAuthStore((s) => s.hasLocalAccount);

  const initBio = useBiometricPrefStore((s) => s.init);
  const biometricEnabled = useBiometricPrefStore((s) => s.biometricEnabled);

  const [autoPrompted, setAutoPrompted] = useState(false);

  const { control, handleSubmit } = useForm<typeof loginSchema>({
    defaultValues: loginSchema,
  });

  useEffect(() => {
    initBio(); // load biometricEnabled from AsyncStorage
  }, [initBio]);

  useEffect(() => {
    (async () => {
      if (autoPrompted) return;
      if (!biometricEnabled) return;

      const exists = await hasLocalAccount();
      if (!exists) return;

      setAutoPrompted(true);

      const ok = await biometricLogin();
      if (ok) router.replace("/(tabs)");
    })();
  }, [biometricEnabled, autoPrompted, biometricLogin, hasLocalAccount]);

  const onSubmit = async (data: typeof loginSchema) => {
    const ok = await loginLocal({ email: data.email, password: data.password });
    // if (ok) {
    //   router.replace("/(tabs)");
    // } else {
    //   Alert.alert("Invalid email or password");
    // }
    router.replace("/(tabs)");

    console.log("ok", ok);
  };

  const forgotPassword = async () => {
    const raw = await AsyncStorage.getItem("local_user");
    if (raw) {
      router.push("/(auth)/forgot-password");
    } else {
      Alert.alert("No account found");
    }
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
          <Pressable className="items-end" onPress={forgotPassword}>
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
          <View className=" flex-row justify-center pt-24 ">
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
              className="border-subtext bg-light"
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
          <View className="flex-row justify-center pt-[50px] ">
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
