import CountDownListWidget from "@/components/countdowns/CountDownListWidget";
import { useEvents } from "@/components/storage/EventsProvider";
import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { HEADER_HEIGHT } from "./_layout";
//TODO Create scroll Effect

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Eventlist() {
  const { eventList } = useEvents();

  const sortedEvents = eventList ? [...eventList].sort((a, b) => a.date.localeCompare(b.date)) : [];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.scrollView}>
          {sortedEvents.map((event, i) => {
            return <CountDownListWidget key={event.id} event={event} index={i} />;
          })}
        </View>
      </ScrollView>

      <LinearGradient
        colors={[Colors.background, addOpacity(Colors.background, 0)]}
        style={[styles.fade, { top: 0 }]}
      />
      <LinearGradient
        colors={[addOpacity(Colors.background, 0), Colors.background]}
        style={[styles.fade, { bottom: 32 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: SCREEN_HEIGHT - HEADER_HEIGHT * 1.5,
    paddingBottom: 32,
  },
  scrollContainer: {
    paddingVertical: 32,
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
    paddingBottom: 80,
  },
  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 32,
    zIndex: 1,
  },
});
