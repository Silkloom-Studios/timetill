import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { getEventsMap, saveEventsMap } from "@/utils/storage";

export type Event = {
  title: string;
  date: string;
  id: number;
  subtitle?: string;
};

export type EventMap = Record<number, Event>;

type EventsContextType<T extends Event> = {
  eventMap: EventMap;
  eventList: T[];
  addEvent: (event: Event) => Promise<boolean>;
  removeEvent: (id: number) => Promise<boolean>;
  updateEvent: (id: number, event: Event) => Promise<boolean>;
  getEvent: (id: number) => Event | undefined;
};

const EventsContext = createContext<EventsContextType<any> | undefined>(undefined);

type EventsProviderProps = {
  children: ReactNode;
};

export function EventsProvider<T extends Event>({ children }: EventsProviderProps) {
  const [eventMap, setEventMap] = useState<EventMap>({});

  useEffect(() => {
    getEventsMap();
  }, []);

  const persist = async (newMap: EventMap) => {
    setEventMap(newMap);
    return await saveEventsMap(newMap);
  };

  const addEvent = async (event: Event) => {
    return await persist({ ...eventMap, [event.id]: event });
  };

  const updateEvent = async (id: number, event: Event) => {
    const current = eventMap[id];
    if (current) {
      return await persist({ ...eventMap, [id]: { ...event } });
    }
    return false;
  };

  const removeEvent = async (id: number) => {
    const { [id]: _, ...rest } = eventMap;
    return await persist(rest);
  };

  const getEvent = (id: number) => {
    if (eventMap[id]) {
      return eventMap[id];
    }
  };

  return (
    <EventsContext.Provider
      value={{
        eventMap,
        eventList: Object.values(eventMap),
        addEvent,
        updateEvent,
        removeEvent,
        getEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

// Hook to use the list
export function useEvents<T extends Event>() {
  const context = useContext<EventsContextType<T> | undefined>(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context as EventsContextType<T>;
}
