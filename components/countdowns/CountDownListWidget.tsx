import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { computeDaysLeft } from "@/utils/countdown";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "../storage/EventsProvider";
import resolveListWidgetChips from "./CountdownListWidgetChips";
import CountdownWidgetPanel from "./CountdownWidgetPanel";

interface CountdownListWidgetProps {
  event: Event;
  index: number;
}
export default function CountDownListWidget({ event, index }: CountdownListWidgetProps) {
  const router = useRouter();
  const dateDetails = computeDaysLeft(event.date);
  const padding = index % 2 === 0 ? { paddingRight: 8 } : { paddingLeft: 8 };
  return (
    <View style={[styles.container, padding]}>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: "/event/[id]",
            params: { id: event.id },
          })
        }
        style={styles.cardBackground}
      >
        {resolveListWidgetChips(dateDetails)}
        <CountdownWidgetPanel number={dateDetails.days} text={"DAYS"} />
      </TouchableOpacity>
      <Text ellipsizeMode="tail" style={styles.cardTitle} numberOfLines={1}>
        {event.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    maxHeight: 148,
    height: "100%",
  },
  cardBackground: {
    backgroundColor: addOpacity(Colors.foreground, 10),
    width: "100%",
    height: 124,
    borderRadius: 4,
    position: "relative",
  },
  cardTitle: {
    width: "100%",
    paddingTop: 8,
    fontSize: 12,
    color: addOpacity(Colors.text, 35),
    paddingRight: 2,
  },
});
