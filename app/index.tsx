import { useEvents } from "@/components/storage/EventsProvider";
import { computeDaysLeft, DaysLeftResult } from "@/utils/countdown";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

//TODO Create scroll Effect

// const DUMMY_LIST = [
//   {
//     id: 1,
//     title: "Doctor Appointment",
//     subtitle: "Annual check-up",
//     date: "2025-10-05",
//     notificationId: null,
//   },
//   {
//     id: 2,
//     title: "Birthday Party",
//     subtitle: "Alice's 30th birthday",
//     date: "2025-09-20",
//     notificationId: null,
//   },
//   {
//     id: 3,
//     title: "Conference",
//     subtitle: "Tech Conference 2025",
//     date: "2025-09-21",
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
//     id: 5,
//     title: "Team Meeting",
//     subtitle: "Project planning",
//     date: "2025-09-19",
//     notificationId: null,
//   },
// ];

export default function Eventlist() {
  const { eventList } = useEvents();
  // const eventList = DUMMY_LIST;

  const sortedEvents = eventList ? [...eventList].sort((a, b) => a.date.localeCompare(b.date)) : [];

  return (
    <ScrollView>
      <View>
        {sortedEvents.map((event) => {
          const dateDetails = computeDaysLeft(event.date);
          console.log("details: ", dateDetails);
          return (
            <View key={event.id}>
              <Link
                href={{
                  pathname: "/event/[id]",
                  params: { id: event.id },
                }}
              >
                <View style={{ padding: 10, borderWidth: 1, borderColor: "red" }}>
                  {resolveDateWidgetComponents(dateDetails)}
                </View>
              </Link>
              <Text>{event.title}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const resolveDateWidgetOptions = (dateData: DaysLeftResult) => {
  if (dateData.hasPassed) return "past";
  if (dateData.isToday) return "today";
  if (dateData.days === 0) return "tomorrow";
  return "future";
};

const resolveDateWidgetComponents = (dateData: DaysLeftResult) => {
  const status = resolveDateWidgetOptions(dateData);

  switch (status) {
    case "future":
      return <Text>{dateData.days} days left</Text>;
    case "tomorrow":
      return <Text>Tomorrow</Text>;
    case "today":
      return <Text>Today</Text>;
    case "past":
      return <Text>Finished</Text>;
  }
};
