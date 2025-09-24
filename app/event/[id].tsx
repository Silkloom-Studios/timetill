import Countdown from "@/components/countdowns/Countdown";
import { useEvents } from "@/components/storage/EventsProvider";
import { Title } from "@/components/text/Title";
import { parseId } from "@/utils/utils";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export type EventDataType = {
  title: string;
  date: string;
  id: number;
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
  }, [getEvent, id]);
  return (
    <View>
      {eventData ? (
        <View>
          <View style={{ paddingBottom: 36 }}>
            <Title>{eventData.title}</Title>
            <Title type="subtitle">{eventData.subtitle}</Title>
          </View>
          <Countdown date={eventData.date} />
        </View>
      ) : null}
    </View>
  );
}
