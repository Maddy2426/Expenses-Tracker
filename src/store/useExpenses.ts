import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Transaction = {
  id: number;
  date: Date;
  type: "income" | "expense";
  time: string;
  amount: number;
  category: string;
  description: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
};

type ExpensesState = {
  transactions: Transaction[]; // Array of all transactions
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  getTotalAmount: () => number; // Helper to calculate total
  // Keep these for form compatibility
  id: number;
  date: Date;
  type: "income" | "expense";
  amount: number;
  addAmount: (amount: number) => void;
  category: string;
  description: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const useExpensesStore = create<ExpensesState>()(
  persist(
    (set, get) => ({
      transactions: [], // Array to store all expense transactions
      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id:
            get().transactions.length > 0
              ? Math.max(...get().transactions.map((t) => t.id)) + 1
              : 1,
          time: transaction.time,
        };
        set({ transactions: [...get().transactions, newTransaction] });
      },
      getTotalAmount: () => {
        return get().transactions.reduce((sum, t) => sum + t.amount, 0);
      },
      // Keep existing fields for form compatibility
      id: 0,
      date: new Date(),
      type: "expense",
      amount: 0,
      addAmount: (amount: number) => set({ amount: get().amount + amount }),
      category: "",
      description: "",
      attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    {
      name: "expenses-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
