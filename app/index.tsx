import CountDownListWidget from "@/components/countdowns/CountDownListWidget";
import { ScrollView, View } from "react-native";

//TODO Create scroll Effect

const DUMMY_LIST = [
  {
    id: 1,
    title: "Doctor Appointment",
    subtitle: "Annual check-up",
    date: "2025-09-21",
    notificationId: null,
  },

  {
    id: 5,
    title: "Team Meeting",
    subtitle: "Project planning",
    date: "2026-09-19",
    notificationId: null,
  },
  {
    id: 11,
    title: "Doctor Appointment",
    subtitle: "Annual check-up",
    date: "2025-10-05",
    notificationId: null,
  },
  {
    id: 21,
    title: "Birthday Party",
    subtitle: "Alice's 30th birthday",
    date: "2025-09-20",
    notificationId: null,
  },
  {
    id: 31,
    title: "Conference",
    subtitle: "Tech Conference 2025",
    date: "2025-09-21",
    notificationId: null,
  },
  {
    id: 41,
    title: "Vacation",
    subtitle: "Trip to Bali",
    date: "2025-09-22",
    notificationId: null,
  },
  {
    id: 2,
    title: "Birthday Party",
    subtitle: "Alice's 30th birthday",
    date: "2025-09-20",
    notificationId: null,
  },
  {
    id: 3,
    title: "Conference",
    subtitle: "Tech Conference 2025",
    date: "2026-09-21",
    notificationId: null,
  },
  {
    id: 4,
    title: "Vacation",
    subtitle: "Trip to Bali",
    date: "2025-12-20",
    notificationId: null,
  },
  {
    id: 51,
    title: "Team Meeting",
    subtitle: "Project planning",
    date: "2039-09-19",
    notificationId: null,
  },
];

export default function Eventlist() {
  // const { eventList } = useEvents();
  const eventList = DUMMY_LIST;

  const sortedEvents = eventList ? [...eventList].sort((a, b) => a.date.localeCompare(b.date)) : [];

  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: 16,
        }}
      >
        {sortedEvents.map((event, i) => {
          return <CountDownListWidget key={event.id} event={event} index={i} />;
        })}
      </View>
    </ScrollView>
  );
}
