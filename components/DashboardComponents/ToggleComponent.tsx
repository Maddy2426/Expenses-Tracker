import { useMemo } from "react";
import { Pressable, Text, View } from "react-native";

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

  return (
    <View className="flex-row  rounded-full py-3 px-6">
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option?.value)}
            className={`flex-1 rounded-full py-3.5 px-4 items-center ${
              isActive ? "bg-secondary-400" : ""
            }`}
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
