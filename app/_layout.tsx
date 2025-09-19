import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { EventsProvider } from "@/components/storage/EventsProvider";
import { useColorScheme } from "@/hooks/use-color-scheme";

const SHOW_HEADER = true;

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <EventsProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: SHOW_HEADER }} />
          <Stack.Screen
            name="event/[date]"
            options={{ headerShown: SHOW_HEADER }}
            // options={({ route }) => {
            //   const params = route.params as { date: string };
            //   return { headerShown: SHOW_HEADER, title: params.date ?? "Event Details" };
            // }}
          />
          <Stack.Screen name="event-form" options={{ headerShown: SHOW_HEADER }} />
        </Stack>
        <StatusBar style="auto" />
      </EventsProvider>
    </ThemeProvider>
  );
}
