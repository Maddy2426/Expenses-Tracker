// NumberRoller.tsx
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type NumberRollerProps = {
  value: number | string;
  autoStart?: boolean;
  duration?: number; // total animation duration in ms
};

export const NumberRoller: React.FC<NumberRollerProps> = ({
  value,
  autoStart = true,
  duration = 2000, // 2 seconds default
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const targetValue = Number(value);

  useEffect(() => {
    if (!autoStart || targetValue === 0) {
      setCurrentValue(targetValue);
      return;
    }

    setCurrentValue(0);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);

      const newValue = Math.floor(
        startValue + (targetValue - startValue) * eased
      );
      setCurrentValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [targetValue, autoStart, duration]);

  return (
    <View style={styles.container}>
      {(() => {
        const hasFraction = targetValue % 1 !== 0;
        const formatted = currentValue.toLocaleString(undefined, {
          minimumFractionDigits: hasFraction ? 2 : 0,
          maximumFractionDigits: hasFraction ? 2 : 0,
        });
        const [intPart, decPart] = formatted.split(".");

        return (
          <Text className="text-displaymedium font-normal">
            {"₹"} {intPart}
            {decPart ? <Text className="text-subtext">.{decPart}</Text> : null}
          </Text>
        );
      })()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
