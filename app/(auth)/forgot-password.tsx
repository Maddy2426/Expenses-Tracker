import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { Back, Logo } from "@/src/assets";
import { router } from "expo-router";
import OtpInput from "@/src/components/authComponents/OtpInput";
import Button from "@/src/components/General-Components/Button";
import clsx from "clsx";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPassword = () => {
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [error, setError] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("local_user");
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (parsed?.email) setUserEmail(parsed.email);
    })();
  }, []);

  // ✅ start countdown automatically
  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const timerText = `00:${String(seconds).padStart(2, "0")}`;

  const handleOtpChange = (val: string) => {
    setOtp(val);
    if (error) setError(false); // optional: clear error while typing
  };

  const handleVerify = () => {
    // demo logic (change to your real verify)
    if (otp === "1234") {
      router.push("/(auth)/reset-password");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleResendCode = async () => {
    if (seconds > 0) return; // block until timer ends

    // ✅ call your resend API here
    // await resendOtpApi();

    setSeconds(30); // restart timer
  };

  return (
    <View className="flex-1 p-6">
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
            Please check your email
          </Text>
        </View>

        <View className="flex-row flex-wrap items-center pt-4">
          <Text className="text-titlemedium font-normal text-subtext ">
            We’ve sent a code to{" "}
          </Text>

          <Text className="text-titlemedium font-semibold text-dark  flex-shrink">
            {userEmail}
          </Text>
        </View>
      </View>

      <View className="gap-10 mt-10">
        <OtpInput value={otp} onChange={handleOtpChange} error={error} />

        <Button
          label="Verify"
          onPress={handleVerify}
          className="rounded-xl"
          size="xl"
        />

        {/* ✅ Resend */}
        <View className="flex-row items-center justify-center">
          <Pressable onPress={handleResendCode} disabled={seconds > 0}>
            <Text
              className={clsx(
                "text-titlemedium font-semibold",
                seconds > 0 ? "text-dark" : "text-secondary-400"
              )}
            >
              {seconds > 0 ? "Send code again" : "Resend code"}
            </Text>
          </Pressable>

          {seconds > 0 ? (
            <Text className="text-titlemedium font-semibold text-dark">
              {"  "}
              {timerText}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;
