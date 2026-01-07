import CustomBottomSheet, {
  CustomBottomSheetRef,
} from "@/src/components/General-Components/CustomBottomSheet";
import { router, useFocusEffect, usePathname } from "expo-router";
import React, { useCallback, useRef } from "react";

const Createexpenses = () => {
  const path = usePathname();
  console.log(path);
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
      onRightButtonPress={() => {
        router.push({ pathname: "(forms)", params: { type: "income" } } as any);
      }}
      onLeftButtonPress={() => {
        router.push({
          pathname: "(forms)",
          params: { type: "expense" },
        } as any);
      }}
    ></CustomBottomSheet>
  );
};

export default Createexpenses;
