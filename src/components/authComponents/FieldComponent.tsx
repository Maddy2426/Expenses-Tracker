import React, { useMemo, useState } from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Eye, EyeOff, Home } from "@/src/assets";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;

  secureTextEntry?: boolean; // ✅ set true for password
  showPasswordToggle?: boolean; // ✅ show eye icon
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export default function RHFTextInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry,
  showPasswordToggle = false,
  keyboardType = "default",
  autoCapitalize = "none",
}: Props<T>) {
  const canToggle = !!secureTextEntry && showPasswordToggle;
  const [hidden, setHidden] = useState(!!secureTextEntry);

  // if secureTextEntry is false, never hide
  const finalSecure = useMemo(
    () => (canToggle ? hidden : !!secureTextEntry),
    [canToggle, hidden, secureTextEntry]
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.wrapper}>
          {label ? (
            <Text className="text-titlesmall font-normal text-dark pb-1.5">
              {label}
            </Text>
          ) : null}

          <View className="border border-[#D8DADC] rounded-[10px] py-3 px-[18px] flex-row items-center justify-between">
            <TextInput
              value={(value ?? "") as string}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={finalSecure}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              className="flex-1 text-titlesmall font-normal text-dark "
            />

            {canToggle ? (
              <Pressable
                onPress={() => setHidden((p) => !p)}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={hidden ? "Show password" : "Hide password"}
                className="pr-3"
              >
                {hidden ? (
                  <Eye width={15} height={15} />
                ) : (
                  <EyeOff width={15} height={15} />
                )}
              </Pressable>
            ) : null}
          </View>

          {error?.message ? (
            <Text className="text-labellarge font-normal text-danger-400">
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { marginBottom: 6, fontSize: 13, fontWeight: "600" },

  inputRow: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  iconBtn: {
    paddingLeft: 10,
    paddingVertical: 10,
  },

  inputError: { borderColor: "red" },
  // errorText: { marginTop: 6, color: "red", fontSize: 12 },
});
