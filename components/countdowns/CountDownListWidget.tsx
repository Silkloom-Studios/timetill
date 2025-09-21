import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { computeDaysLeft, DaysLeftResult } from "@/utils/countdown";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Event } from "../storage/EventsProvider";

interface CountdownListWidgetProps {
  event: Event;
  index: number;
}
export default function CountDownListWidget({ event, index }: CountdownListWidgetProps) {
  const dateDetails = computeDaysLeft(event.date);
  return (
    <View style={styles.container}>
      <Link
        style={styles.cardBackground}
        href={{
          pathname: "/event/[id]",
          params: { id: event.id },
        }}
      >
        <View>{resolveDateWidgetComponents(dateDetails)}</View>
      </Link>
      <Text>{event.title}</Text>
    </View>
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

const styles = StyleSheet.create({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  cardBackground: {
    backgroundColor: addOpacity(Colors.foreground, 10),
    width: 156,
    height: 144,
    borderRadius: 4,
  },
});
