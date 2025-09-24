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
    getEventsMap();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     console.log("[addSeedEvent] current storage length: ", Object.values(eventMap).length);
  //     if (Object.values(eventMap).length < 1) {
  //       console.log("[addSeedEvent] begin seeding...");
  //       const newMap: EventMap = {};
  //       for (const event of DUMMY_LIST) {
  //         newMap[event.id] = event;
  //       }
  //       setEventMap(newMap);
  //       await persist({ ...newMap });
  //     } else {
  //       console.log("[addSeedEvent] no seeding required");
  //     }
  //   })();
  // }, [eventMap]);

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

// Hook to use the list
export function useEvents<T extends Event>() {
  const context = useContext<EventsContextType<T> | undefined>(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context as EventsContextType<T>;
}

// const DUMMY_LIST = [
//   {
//     id: 1,
//     title: "Doctor Appointment",
//     subtitle: "Annual check-up",
//     date: "2025-09-23",
//     notificationId: null,
//   },

//   {
//     id: 5,
//     title: "Team Meeting",
//     subtitle: "Project planning",
//     date: "2026-09-19",
//     notificationId: null,
//   },
//   {
//     id: 11,
//     title: "Doctor Appointment",
//     subtitle: "Annual check-up",
//     date: "2025-10-05",
//     notificationId: null,
//   },
//   {
//     id: 21,
//     title: "Birthday Party",
//     subtitle: "Alice's 30th birthday",
//     date: "2027-09-24",
//     notificationId: null,
//   },
//   {
//     id: 31,
//     title: "Conference",
//     subtitle: "Tech Conference 2025",
//     date: "2100-09-21",
//     notificationId: null,
//   },
//   {
//     id: 41,
//     title: "Vacation",
//     subtitle: "Trip to Bali",
//     date: "2025-09-22",
//     notificationId: null,
//   },
//   {
//     id: 2,
//     title: "Birthday Party",
//     subtitle: "Alice's 30th birthday",
//     date: "2025-09-24",
//     notificationId: null,
//   },
//   {
//     id: 3,
//     title: "Conference",
//     subtitle: "Tech Conference 2025",
//     date: "2026-09-21",
//     notificationId: null,
//   },
//   {
//     id: 4,
//     title: "Vacation",
//     subtitle: "Trip to Bali",
//     date: "2025-12-20",
//     notificationId: null,
//   },
//   {
//     id: 51,
//     title: "Team Meeting",
//     subtitle: "Project planning",
//     date: "2039-09-19",
//     notificationId: null,
//   },
// ];
