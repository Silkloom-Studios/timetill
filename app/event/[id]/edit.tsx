import EventForm from "@/components/forms/EventForm";
import { useEvents } from "@/components/storage/EventsProvider";
import { parseId } from "@/utils/utils";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

/*
**
TODO:
1. check if date has passed or is today
  a. show celebration message
  b. handle time calculations
2. check how many years left
  a. months
  b. days
  c. hours
**
*/

export type EventDataType = {
  title?: string;
  date?: string;
  id?: number;
  subtitle?: string;
};

export default function EventDetail() {
  const { id } = useLocalSearchParams();

  const { getEvent } = useEvents();

  const [eventData, setEventData] = useState<EventDataType | undefined>(undefined);

  useEffect(() => {
    const idNum = parseId(id);
    if (idNum) {
      const selectedEvent = getEvent(idNum);
      if (selectedEvent) {
        setEventData(selectedEvent);
      }
    }
  }, [id, getEvent]);

  return (
    <View>
      <View>
        <Text>Edit</Text>
        {eventData && <EventForm {...eventData} />}
        <Link href="..">Go back to Event!</Link>
      </View>
    </View>
  );
}
