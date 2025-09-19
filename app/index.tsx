import { useEvents } from "@/components/storage/EventsProvider";
import { Link } from "expo-router";
import { View } from "react-native";

export default function Eventlist() {
  const { eventList } = useEvents();

  //TODO: order by number accending

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
              <View key={event.date}>
                <Link
                  href={{
                    pathname: "/event/[date]",
                    params: { date: event.date, title: event.title, subtitle: event.subtitle },
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
