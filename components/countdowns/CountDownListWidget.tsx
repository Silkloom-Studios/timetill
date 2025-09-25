import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { computeDaysLeft, DaysLeftResult } from "@/utils/countdown";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "../storage/EventsProvider";
import resolveListWidgetChips from "./CountdownListWidgetChips";
import CountdownWidgetPanel from "./CountdownWidgetPanel";

interface CountdownListWidgetProps {
  event: Event;
  index: number;
}
export default function CountDownListWidget({ event, index }: CountdownListWidgetProps) {
  const [cdData, setCdData] = useState<DaysLeftResult | undefined>();
  const router = useRouter();
  const padding = index % 2 === 0 ? { paddingRight: 8 } : { paddingLeft: 8 };

  useEffect(() => {
    setCdData(computeDaysLeft(event.date));

    const interval = setInterval(() => {
      setCdData(computeDaysLeft(event.date));
    }, 1000);

    return () => clearInterval(interval);
  }, [event]);

  if (!cdData) {
    return null;
  }

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
        {resolveListWidgetChips(cdData)}
        <CountdownWidgetPanel number={cdData.days} text={"DAYS"} />
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
