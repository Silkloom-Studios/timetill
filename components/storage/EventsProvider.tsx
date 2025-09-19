import { getData, storeData } from "@/utils/storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import dummyData from "../../test-data/dummy-data.json";
const EVENTS_KEY = "events";

export type ItemWithTimestamp = {
  title: string;
  subtitle: string;
  date: number;
};

type EventsContextType<T extends ItemWithTimestamp> = {
  eventList: T[];
  addEvent: (item: Omit<T, "id">) => Promise<void>;
  removeEvent: (id: string) => Promise<void>;
};

const EventsContext = createContext<EventsContextType<any> | undefined>(undefined);

type EventsProviderProps = {
  children: ReactNode;
};

export function EventsProvider<T extends ItemWithTimestamp>({ children }: EventsProviderProps) {
  const [eventList, setEventList] = useState<T[]>(dummyData.events as unknown as T[]);

  useEffect(() => {
    (async () => {
      const stored = await getData<T[]>(EVENTS_KEY);
      if (stored) setEventList(stored);
    })();
  }, []);

  // Add item
  const addEvent = async (item: Omit<T, "id">) => {
    const newItem = { ...item, id: Date.now().toString() } as T;
    const updatedList = [...eventList, newItem];
    setEventList(updatedList);
    await storeData(EVENTS_KEY, updatedList);
  };

  // Remove item
  const removeEvent = async (id: string) => {
    const updatedList = eventList.filter((i) => i.id !== id);
    setEventList(updatedList);
    await storeData(EVENTS_KEY, updatedList);
  };

  return <EventsContext.Provider value={{ eventList, addEvent, removeEvent }}>{children}</EventsContext.Provider>;
}

// Hook to use the list
export function useEvents<T extends ItemWithTimestamp>() {
  const context = useContext<EventsContextType<T> | undefined>(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context as EventsContextType<T>;
}
