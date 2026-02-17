import {
  ArrowRightWithTail,
  Budget,
  Expense,
  ExpensesEmptyData,
  Home,
  Income,
  IncomeEmptyData,
  Transaction,
  User,
} from "@/src/assets";
import { NumberRoller } from "@/src/components/DashboardComponents/NumberRoller";
import Button from "@/src/components/General-Components/Button";
import Cards from "@/src/components/General-Components/Cards";
import ExpenseIncomeToggle from "@/src/components/General-Components/ToggleComponent";
import { useBiometricPrefStore } from "@/src/store/appLock.store";
import { useLocalAuthStore } from "@/src/store/localAuth.store";
import { useCounterStore } from "@/src/store/useCounterStore";
import { useIncomeStore } from "@/src/store/useIncome";

import { useExpensesStore } from "@/src/store/useExpenses";
import {
  scheduleAfterSeconds,
  scheduleDaily,
} from "@/src/utils/scheduleNotifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";

const Categories = ({
  label,
  amount,
  icon,
}: {
  label: string;
  amount: number;
  icon: React.ReactNode;
}) => {
  return (
    <View className="gap-2 bg-accent p-3 w-40 rounded-3xl h-32 ">
      {icon}
      <Text className="text-textcolor text-bodymedium font-normal pr-3">
        {label}
      </Text>
      <Text className="text-dark text-titlemedium font-normal pr-3">
        {"₹"}
        {amount}
      </Text>
    </View>
  );
};

const SourceOfFunds = ({
  source,
  icon,
  amount,
}: {
  source: string;
  icon: React.ReactNode;
  amount: number;
}) => {
  return (
    <View>
      <View
        className={`flex-row items-center gap-2.5 px-5  py-3 rounded-[20px] ${source === "Income" ? "bg-success-100" : "bg-danger-100"
          } `}
      >
        <View
          className={`${source === "Income" ? "bg-success-400" : "bg-danger-400"
            } p-2 rounded-lg`}
        >
          {icon}
        </View>
        <View className="flex-col">
          <Text className="text-textcolor text-labelsmall font-normal">
            {source}
          </Text>
          <Text
            className={`text-titlesmall font-normal pr-14 ${source === "Income" ? "text-success-400" : "text-danger-400"
              }`}
          >
            {"₹"}
            {amount}
          </Text>
        </View>
      </View>
      <Text className="text-subtext text-labelsmall font-medium self-center pt-2">
        24 % last month
      </Text>
    </View>
  );
};

export default function HomeScreen() {
  const [switchValue, setSwitchValue] = useState<"Expense" | "Income">(
    "Expense"
  );
  const handleSwitchChange = (value: "Expense" | "Income") => {
    setSwitchValue(value);
  };
  const { isLoggedIn } = useLocalAuthStore();
  const { biometricEnabled, askedOnce, init, enableBiometric, markAsked } =
    useBiometricPrefStore();
  const [show, setShow] = useState(false);
  console.log("biometricEnabled", biometricEnabled);
  console.log("askedOnce", askedOnce);
  console.log("isLoggedIn", isLoggedIn);
  console.log("show", show);

  const incomeData = useIncomeStore();

  const expensesData = useExpensesStore();
  console.log(
    "date-----------",
    incomeData.transactions,
    expensesData.transactions
  );

  useEffect(() => {
    (async () => {
      await init(); // load askedOnce + biometricEnabled from AsyncStorage
    })();
  }, []);

  useEffect(() => {
    // ✅ only after login + only once + only if not enabled
    if (isLoggedIn && !biometricEnabled && !askedOnce) {
      setShow(true);
    }
  }, [isLoggedIn, biometricEnabled, askedOnce]);

  const onEnable = async () => {
    const ok = await enableBiometric();
    setShow(false);

    if (!ok) {
      Alert.alert(
        "Biometric not enabled",
        "Either you cancelled, or FaceID/Fingerprint is not set up on your phone."
      );
    }
  };

  // dummy data
  const categories = [
    { label: "Food", amount: 1000, icon: <Home width={24} height={24} /> },
    { label: "Transport", amount: 1000, icon: <User width={24} height={24} /> },
    {
      label: "Entertainment",
      amount: 1000,
      icon: <Budget width={24} height={24} />,
    },
    {
      label: "Shopping",
      amount: 1000,
      icon: <Transaction width={24} height={24} />,
    },
    {
      label: "Other",
      amount: 1000,
      icon: <ArrowRightWithTail width={24} height={24} />,
    },
  ];

  const isDateToday = (date: Date | string | undefined): boolean => {
    if (!date) return false;
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return false; // Invalid date

    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  };

  // Filter to show only today's transactions
  const cardsFilter =
    switchValue === "Expense"
      ? expensesData.transactions
      : incomeData.transactions;
  const onNotNow = async () => {
    await markAsked(); // ✅ so it won’t ask again
    setShow(false);
  };
  const todaycardsFilter =
    switchValue === "Expense"
      ? expensesData.transactions?.filter((transaction) =>
        isDateToday(transaction.date)
      )
      : incomeData.transactions?.filter((transaction) =>
        isDateToday(transaction.date)
      );
  console.log("todaycardsFilter", todaycardsFilter);
  const now = new Date();
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const decrease = useCounterStore((state) => state.decrease);
  const reset = useCounterStore((state) => state.reset);

  useEffect(() => {
    // Schedule daily notification when component mounts
    scheduleDaily().catch(console.error);
  }, []);

  return (
    <View className="flex-1 p-6 ">
      <View className="flex-row items-center gap-3 pb-2">
        <Text className="text-headlinesmall font-bold px-2.5 py-[9px] bg-secondary-400 rounded-tl-3xl rounded-lg text-light">
          JP
        </Text>
        <View className="flex-col">
          <Text className="text-headlinesmall font-bold text-dark">
            Jessi Pinkman
          </Text>
          <Text className="text-subtext text-labelmedium font-medium">
            {now.toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
              weekday: "long",
            })}
          </Text>
        </View>
      </View>
      <FlashList
        data={todaycardsFilter}
        renderItem={({ item, index }) => (
          <Cards
            title={item.category || ""}
            subtitle={item.time || ""}
            icon={<></>}
            amount={item.amount}
            type={switchValue}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-6" />}
        ListEmptyComponent={
          switchValue === "Expense" ? (
            <View className="flex-1 items-center justify-center pt-10">
              <ExpensesEmptyData width={200} height={200} />
            </View>
          ) : (
            <View className="flex-1 items-center justify-center pt-10 ">
              <IncomeEmptyData width={200} height={200} />
            </View>
          )
        }
        ListHeaderComponent={
          <>
            <View className="pt-5 px-16 gap-4 ">
              {/* <Text className="self-center pt-4 text-displaymedium font-normal text-dark">
                {outstandingBudget.toFixed(2)}
              </Text> */}
              <Pressable onPress={() => scheduleAfterSeconds()}>
                <Text>Schedule Notification</Text>
              </Pressable>
              <View className="flex-row justify-center items-center ">
                <NumberRoller value={1346.22} />
              </View>

              <Text className="text-titlesmall font-normal text-subtext self-center">
                Outstanding Budget
              </Text>
            </View>
            <View className="flex-row justify-between gap-2 pt-6">
              <SourceOfFunds
                source="Income"
                icon={<Income width={24} height={24} />}
                amount={incomeData.getTotalAmount()}
              />
              <SourceOfFunds
                source="Expense"
                icon={<Expense width={24} height={24} />}
                amount={expensesData.getTotalAmount()}
              />
            </View>
            <View className="flex-row justify-between items-center pt-6">
              <Text className="text-dark text-titlelarge font-normal">
                Categories
              </Text>
              <Button
                onPress={() => {
                  router.push("/categories");
                }}
                variant="primary"
                size="sm"
                startIcon={<ArrowRightWithTail width={14} height={14} />}
                className="w-10 h-10 rounded-full"
              />
            </View>
            <View className="pt-6 flex-1">
              <FlashList
                data={categories}
                renderItem={({ item }) => (
                  <Categories
                    label={item.label}
                    amount={item.amount}
                    icon={item.icon}
                  />
                )}
                keyExtractor={(item) => item.label}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-4" />}
                scrollEnabled={true}
              />
            </View>
            <View className="py-6">
              <Text className="font-normal text-titlelarge text-dark">
                Today Activity
              </Text>
            </View>
            <View className="px-16">
              <ExpenseIncomeToggle
                label1="Expense"
                label2="Income"
                value={switchValue}
                onChange={handleSwitchChange}
              />
            </View>
            <View className="flex-row justify-between items-center py-6">
              <Text className="text-subtext text-titlelarge font-normal">
                {switchValue === "Expense" ? "Spending" : "Received"}
              </Text>
              <Text
                className={`${switchValue === "Expense"
                  ? "text-danger-400"
                  : "text-success-400"
                  } font-normal text-titlelarge`}
              >
                {"₹"}{" "}
                {(() => {
                  const today = new Date();

                  // Helper function to safely convert date and check if it's today
                  const isDateToday = (
                    date: Date | string | undefined
                  ): boolean => {
                    if (!date) return false;
                    const dateObj =
                      date instanceof Date ? date : new Date(date);
                    if (isNaN(dateObj.getTime())) return false; // Invalid date

                    return (
                      dateObj.getDate() === today.getDate() &&
                      dateObj.getMonth() === today.getMonth() &&
                      dateObj.getFullYear() === today.getFullYear()
                    );
                  };

                  if (switchValue === "Expense") {
                    // Sum all amounts from today's expense transactions
                    const todayExpenses =
                      expensesData.transactions?.filter((transaction) =>
                        isDateToday(transaction.date)
                      ) || [];
                    return todayExpenses.reduce(
                      (sum, transaction) => sum + transaction.amount,
                      0
                    );
                  } else {
                    // Sum all amounts from today's income transactions
                    const todayIncome =
                      incomeData.transactions?.filter((transaction) =>
                        isDateToday(transaction.date)
                      ) || [];
                    return todayIncome.reduce(
                      (sum, transaction) => sum + transaction.amount,
                      0
                    );
                  }
                })()}
              </Text>
            </View>
          </>
        }
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={show} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="w-full rounded-2xl bg-white p-5">
            <Text className="text-lg font-bold text-dark">
              Enable biometric unlock?
            </Text>
            <Text className="text-subtext mt-2">
              Use Face ID / Fingerprint to unlock the app next time.
            </Text>

            <View className="flex-row justify-end gap-3 mt-5">
              <Pressable onPress={onNotNow}>
                <Text className="text-dark font-semibold">Not now</Text>
              </Pressable>

              <Pressable onPress={onEnable}>
                <Text className="text-secondary-400 font-semibold">Enable</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
