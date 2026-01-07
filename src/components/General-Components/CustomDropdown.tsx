import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type DropdownItem = {
  label: string;
  value: string; // keep string for safety (ids)
};

type CustomDropdownProps = {
  label?: string;
  placeholder?: string;
  value: string | null;
  items: DropdownItem[];

  onChange: (value: string, item: DropdownItem) => void;

  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  errorText?: string;

  // Styling hooks
  containerClassName?: string;
  dropdownClassName?: string;
};

export default function CustomDropdown({
  label,
  placeholder = "Select",
  value,
  items,
  onChange,
  searchable = false,
  searchPlaceholder = "Search...",
  disabled = false,
  errorText,
  containerClassName,
  dropdownClassName,
}: CustomDropdownProps) {
  const [isFocus, setIsFocus] = useState(false);

  const selectedLabel = useMemo(() => {
    if (!value) return "";
    return items.find((i) => i.value === value)?.label ?? "";
  }, [items, value]);

  return (
    <View className={containerClassName}>
      {!!label && (
        <Text className="text-subtext text-labelsmall font-medium mb-2">
          {label}
        </Text>
      )}

      <Dropdown
        style={{
          borderWidth: 1,
          borderColor: errorText ? "#EF4444" : isFocus ? "#6366F1" : "#E5E7EB",
          borderRadius: 16,
          paddingHorizontal: 12,
          paddingVertical: 12,
          opacity: disabled ? 0.6 : 1,
        }}
        containerStyle={{
          borderRadius: 16,
          overflow: "hidden",
        }}
        placeholderStyle={{
          color: "#9CA3AF",
          fontSize: 14,
        }}
        selectedTextStyle={{
          color: "#111827",
          fontSize: 14,
        }}
        inputSearchStyle={{
          borderRadius: 12,
          fontSize: 14,
        }}
        data={items}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        value={value}
        disable={disabled}
        search={searchable}
        searchPlaceholder={searchPlaceholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          onChange(item.value, item);
        }}
      />

      {!!selectedLabel && false}

      {!!errorText && (
        <Text className="text-danger-400 text-labelsmall mt-2">
          {errorText}
        </Text>
      )}
    </View>
  );
}
