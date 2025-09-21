import { Colors, Fonts } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { computeDaysLeft, DaysLeftResult } from "@/utils/countdown";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Event } from "../storage/EventsProvider";

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
        {/* <View>{resolveDateWidgetComponents(dateDetails)}</View> */}
        <View style={styles.cardPanel}>
          <View style={styles.cardPanelContainer}>
            <View style={styles.cardPanelTop}></View>
            <View style={styles.cardPanelBottom}></View>
            <View style={styles.cardPanelNumberWrapper}>
              <Text style={[styles.cardPanelNumber, resolveNumberStyleBasedOnDigits(dateDetails.days)]}>
                {formatDaysLeft(dateDetails.days).padStart(2, "0")}
              </Text>
            </View>
          </View>
          <View style={styles.cardTimeTextWrapper}>
            <Text style={styles.cardTimeText}>DAYS</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Text style={styles.cardTitle}>{event.title}</Text>
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

const resolveNumberStyleBasedOnDigits = (daysLeft: number) => {
  const base = { color: Colors.text, fontSize: 64 };
  if (daysLeft <= 0) return { ...base, color: Colors.red };

  const digits = daysLeft.toString().length;
  const sizeMap = [64, 64, 54, 40, 32, 28];
  const fontSize = sizeMap[Math.min(digits - 1, sizeMap.length - 1)];
  return { ...base, fontSize };
};

const formatDaysLeft = (daysLeft: number) => {
  const str = daysLeft.toString();
  return str.length > 4 ? "9999+" : str;
};

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
  },
  cardTitle: {
    paddingTop: 8,
    fontSize: 12,
    color: addOpacity(Colors.text, 35),
  },
  cardPanel: {
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
  },
  cardPanelContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
  },
  cardPanelTop: {
    height: 49,
    width: "100%",
    backgroundColor: Colors.midGray,
  },
  cardPanelBottom: {
    height: 49,
    width: "100%",
    backgroundColor: Colors.darkGray,
  },
  cardPanelNumberWrapper: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardPanelNumber: {
    fontFamily: Fonts.custom.time,
  },
  cardTimeTextWrapper: {
    paddingLeft: 6,
    height: 100,
  },
  cardTimeText: {
    flex: 1,
    width: 16,
    flexWrap: "wrap",
    fontSize: 16,
    lineHeight: 16,
    color: addOpacity(Colors.gold, 90),
  },
});
