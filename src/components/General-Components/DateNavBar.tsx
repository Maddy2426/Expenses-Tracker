import { ArrowLeft, ArrowRight, Back, GreenCalendar } from "@/src/assets";
import React, { useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CustomDatePickerModal from "./CustomDatePickerModal";

type Props = {
  value: Date;
  onChange: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  // Optional: step in days (default 1)
  stepDays?: number;
};

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const isBefore = (a: Date, b: Date) => a.getTime() < b.getTime();
const isAfter = (a: Date, b: Date) => a.getTime() > b.getTime();

const clampToRange = (d: Date, min?: Date, max?: Date) => {
  if (min && isBefore(d, min)) return min;
  if (max && isAfter(d, max)) return max;
  return d;
};

const formatLong = (d: Date) =>
  d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const DateNavBar: React.FC<Props> = ({
  value,
  onChange,
  minDate,
  maxDate,
  stepDays = 1,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const canGoPrev = useMemo(() => {
    if (!minDate) return true;
    const prev = addDays(value, -stepDays);
    return !isBefore(prev, minDate);
  }, [value, minDate, stepDays]);

  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    const next = addDays(value, stepDays);
    return !isAfter(next, maxDate);
  }, [value, maxDate, stepDays]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    const next = clampToRange(addDays(value, -stepDays), minDate, maxDate);
    onChange(next);
  }, [value, canGoPrev, minDate, maxDate, onChange, stepDays]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    const next = clampToRange(addDays(value, stepDays), minDate, maxDate);
    onChange(next);
  }, [value, canGoNext, minDate, maxDate, onChange, stepDays]);
  console.log("valueeeeee", formatLong(value));

  return (
    <>
      <View className="w-full px-4">
        <View className="flex-row items-center justify-between rounded-full bg-transparent px-4  border border-grey_100">
          {/* Prev */}
          <TouchableOpacity
            onPress={goPrev}
            disabled={!canGoPrev}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="pr-2"
          >
            <ArrowLeft width={15} height={15} />
          </TouchableOpacity>

          {/* Center (calendar + date) */}
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            className="flex-1 flex-row items-center justify-center py-3"
          >
            <GreenCalendar width={14} height={14} />
            <Text
              className="text-dark font-medium ml-2"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {formatLong(value)}
            </Text>
          </TouchableOpacity>

          {/* Next */}
          <TouchableOpacity
            onPress={goNext}
            disabled={!canGoNext}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="pl-2"
          >
            <ArrowRight width={15} height={15} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal Date Picker */}
      <CustomDatePickerModal
        isModalVisible={showPicker}
        handleCancel={() => setShowPicker(false)}
        handleConfirm={() => setShowPicker(false)}
        onDateSelect={(d) => onChange(clampToRange(d, minDate, maxDate))}
        initialDate={value}
      />
    </>
  );
};
export default DateNavBar;
