import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { EventsProvider } from "@/components/storage/EventsProvider";
import { Title } from "@/components/text/Title";
import { Colors } from "@/constants/theme";
import { requestNotificationPermissions } from "@/utils/notifications";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    rubikMono: require("../assets/fonts/RubikMonoOne-Regular.ttf"),
    ubuntuMonoRegular: require("../assets/fonts/UbuntuSansMono-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    (async () => {
      const granted = await requestNotificationPermissions();
      if (!granted) {
        console.log("Notifications not granted");
      }
    })();
  }, []);

  if (!fontsLoaded) {
    return null; //TODO create Font Loading screen
  }
  return (
    <ThemeProvider value={DefaultTheme}>
      <EventsProvider>
        <View style={styles.appContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="index" options={{ header: () => <CustomHeader hasBack={false} /> }} />
              <Stack.Screen name="create" options={{ header: () => <CustomHeader /> }} />
              <Stack.Screen name="event/[id]" options={{ header: () => <CustomHeader /> }} />
              <Stack.Screen name="event/[id]/edit" options={{ header: () => <CustomHeader /> }} />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </View>
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
          <Title>My Events</Title>
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
  appContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

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
});
