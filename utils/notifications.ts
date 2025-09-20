// 1. Configure how notifications are displayed when the app is foregrounded
import { Event } from "@/components/storage/EventsProvider";
import * as Notifications from "expo-notifications";
import { buildLocalDate } from "./dates";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldShowBadge: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function scheduleEventNotification(event: Event) {
  const [year, month, day] = event.date.split("-").map(Number);

  const morningOf = buildLocalDate(year, month, day, 7, 0);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: "Timetill",
      body: `${event.title} is today.`,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      year: morningOf.getFullYear(),
      month: morningOf.getMonth() + 1,
      day: morningOf.getDate(),
      hour: morningOf.getHours(),
      minute: morningOf.getMinutes(),
      repeats: false,
    },
  });

  return notificationId;
}

export async function cancelEventNotification(notificationId?: string) {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
}
