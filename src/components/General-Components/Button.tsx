import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import clsx from "clsx";

interface ButtonProps {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;

  // Primary UI
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";

  // Icons
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  // Layout
  fullWidth?: boolean;
  rounded?: string;

  // Text
  textColor?: string;

  className?: string;
  startIconClassName?: string;
  endIconClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "md",
  startIcon,
  endIcon,
  fullWidth = false,
  rounded = "rounded-full",
  textColor,
  className,
  startIconClassName,
  endIconClassName,
}) => {
  // ----------------------------------------
  // VARIANT STYLES
  // ----------------------------------------
  const variantStyle =
    {
      primary: "bg-secondary-400",
      secondary: "bg-light border border-secondary-400",
      outline: "border border-secondary-400",
      danger: "bg-red-600",
    }[variant] || "bg-secondary-400";

  // ----------------------------------------
  // SIZE STYLES (padding)
  // ----------------------------------------
  const sizeStyle =
    {
      xs: "py-2.5 px-3.5",
      sm: "py-3.5 px-4",
      md: "py-4 px-[18px]",
      lg: "py-4 px-5",
      xl: "py-[19px] px-7",
    }[size] || "py-4 px-[18px]";

  // ----------------------------------------
  // TEXT SIZE + COLOR
  // ----------------------------------------
  const finalTextColor =
    textColor ??
    (variant === "secondary" ? "text-secondary-400" : "text-light");

  const textStyle =
    {
      xs: `text-labellarge font-medium ${finalTextColor}`,
      sm: `text-labellarge font-medium ${finalTextColor}`,
      md: `text-titlemedium font-medium ${finalTextColor}`,
      lg: `text-titlemedium font-medium ${finalTextColor}`,
      xl: `text-bodylarge font-medium ${finalTextColor}`,
    }[size] || `text-titlemedium font-medium ${finalTextColor}`;

  const isDisabled = disabled || isLoading;

  // ----------------------------------------
  // RENDER
  // ----------------------------------------
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={clsx(
        "flex-row items-center justify-center",
        variantStyle,
        sizeStyle,
        rounded,
        fullWidth && "w-full",
        isDisabled && "opacity-50",
        className
      )}
    >
      <View className="flex-row items-center justify-center gap-2">
        {/* LEFT ICON (START ICON) */}
        {!isLoading && startIcon && (
          <View className={startIconClassName}>{startIcon}</View>
        )}

        {/* LOADING SPINNER */}
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          label && (
            <Text className={clsx(textStyle, "text-center")}>{label}</Text>
          )
        )}

        {/* RIGHT ICON (END ICON) */}
        {!isLoading && endIcon && (
          <View className={endIconClassName}>{endIcon}</View>
        )}
      </View>
    </Pressable>
  );
};

export default Button;
