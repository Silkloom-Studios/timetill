import EventForm from "@/components/forms/EventForm";
import { Link } from "expo-router";
import { Text, View } from "react-native";

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
      <View>
        <Text>Edit</Text>
        {eventData && <EventForm {...eventData} />}
        <Link href="..">Go back to Event!</Link>
      </View>
    </View>
  );
}
