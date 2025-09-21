import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventsProvider } from "@/components/storage/EventsProvider";
import { requestNotificationPermissions } from "@/utils/notifications";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        console.log("Notifications not granted");
      }
    })();
  }, []);
  return (
    <ThemeProvider value={DefaultTheme}>
      <EventsProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ header: () => <CustomHeader hasBack={false} /> }} />
            <Stack.Screen name="create" options={{ header: () => <CustomHeader /> }} />
            <Stack.Screen name="event/[id]" options={{ header: () => <CustomHeader /> }} />
            <Stack.Screen name="event/[id]/edit" options={{ header: () => <CustomHeader /> }} />
          </Stack>
          <StatusBar style="auto" />
        </SafeAreaView>
      </EventsProvider>
    </ThemeProvider>
  );
}

// Custom Header Component
function CustomHeader({ hasBack = true }: { hasBack?: boolean }) {
  const router = useRouter();
  return (
    <View style={styles.headerContainer}>
      {hasBack ? (
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>◀</Text>
        </Pressable>
      ) : (
        <>
          <Text style={styles.headerTitle}>My Events</Text>
          <Pressable onPress={() => router.push("/create")} style={styles.backButton}>
            <Text style={styles.addText}>+</Text>
          </Pressable>
        </>
      )}
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 112, // customize height
    paddingTop: 32, // for status bar space
    backgroundColor: "#4A90E2", // background color
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  backText: {
    fontSize: 32,
    color: "#fff", // back button color
  },
  addText: {
    fontSize: 32,
    color: "#fff", // back button color
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
});
