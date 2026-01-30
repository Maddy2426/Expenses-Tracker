import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const KEY_CATEGORIES = "categories";

export type Category = {
    id: string;
    name: string;
    icon: string;
    iconType?: "font-awesome" | "Ionicons";
    createdAt?: string;
};

type CategoriesState = {
    categories: Category[];
    init: () => Promise<void>;
    addCategory: (category: Omit<Category, 'id' | 'createdAt'>) => Promise<void>;
    updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    getCategoryById: (id: string) => Category | undefined;
};

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
    categories: [],

    init: async () => {
        const raw = await AsyncStorage.getItem(KEY_CATEGORIES);
        if (raw) {
            const categories = JSON.parse(raw);
            set({ categories });
        } else {
            await AsyncStorage.setItem(KEY_CATEGORIES, JSON.stringify([]));
            set({ categories: [] });
        }
    },

    addCategory: async (categoryData) => {
        const current = get().categories;
        const newCategory: Category = {
            ...categoryData,
            id: current.length > 0
                ? (Math.max(...current.map(c => parseInt(c.id) || 0)) + 1).toString()
                : '1',
            createdAt: new Date().toISOString(),
        };
        const updated = [...current, newCategory];
        await AsyncStorage.setItem(KEY_CATEGORIES, JSON.stringify(updated));
        set({ categories: updated });
    },

    updateCategory: async (id: string, updates: Partial<Category>) => {
        const current = get().categories;
        const updated = current.map(category =>
            category.id === id ? { ...category, ...updates } : category
        );
        await AsyncStorage.setItem(KEY_CATEGORIES, JSON.stringify(updated));
        set({ categories: updated });
    },

    deleteCategory: async (id: string) => {
        const current = get().categories;
        const updated = current.filter(category => category.id !== id);
        await AsyncStorage.setItem(KEY_CATEGORIES, JSON.stringify(updated));
        set({ categories: updated });
    },

    getCategoryById: (id: string) => {
        return get().categories.find(category => category.id === id);
    },
}));