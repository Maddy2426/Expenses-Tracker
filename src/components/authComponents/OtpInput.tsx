import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";

type Props = {
  value: string;
  onChange: (val: string) => void;

  length?: number; // default 4
  autoFocus?: boolean;

  error?: boolean; // ✅ if set -> red + shake
  onComplete?: (otp: string) => void;
};

export default function OtpInput({
  value,
  onChange,
  length = 4,
  autoFocus = true,
  error,
  onComplete,
}: Props) {
  const inputRef = useRef<TextInput>(null);

  // per-box pop animation
  const scales = useMemo(
    () => Array.from({ length }, () => new Animated.Value(1)),
    [length]
  );

  // whole-row shake animation
  const shakeX = useRef(new Animated.Value(0)).current;

  const digits = (value ?? "").replace(/\D/g, "").slice(0, length);

  const focus = () => inputRef.current?.focus();

  const shake = () => {
    shakeX.setValue(0);
    Animated.sequence([
      Animated.timing(shakeX, {
        toValue: 10,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: -10,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: -8,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(shakeX, {
        toValue: 0,
        duration: 45,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // ✅ Auto focus
  useEffect(() => {
    if (!autoFocus) return;
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [autoFocus]);

  // ✅ Pop when digit added + call onComplete
  useEffect(() => {
    const idx = digits.length - 1;
    if (idx >= 0 && idx < length) {
      Animated.sequence([
        Animated.timing(scales[idx], {
          toValue: 1.12,
          duration: 90,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scales[idx], {
          toValue: 1,
          duration: 90,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (digits.length === length) onComplete?.(digits);
  }, [digits.length, length, onComplete, scales, digits]);

  // ✅ Shake automatically when error appears/changes
  useEffect(() => {
    if (error) shake();
  }, [error]);

  const handleChangeText = (text: string) => {
    const clean = text.replace(/\D/g, "");
    onChange(clean.slice(0, length)); // supports paste
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === "Backspace" && digits.length > 0) {
      onChange(digits.slice(0, -1));
    }
  };

  return (
    <View>
      {/* Hidden input */}
      <TextInput
        ref={inputRef}
        value={digits}
        onChangeText={handleChangeText}
        onKeyPress={handleKeyPress}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />

      <Pressable onPress={focus}>
        <Animated.View
          style={[styles.row, { transform: [{ translateX: shakeX }] }]}
        >
          {Array.from({ length }).map((_, i) => {
            const char = digits[i] ?? "";
            const isActive =
              digits.length === i ||
              (digits.length === length && i === length - 1);

            return (
              <Animated.View
                key={i}
                style={[
                  styles.box,
                  isActive ? styles.boxActive : null,
                  error ? styles.boxError : null, // ✅ red borders
                  { transform: [{ scale: scales[i] }] },
                ]}
              >
                <Text className="text-headlinelarge font-medium text-dark">
                  {char}
                </Text>
              </Animated.View>
            );
          })}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenInput: { position: "absolute", opacity: 0, height: 1, width: 1 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 12,
  },

  box: {
    flex: 1,
    height: 77,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D8DADC",
  },
  boxActive: { borderColor: "#000" },

  boxError: { borderColor: "red" }, // ✅ red for all boxes when error

  digit: { fontSize: 20, fontWeight: "700" },
});
