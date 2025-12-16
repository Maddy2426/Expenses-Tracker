import { Expense, Income } from "@/src/assets";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";
import { Text, View } from "react-native";
import DoubleButton from "./DoubleButton";

export interface CustomBottomSheetRef {
  open: () => void;
  close: () => void;
}

interface CustomBottomSheetProps {
  title?: string;
  children?: React.ReactNode;

  snapPoints?: (string | number)[];
  enableBackdropClose?: boolean;

  backgroundColor?: string;
  handleColor?: string;
  borderRadius?: number;
  titleClassName?: string;
}

const CustomBottomSheet = forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>(
  (
    {
      title,
      children,
      snapPoints = ["25%", "50%", "85%"],
      enableBackdropClose = true,
      backgroundColor = "white",
      handleColor = "#d1d5db",
      borderRadius = 50,
      titleClassName = "text-titlelarge font-normal text-center text-dark mt-5 mb-6",
    },
    ref
  ) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    // Expose open() and close() methods to parent
    React.useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
    }));

    // Backdrop animation
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={enableBackdropClose ? "close" : "none"}
        />
      ),
      [enableBackdropClose]
    );

    // Custom handle style
    // const handleStyle: ViewStyle = {
    //   backgroundColor: handleColor,
    //   width: 40,
    //   height: 5,
    //   borderRadius: 10,
    //   alignSelf: "center",
    //   marginVertical: 8,
    // };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        backgroundStyle={{
          backgroundColor,
          borderRadius,
        }}
      >
        {/* <View style={handleStyle} /> */}

        {/* Title */}
        {title && <Text className={titleClassName}>{title}</Text>}

        {/* Content */}
        <BottomSheetView style={{ paddingHorizontal: 20 }}>
          {children}
        </BottomSheetView>
        <View className="flex-1 justify-end items-center mb-[30px]">
          <DoubleButton
            leftButtonVariant="secondary"
            rightButtonVariant="secondary"
            rightButtonLabel="New Income"
            leftButtonLabel="New Expense"
            rightButtonIcon={<Income width={14} height={14} />}
            leftButtonIcon={<Expense width={14} height={14} />}
            rightButtonIconDirection="left"
            leftButtonIconDirection="left"
            rightButtonTextColor="text-success-400"
            leftButtonTextColor="text-danger-400"
            rightButtonClassName="rounded-[16px] border-success-400 border-b-4"
            leftButtonClassName="rounded-[16px] border-danger-400 border-b-4"
            rightButtonPress={() => {
              console.log("New Income");
            }}
            LeftButtonPress={() => {
              console.log("New Expense");
            }}
          />
        </View>
      </BottomSheet>
    );
  }
);

CustomBottomSheet.displayName = "CustomBottomSheet";

export default CustomBottomSheet;
