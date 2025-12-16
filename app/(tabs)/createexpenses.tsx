import CustomBottomSheet, {
  CustomBottomSheetRef,
} from "@/src/components/General-Components/CustomBottomSheet";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef } from "react";
import { Text, View } from "react-native";

const Createexpenses = () => {
  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);

  useFocusEffect(
    useCallback(() => {
      // Small delay to ensure ref is ready
      const timer = setTimeout(() => {
        bottomSheetRef.current?.open();
      }, 100);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <CustomBottomSheet
      ref={bottomSheetRef}
      title="Create New Activity"
      snapPoints={["25%"]}
    ></CustomBottomSheet>
  );
};

export default Createexpenses;
