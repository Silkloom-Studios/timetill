import { useEvents } from "@/components/storage/EventsProvider";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Eventlist() {
  const { eventList } = useEvents();

  //TODO: order by Date accending

  return (
    <View>
      <View>
        <Link href="/event-form" style={{ fontSize: 40 }}>
          +
        </Link>
      </View>
      <View>
        {eventList &&
          eventList.map((event) => {
            return (
              <View key={event.id}>
                <Text>{event.title}</Text>
                <Text>{event.date}</Text>
                <Link
                  href={{
                    pathname: "/event/[id]",
                    params: { id: event.id, date: event.date, title: event.title, subtitle: event.subtitle },
                  }}
                >
                  {event.title}
                </Link>
              </View>
            );
          })}
        <Link href="/event-form">Add new event!</Link>
      </View>
    </View>
  );
}
