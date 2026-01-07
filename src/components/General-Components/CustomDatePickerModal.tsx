import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Close } from "@/src/assets";

const CustomDatePickerModal = ({
  isModalVisible,
  handleCancel,
  handleConfirm,
  onDateSelect,
  initialDate,
  minDate: minDateProp,
  maxDate: maxDateProp,
}: {
  isModalVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  onDateSelect?: (date: Date) => void;
  initialDate?: Date;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const minDate = useMemo(() => {
    if (minDateProp) return minDateProp;
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    return d;
  }, [minDateProp]);

  const maxDate = useMemo(() => {
    if (maxDateProp) return maxDateProp;
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d;
  }, [maxDateProp]);

  const navComponents = useMemo(
    () => ({
      IconPrev: (
        <View className=" rounded-sm px-2 items-center justify-start">
          <Text style={{ fontSize: 18, color: "#4B4DED", paddingBottom: 2 }}>
            ‹
          </Text>
        </View>
      ),
      IconNext: (
        <View className=" rounded-sm px-2 items-center justify-start">
          <Text style={{ fontSize: 18, color: "#4B4DED", paddingBottom: 2 }}>
            ›
          </Text>
        </View>
      ),
    }),
    []
  );

  const pickerStyles = useMemo(
    () => ({
      selected: {
        // backgroundColor: "primary-400",
        borderRadius: 108,
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
      } as ViewStyle,
      selected_label: { color: "#4B4DED", fontWeight: "bold" } as TextStyle,
      today: {
        borderWidth: 1,
        borderColor: "#5C5C77",
        borderRadius: 108,
      } as ViewStyle,
      today_label: { color: "#5C5C77", fontWeight: "bold" } as TextStyle,
      days: {
        borderTopWidth: 1,
        borderTopColor: "tertiary100",
        paddingTop: 5,
        marginTop: 5,
      } as ViewStyle,
      day: {
        marginHorizontal: 7,
        marginVertical: 6,
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",
      } as ViewStyle,
    }),
    []
  );

  const handleConfirmPress = useCallback(() => {
    if (onDateSelect && selectedDate) onDateSelect(selectedDate);
    handleConfirm();
  }, [onDateSelect, selectedDate, handleConfirm]);

  return (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-4 m-4 w-[90%] max-w-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-primary font-bold text-lg">Select Date</Text>
            <TouchableOpacity onPress={handleCancel}>
              <Close />
            </TouchableOpacity>
          </View>

          <DateTimePicker
            mode="single"
            date={selectedDate}
            onChange={({ date }) => {
              if (date) setSelectedDate(date as Date);
            }}
            minDate={minDate}
            maxDate={maxDate}
            navigationPosition="around"
            hideHeader={false}
            showOutsideDays={false}
            disableMonthPicker={false}
            disableYearPicker={false}
            components={navComponents}
            styles={pickerStyles}
          />

          <View className="flex-row justify-end gap-3 mt-4">
            <TouchableOpacity
              onPress={handleCancel}
              className="px-4 py-2 rounded-lg border border-gray-300"
            >
              <Text className="text-primary">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleConfirmPress}
              className="px-4 py-2 rounded-lg bg-secondary-400"
              disabled={!selectedDate}
            >
              <Text className="text-white font-semibold">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(CustomDatePickerModal);
