import EventForm from "@/components/forms/EventForm";
import { View } from "react-native";

export type EventDataType = {
  title?: string;
  date?: string;
  id?: number;
  subtitle?: string;
};

const eventData = {
  title: undefined,
  date: undefined,
  id: undefined,
  subtitle: undefined,
};

export default function Create() {
  return (
    <View>
      <View>{eventData && <EventForm {...eventData} />}</View>
    </View>
  );
}
