import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  label1: string;
  label2: string;
  value: "Expense" | "Income";
  onChange: (next: "Expense" | "Income") => void;
};

const ExpenseIncomeToggle = ({ label1, label2, value, onChange }: Props) => {
  const options: { label: string; value: "Expense" | "Income" }[] = useMemo(
    () => [
      { label: label1, value: "Expense" },
      { label: label2, value: "Income" },
    ],
    [label1, label2]
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const [segmentWidth, setSegmentWidth] = useState(0);

  // Measure total width → each segment = width / 2
  const handleLayout = (e: LayoutChangeEvent) => {
    const totalWidth = e.nativeEvent.layout.width;
    setSegmentWidth(totalWidth / 2);
  };

  // Animate whenever value (Expense / Income) changes
  useEffect(() => {
    if (!segmentWidth) return;

    const toValue = value === "Expense" ? 0 : segmentWidth;

    Animated.timing(translateX, {
      toValue,
      duration: 200,
      useNativeDriver: true, // only translating X
    }).start();
  }, [value, segmentWidth, translateX]);

  return (
    <View
      onLayout={handleLayout}
      className="flex-row rounded-full p-1  relative"
    >
      {/* 🔥 Single sliding background pill */}
      {segmentWidth > 0 && (
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 2,
            bottom: 2,
            width: segmentWidth - 4,
            borderRadius: 999,
            transform: [{ translateX }],
            backgroundColor: "#4F46E5",
            paddingHorizontal: 18,
            paddingVertical: 14,
          }}
        />
      )}

      {/* Static labels on top */}
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            className="flex-1 items-center justify-center py-2.5"
          >
            <Text
              className={`text-labelmedium font-medium ${
                isActive ? "text-light" : "text-subtext"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ExpenseIncomeToggle;
