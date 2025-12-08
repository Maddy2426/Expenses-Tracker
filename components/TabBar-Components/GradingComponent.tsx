// components/GradingComponent.tsx

import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, View } from "react-native";

export default function GradientScreenBackground({
  children,
  gradientHeight = 1500, // or Dimensions.get("screen").height
}: {
  children: React.ReactNode;
  gradientHeight?: number;
}) {
  const OS = Platform.OS;
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[
          "#A5A6F6", // 0%
          "#FAFCFE", // 3%
          "rgba(239,239,253,0.08)", // soften transition
          "rgba(239,239,253,0)", // fade to transparent
        ]}
        locations={
          OS === "ios" ? [0.03, 0.15, 0.3, 0.1] : [0.0, 0.13, 0.2, 0.1]
        } // 0%, 3%, 5%, 10%
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={[
          StyleSheet.absoluteFillObject,
          { height: gradientHeight, zIndex: 0 },
        ]}
        pointerEvents="none"
      />
      <View style={{ flex: 1, zIndex: 1 }}>{children}</View>
    </View>
  );
}
