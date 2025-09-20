// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const storeData = async <T>(key: string, value: T): Promise<boolean> => {
//   try {
//     const jsonValue = JSON.stringify(value);
//     await AsyncStorage.setItem(key, jsonValue);
//     return true;
//   } catch (e) {
//     console.error(`Error storing data for key "${key}":`, e);
//     return false;
//   }
// };

// export const getData = async <T>(key: string): Promise<T | null> => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key);
//     return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
//   } catch (e) {
//     console.error(`Error reading data for key "${key}":`, e);
//     return null;
//   }
// };

// export const removeData = async (key: string): Promise<boolean> => {
//   try {
//     await AsyncStorage.removeItem(key);
//     return true;
//   } catch (e) {
//     console.error(`Error removing data for key "${key}":`, e);
//     return false;
//   }
// };

// export const clearAll = async (): Promise<void> => {
//   try {
//     await AsyncStorage.clear();
//   } catch (e) {
//     console.error("Error clearing storage:", e);
//   }
// };

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EventMap } from "../components/storage/EventsProvider";

const STORAGE_KEY = "events_map";

export const getEventsMap = async (): Promise<EventMap> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Error reading events:", err);
    return {};
  }
};

export const saveEventsMap = async (map: EventMap): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    return true;
  } catch (err) {
    console.error("Error saving events:", err);
    return false;
  }
};
