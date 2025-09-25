import CountDownListWidget from "@/components/countdowns/CountDownListWidget";
import { Event, useEvents } from "@/components/storage/EventsProvider";
import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { formatLocalDate } from "@/utils/dates";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { HEADER_HEIGHT } from "./_layout";
//TODO Create scroll Effect

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function Eventlist() {
  const { eventList } = useEvents();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (eventList && eventList.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const past: Event[] = [];
      const upcoming: Event[] = [];
      const sortedEvents = eventList ? [...eventList].sort((a, b) => a.date.localeCompare(b.date)) : [];
      for (const event of sortedEvents) {
        if (event.date < formatLocalDate(today)) {
          past.push(event);
        } else {
          upcoming.push(event);
        }
      }
      setEvents(upcoming.concat(past));
    }
  }, [eventList]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
        <View style={styles.scrollView}>
          {events.length > 0 ? (
            events.map((event, i) => {
              return <CountDownListWidget key={event.id} event={event} index={i} />;
            })
          ) : (
            <View style={{ width: "100%" }}>
              <Text style={styles.noticeText}>Press the + icon to add a new event</Text>
            </View>
          )}
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
  noticeText: {
    color: Colors.text,
    textAlign: "center",
    paddingTop: 32,
  },
});
