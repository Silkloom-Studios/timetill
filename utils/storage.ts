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
