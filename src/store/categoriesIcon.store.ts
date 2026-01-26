import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

const KEY_CATEGORIES_ICONS = "categories_icons";

export type CategoryIcon = {
    id: string;
    icon: string;
    name: string;
    type?: "font-awesome" | "Ionicons";
};

const DEFAULT_ICONS: CategoryIcon[] = [
    { id: '1', icon: 'home', name: 'Rent', type: "font-awesome" },
    { id: '2', icon: 'cart', name: 'Shopping', type: "Ionicons" },
    { id: '3', icon: 'credit-card', name: 'EMI', type: "font-awesome" },
    { id: '4', icon: 'pizza', name: 'Food', type: "Ionicons" },
    { id: '5', icon: 'water', name: 'Water Bill', type: "Ionicons" },
    { id: '6', icon: 'power', name: 'Electricity Bill', type: "Ionicons" },
    { id: '7', icon: 'bonfire', name: 'Gas Bill', type: "Ionicons" },
    { id: '8', icon: 'pricetag', name: 'Subscription', type: "Ionicons" },
    { id: '9', icon: 'wifi', name: 'Recharge', type: "Ionicons" },
    { id: '10', icon: 'tv', name: 'TV Bill', type: "Ionicons" },
    { id: '11', icon: 'medkit', name: 'Medical', type: "Ionicons" },
    { id: '12', icon: 'bus', name: 'Travel', type: "Ionicons" },
    { id: '13', icon: 'pulse', name: 'Insurance', type: "Ionicons" },
    { id: '14', icon: 'create', name: 'EMI', type: "Ionicons" },
    { id: '15', icon: 'logo-bitcoin', name: 'Investment', type: "Ionicons" },
    { id: '16', icon: 'globe', name: 'Entertainment', type: "Ionicons" },
    { id: '17', icon: 'beer', name: 'Beverages', type: "Ionicons" },
    { id: '18', icon: 'fitness', name: 'Fitness', type: "Ionicons" },
    { id: '19', icon: 'gift', name: 'Gift', type: "Ionicons" },
    { id: '20', icon: 'game-controller', name: 'Games', type: "Ionicons" },
    { id: '21', icon: 'heart', name: 'Health', type: "Ionicons" },
    { id: '22', icon: 'building', name: 'School', type: "font-awesome" },
    { id: '23', icon: 'school', name: 'College', type: "Ionicons" },
    { id: '24', icon: 'library', name: 'Library', type: "Ionicons" },
    { id: '25', icon: 'book', name: 'Books', type: "Ionicons" },
    { id: '26', icon: 'newspaper', name: 'Newspaper', type: "Ionicons" },
    { id: '27', icon: 'film', name: 'Movies', type: 'font-awesome' },
    { id: '28', icon: 'music', name: 'Music', type: "font-awesome" },
    { id: '29', icon: 'funnel', name: 'Fuel', type: "Ionicons" },
    { id: '30', icon: 'bicycle', name: 'Bicycle', type: "Ionicons" },
    { id: '31', icon: 'car', name: 'Taxi', type: "Ionicons" },
    { id: '32', icon: 'bus', name: 'Bus', type: "font-awesome" },
    { id: '33', icon: 'train', name: 'Train', type: "Ionicons" },
    { id: '34', icon: 'boat', name: 'Boat', type: "Ionicons" },
    { id: '35', icon: 'airplane', name: 'Airplane', type: "Ionicons" },
    { id: '36', icon: 'tennisball', name: 'Turff', type: 'Ionicons' },
    { id: '37', icon: 'shirt', name: 'Clothing', type: 'Ionicons' },
    { id: '38', icon: 'paw', name: 'Pet', type: 'Ionicons' },
    { id: '39', icon: 'easel', name: 'Class', type: 'Ionicons' },
    { id: '40', icon: 'logo-snapchat', name: 'Girl Friend', type: 'Ionicons' },
    { id: '41', icon: 'briefcase', name: 'Work', type: 'font-awesome' },
    { id: '42', icon: 'wallet', name: 'Wallet', type: 'Ionicons' },
    { id: '43', icon: 'ice-cream', name: 'Ice Cream', type: 'Ionicons' },
    { id: '44', icon: 'color-fill', name: 'Paint', type: 'Ionicons' },
    { id: '45', icon: 'construct', name: 'Repair', type: 'Ionicons' },
    { id: '46', icon: 'cut', name: 'Haircut', type: 'Ionicons' },
    { id: '47', icon: 'rose', name: 'Cosmetics', type: 'Ionicons' },
    { id: '48', icon: 'cafe', name: 'Snacks', type: 'Ionicons' },
    { id: '49', icon: 'people', name: 'Function', type: 'Ionicons' },
    { id: '50', icon: 'restaurant', name: 'Restaurant', type: 'Ionicons' },
    { id: '51', icon: 'nutrition', name: 'Nutrition', type: 'Ionicons' },
    { id: '52', icon: 'instagram', name: 'Instgram', type: 'font-awesome' },
    { id: '53', icon: 'facebook', name: 'Facebook', type: 'font-awesome' },
    { id: '54', icon: 'twitter', name: 'Twitter', type: 'font-awesome' },
    { id: '55', icon: 'linkedin', name: 'LinkedIn', type: 'font-awesome' },
    { id: '56', icon: 'github', name: 'GitHub', type: 'font-awesome' },
    { id: '57', icon: 'youtube', name: 'YouTube', type: 'font-awesome' },
    { id: '58', icon: 'spotify', name: 'Spotify', type: 'font-awesome' },
    { id: '59', icon: 'apple', name: 'Apple', type: 'font-awesome' },
    { id: '60', icon: 'google', name: 'Google', type: 'font-awesome' },
    { id: '61', icon: 'snapchat', name: 'Snapchat', type: 'font-awesome' },
    { id: '62', icon: 'diamond', name: 'Jewelry', type: 'Ionicons' },
    { id: '63', icon: 'color-palette', name: 'Makeup', type: 'Ionicons' },
    { id: '64', icon: 'hourglass-outline', name: 'Hourglass', type: 'Ionicons' },
    { id: '65', icon: 'business', name: 'Business', type: 'Ionicons' },
];

type CategoriesIconsState = {
    icons: CategoryIcon[];
    init: () => Promise<void>;
    saveIcons: (icons: CategoryIcon[]) => Promise<void>;
    addIcon: (icon: CategoryIcon) => Promise<void>;
    updateIcon: (id: string, updates: Partial<CategoryIcon>) => Promise<void>;
    deleteIcon: (id: string) => Promise<void>;
    resetToDefaults: () => Promise<void>;
};

export const useCategoriesIconsStore = create<CategoriesIconsState>((set, get) => ({
    icons: DEFAULT_ICONS,

    init: async () => {
        // Force reset to defaults to replace old data
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(DEFAULT_ICONS));
        set({ icons: DEFAULT_ICONS });
    },

    saveIcons: async (icons: CategoryIcon[]) => {
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(icons));
        set({ icons });
    },

    addIcon: async (icon: CategoryIcon) => {
        const current = get().icons;
        const updated = [...current, icon];
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(updated));
        set({ icons: updated });
    },

    updateIcon: async (id: string, updates: Partial<CategoryIcon>) => {
        const current = get().icons;
        const updated = current.map(icon =>
            icon.id === id ? { ...icon, ...updates } : icon
        );
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(updated));
        set({ icons: updated });
    },

    deleteIcon: async (id: string) => {
        const current = get().icons;
        const updated = current.filter(icon => icon.id !== id);
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(updated));
        set({ icons: updated });
    },

    resetToDefaults: async () => {
        await AsyncStorage.setItem(KEY_CATEGORIES_ICONS, JSON.stringify(DEFAULT_ICONS));
        set({ icons: DEFAULT_ICONS });
    },
}));