import { useEvents } from "@/components/storage/EventsProvider";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Eventlist() {
  const { eventList } = useEvents();

  const sortedEvents = eventList ? [...eventList].sort((a, b) => a.date.localeCompare(b.date)) : [];

  return (
    <View>
      <View>
        <Link href="/create" style={{ fontSize: 40 }}>
          +
        </Link>
      </View>
      <View>
        {sortedEvents.map((event) => {
          return (
            <View key={event.id}>
              <Text>{event.title}</Text>
              <Text>{event.date}</Text>
              <Link
                style={{ color: "red" }}
                href={{
                  pathname: "/event/[id]",
                  params: { id: event.id },
                }}
              >
                {event.title}
              </Link>
            </View>
          );
        })}
      </View>
    </View>
  );
}
