// store/useCounterStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CounterState = {
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,

      increase: () => set((state) => ({ count: state.count + 1 })),

      decrease: () => set((state) => ({ count: state.count - 1 })),

      reset: () => set({ count: 0 }),
    }),

    {
      name: "counter-storage", // 🔑 key inside AsyncStorage

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
