import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import AddIcon from "@/components/icons/AddIcon";
import BackIcon from "@/components/icons/BackIcon";
import EditIcon from "@/components/icons/EditIcon";
import { EventsProvider } from "@/components/storage/EventsProvider";
import { Title } from "@/components/text/Title";
import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { requestNotificationPermissions } from "@/utils/notifications";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const HEADER_HEIGHT = 168;

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
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

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={DefaultTheme}>
      <EventsProvider>
        <View style={styles.appContainer}>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack
              screenOptions={{
                contentStyle: {
                  backgroundColor: Colors.background,
                },
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  header: () => (
                    <CustomHeader hasBack={false}>
                      <TouchableOpacity onPress={() => router.push("/create")} style={styles.headerButton}>
                        <AddIcon />
                      </TouchableOpacity>
                    </CustomHeader>
                  ),
                }}
              />
              <Stack.Screen name="create" options={{ header: () => <CustomHeader /> }} />
              <Stack.Screen
                name="event/[id]"
                options={({ route }) => {
                  const params = route.params as { id: string };
                  return {
                    header: () => (
                      <CustomHeader>
                        <TouchableOpacity
                          onPress={() => router.push(`/event/${params.id}/edit`)}
                          style={styles.headerButton}
                        >
                          <EditIcon />
                        </TouchableOpacity>
                      </CustomHeader>
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="event/[id]/edit"
                options={{
                  header: () => <CustomHeader />,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </SafeAreaView>
        </View>
      </EventsProvider>
    </ThemeProvider>
  );
}

// Custom Header Component
function CustomHeader({ hasBack = true, children }: { hasBack?: boolean; children?: React.ReactNode }) {
  const router = useRouter();
  return (
    <View style={[styles.headerContainer, { height: hasBack ? HEADER_HEIGHT - 32 : HEADER_HEIGHT }]}>
      {hasBack ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <BackIcon />
        </TouchableOpacity>
      ) : (
        <Title>{"My \nEvents"}</Title>
      )}
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },

  headerContainer: {
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerButton: {
    padding: 8,
    backgroundColor: addOpacity(Colors.foreground, 10),
    borderRadius: 4,
  },
});
