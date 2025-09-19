import { useEvents } from "@/components/storage/EventsProvider";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Eventlist() {
  const { eventList } = useEvents();

  return (
    <View>
      <Text>This is the main page</Text>
      <View>
        {eventList &&
          eventList.map((event) => {
            return (
              <View key={event.date}>
                <Text>{event.title}</Text>
                <Link
                  href={{
                    pathname: "/event/[date]",
                    params: { date: event.date, title: event.title, subtitle: event.subtitle },
                  }}
                ></Link>
              </View>
            );
          })}
        <Link href="/event-form">Add new event!</Link>
      </View>
    </View>
  );
}
