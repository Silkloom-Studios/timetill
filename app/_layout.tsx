import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventsProvider } from "@/components/storage/EventsProvider";
import { requestNotificationPermissions } from "@/utils/notifications";
import { useEffect } from "react";

const SHOW_HEADER = true;

export default function RootLayout() {
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
            <Stack.Screen name="index" options={{ headerShown: SHOW_HEADER }} />
            <Stack.Screen
              name="event/[id]"
              options={({ route }) => {
                const params = route.params as { id: string };
                return {
                  headerShown: SHOW_HEADER,
                  title: params?.id ?? "Event Details",
                };
              }}
            />
            <Stack.Screen name="create" options={{ headerShown: SHOW_HEADER }} />
            <Stack.Screen
              name="event/[id]/edit"
              options={({ route }) => {
                const params = route.params as { id: number };
                return {
                  headerShown: SHOW_HEADER,
                  title: "Edit " + (params?.id ?? "Event"),
                };
              }}
            />
          </Stack>

          <StatusBar style="auto" />
        </SafeAreaView>
      </EventsProvider>
    </ThemeProvider>
  );
}
