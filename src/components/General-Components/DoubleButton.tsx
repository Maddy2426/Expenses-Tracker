import clsx from "clsx";
import React from "react";
import { View } from "react-native";
import Button from "./Button";

interface DoubleButtonProps {
  rightButtonPress?: () => void;
  LeftButtonPress?: () => void;
  rightButtonVariant?: "primary" | "secondary" | "outline" | "danger";
  leftButtonVariant?: "primary" | "secondary" | "outline" | "danger";
  rightButtonClassName?: string;
  leftButtonClassName?: string;
  rightButtonTextColor?: string;
  leftButtonTextColor?: string;
  rightButtonLabel?: string;
  leftButtonLabel?: string;
  rightButtonIcon?: React.ReactNode;
  leftButtonIcon?: React.ReactNode;
  rightButtonIconClassName?: string;
  leftButtonIconClassName?: string;
  rightButtonIconDirection?: "left" | "right";
  leftButtonIconDirection?: "left" | "right";
}

const DoubleButton = ({
  rightButtonPress,
  LeftButtonPress,
  rightButtonVariant,
  leftButtonVariant,
  rightButtonClassName,
  leftButtonClassName,
  rightButtonTextColor,
  leftButtonTextColor,
  rightButtonLabel,
  leftButtonLabel,
  rightButtonIcon,
  leftButtonIcon,
  rightButtonIconClassName,
  leftButtonIconClassName,
  rightButtonIconDirection,
  leftButtonIconDirection,
}: DoubleButtonProps) => {
  return (
    <View className="flex-row gap-2">
      <Button
        label={rightButtonLabel}
        variant={rightButtonVariant}
        textColor={rightButtonTextColor}
        className={clsx(
          rightButtonClassName,
          "rounded-2xl border-success-400 border-b-4"
        )}
        startIcon={rightButtonIconDirection === "left" ? rightButtonIcon : null}
        endIcon={rightButtonIconDirection === "right" ? rightButtonIcon : null}
        startIconClassName={clsx(
          rightButtonIconClassName,
          "bg-success-400 p-2 rounded-lg"
        )}
        onPress={rightButtonPress}
      />
      <Button
        label={leftButtonLabel}
        variant={leftButtonVariant}
        textColor={leftButtonTextColor}
        className={clsx(
          leftButtonClassName,
          "rounded-2xl border-warning-400 border-b-4"
        )}
        startIcon={leftButtonIconDirection === "left" ? leftButtonIcon : null}
        endIcon={leftButtonIconDirection === "right" ? leftButtonIcon : null}
        startIconClassName={clsx(
          leftButtonIconClassName,
          "bg-danger-400 p-2 rounded-lg"
        )}
        onPress={LeftButtonPress}
      />
    </View>
  );
};

export default DoubleButton;
