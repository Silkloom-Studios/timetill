import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { cancelEventNotification, scheduleEventNotification } from "@/utils/notifications";
import { getEventsMap, saveEventsMap } from "@/utils/storage";

export type Event = {
  title: string;
  date: string;
  id: number;
  subtitle?: string;
  notificationId?: string | null;
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
    (async () => {
      const asyncMap = await getEventsMap();
      setEventMap(asyncMap);
    })();
  }, []);

  const persist = async (newMap: EventMap) => {
    setEventMap(newMap);
    return await saveEventsMap(newMap);
  };

  const addEvent = async (event: Event) => {
    const notificationId = await scheduleEventNotification(event);
    const newEvent = { ...event, notificationId };
    return await persist({ ...eventMap, [event.id]: newEvent });
  };

  const updateEvent = async (id: number, event: Event) => {
    const current = eventMap[id];
    if (current) {
      await cancelEventNotification(current.notificationId);
      const notificationId = await scheduleEventNotification(event);
      const newEvent = { ...event, notificationId };
      return await persist({ ...eventMap, [id]: { ...newEvent } });
    }
    return false;
  };

  const removeEvent = async (id: number) => {
    const { [id]: _, ...rest } = eventMap;
    const current = eventMap[id];
    if (current) {
      await cancelEventNotification(current.notificationId);
    }
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

export function useEvents<T extends Event>() {
  const context = useContext<EventsContextType<T> | undefined>(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context as EventsContextType<T>;
}
