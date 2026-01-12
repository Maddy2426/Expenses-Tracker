import { View, Text } from "react-native";
import React from "react";
import { GreenCalendar, GreenClock, RedCalendar, RedClock } from "@/src/assets";

const DateandTime = ({
  typeParam,
  todate,
  time,
}: {
  typeParam: string;
  todate: Date;
  time: Date;
}) => {
  return (
    <View
      className={`flex-row items-center gap-3 rounded-lg  px-4 py-3 ${
        typeParam === "expense" ? "bg-warning-100" : "bg-success-100"
      }`}
    >
      {typeParam === "expense" ? (
        <RedCalendar width={20} height={20} />
      ) : (
        <GreenCalendar width={20} height={20} />
      )}
      <Text
        className={`text-labellarge ${
          typeParam === "expense" ? "text-warning-400" : "text-success-400"
        }`}
      >
        {todate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>
      {typeParam === "expense" ? (
        <RedClock width={20} height={20} />
      ) : (
        <GreenClock width={20} height={20} />
      )}
      <Text
        className={`text-labellarge ${
          typeParam === "expense" ? "text-warning-400" : "text-success-400"
        }`}
      >
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </View>
  );
};

export default DateandTime;
