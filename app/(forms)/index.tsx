import {
  Attachment,
  Back,
  Camera as CameraIcon, // Rename the icon to avoid conflict
  GreenCalendar,
  GreenClock,
  RedCalendar,
  RedClock,
  Trash,
} from "@/src/assets";
import Button from "@/src/components/General-Components/Button";
import CustomDropdown from "@/src/components/General-Components/CustomDropdown";
import DateandTime from "@/src/components/General-Components/DateandTime";
import { useExpensesStore } from "@/src/store/useExpenses";
import { useIncomeStore } from "@/src/store/useIncome";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

const Index = () => {
  const { type: typeParam } = useLocalSearchParams();
  console.log("type", typeParam);
  const [todate, setToDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [image, setImage] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [dateNavBarValue, setDateNavBarValue] = useState(new Date());
  const [tempAmount, setTempAmount] = useState(0);
  const [tempCategory, setTempCategory] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const incomeData = useIncomeStore();
  const expensesData = useExpensesStore();

  console.log("type", typeParam);
  console.log("amount", incomeData.amount);

  console.log("expensesAmount", expensesData.amount);
  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Housing", value: "housing" },
    { label: "Utilities", value: "utilities" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Education", value: "education" },
    { label: "Travel", value: "travel" },
    { label: "Shopping", value: "shopping" },
    { label: "Other", value: "other" },
    { label: "Other", value: "other" },
  ];
  const handleOpenCamera = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Camera permission is required to take photos."
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      setImage(result.assets[0].uri);
      console.log("Image captured:", result.assets[0].uri);
    }
  };

  const handleAddAttachment = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*", // any file
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return null;

    const file = result.assets[0];
    console.log("file", file);
    setImage(file.uri);
    setAttachment(file.name);
    // file: { uri, name, size, mimeType }
    return file;
  };

  return (
    <View className="flex-1 p-6 pt-11">
      <View className="flex-row items-center gap-4 pb-6">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center justify-between gap-2"
        >
          <Back width={40} height={40} />
        </Pressable>
        <Text className="text-titlelarge font-normal text-dark">
          {typeParam === "income" ? "New Income" : "New Expense"}
        </Text>
      </View>
      <View className="items-center ">
        <DateandTime
          typeParam={typeParam as string}
          todate={todate}
          time={time}
        />
      </View>
      <View className="pt-6 flex-1">
        <Text className="text-titlemedium font-medium text-subtext">
          How much ?
        </Text>
        <View className="gap-6">
          <TextInput
            className="text-displaylarge font-medium text-dark"
            placeholder="₹ 0"
            style={{ width: "100%", minHeight: 100 }}
            keyboardType="numeric"
            numberOfLines={1}
            onChangeText={(text) => {
              const numValue = parseFloat(text) || 0; // Default to 0 if NaN
              setTempAmount(numValue);
            }}
          />

          <CustomDropdown
            // label="Category"
            placeholder="Select Category"
            value={tempCategory}
            items={categories}
            onChange={(value) => {
              setTempCategory(value as string);
            }}
            searchable={true}
            searchPlaceholder="Search Category"
          />
          <TextInput
            className="text-bodymedium font-medium text-dark border border-accent rounded-lg px-4 py-3"
            placeholder="Description"
            keyboardType="default"
            multiline={true}
            style={{ width: "100%", minHeight: 100, textAlignVertical: "top" }}
            onChangeText={(text) => {
              setTempDescription(text);
            }}
          />
          <View className="mt-6">
            {!image ? (
              <View className="gap-6">
                <Button
                  label="Add Attachment"
                  onPress={handleAddAttachment}
                  className="w-full rounded-full "
                  variant="outline"
                  textColor="text-secondary-400"
                  startIcon={<Attachment width={16} height={16} />}
                  size="xs"
                />
                <Button
                  label="Open Camera"
                  onPress={handleOpenCamera}
                  className="w-full rounded-full "
                  variant="outline"
                  textColor="text-secondary-400"
                  startIcon={<CameraIcon width={16} height={16} />}
                  size="xs"
                />
              </View>
            ) : (
              <View className="gap-5">
                <Text>1 Attachment file</Text>
                <View className=" flex-row justify-between border-2 border-subtext rounded-full px-2.5 py-4">
                  <View className="flex-row items-center gap-2 px-4">
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#E0E0E0",
                      }}
                    />
                    <Text className="text-bodymedium font-medium text-textcolor text-wrap mr-8">
                      {attachment && attachment.length > 20
                        ? attachment.slice(0, 20) + "..."
                        : "image.jpg"}
                    </Text>
                  </View>
                  <Pressable
                    className="px-2.5"
                    onPress={() => {
                      setImage(null);
                      setAttachment(null);
                    }}
                  >
                    <Trash width={20} height={20} />
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
      <Button
        label={"Record " + (typeParam === "income" ? "Income" : "Expense")}
        onPress={() => {
          if (typeParam === "income") {
            // Use addTransaction to add to the array
            useIncomeStore.getState().addTransaction({
              date: dateNavBarValue,
              type: "income",
              time: time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              amount: tempAmount + incomeData.amount, // Use tempAmount directly, not amount + tempAmount
              category: tempCategory,
              description: tempDescription,
              attachments: image
                ? [image, ...(attachment ? [attachment] : [])]
                : [],
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            console.log("Income Recorded");

            // Reset form fields
            useIncomeStore.setState({
              category: "",
              description: "",
              attachments: [],
              amount: 0,
            });
            setTempAmount(0);
            setImage(null);
            setAttachment(null);

            router.back();
          } else {
            // Use addTransaction to add to the array
            useExpensesStore.getState().addTransaction({
              date: dateNavBarValue,
              type: "expense",
              time: time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              amount: tempAmount + expensesData.amount, // Use tempAmount directly, not expensesAmount + tempAmount
              category: tempCategory,
              description: tempDescription,
              attachments: image
                ? [image, ...(attachment ? [attachment] : [])]
                : [],
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            console.log("Expenses Recorded");

            // Reset form fields
            useExpensesStore.setState({
              category: "",
              description: "",
              attachments: [],
              amount: 0,
            });
            setTempAmount(0);
            setImage(null);
            setAttachment(null);

            router.back();
          }
        }}
        className="w-full rounded-full "
        variant="primary"
      />
    </View>
  );
};

export default Index;
