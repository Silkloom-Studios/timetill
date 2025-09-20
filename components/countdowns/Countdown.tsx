import { parseLocalDateMidnight } from "@/utils/dates";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CountdownProps {
  date: string;
}

type CountdownResult = {
  hasPassed: boolean;
  isToday: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function computeCountdown(dateString: string, nowDate = new Date()): CountdownResult {
  const target = parseLocalDateMidnight(dateString);

  const msPerDay = 24 * 60 * 60 * 1000;
  const msPerHour = 60 * 60 * 1000;
  const msPerMinute = 60 * 1000;

  const now = new Date(nowDate);
  const hasPassed = now.getTime() >= target.getTime();
  const todayMid = new Date(now);
  todayMid.setHours(0, 0, 0, 0);
  const isToday =
    target.getFullYear() === todayMid.getFullYear() &&
    target.getMonth() === todayMid.getMonth() &&
    target.getDate() === todayMid.getDate();

  if (hasPassed) {
    return { hasPassed: true, isToday, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let temp = new Date(now);

  let remainderMs = target.getTime() - temp.getTime();
  const days = Math.floor(remainderMs / msPerDay);
  remainderMs -= days * msPerDay;
  const hours = Math.floor(remainderMs / msPerHour);
  remainderMs -= hours * msPerHour;
  const minutes = Math.floor(remainderMs / msPerMinute);
  remainderMs -= minutes * msPerMinute;
  const seconds = Math.floor(remainderMs / 1000);

  return { hasPassed: false, isToday, days, hours, minutes, seconds };
}
export default function Countdown({ date }: CountdownProps) {
  const [cdData, setCdData] = useState<CountdownResult | undefined>();

  useEffect(() => {
    setCdData(computeCountdown(date));

    const interval = setInterval(() => {
      setCdData(computeCountdown(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (!cdData) {
    return null;
  }

  const { hasPassed, isToday, days, hours, minutes, seconds } = cdData;

  return (
    <View style={countdownStyles.container}>
      <View style={countdownStyles.countdownWrapper}>
        {hasPassed ? (
          <Text>Event has passed.</Text>
        ) : isToday ? (
          <Text>Event is today!</Text>
        ) : (
          <Text>
            {days}d {hours}h {minutes}m {seconds}s
          </Text>
        )}
      </View>
    </View>
  );
}

const countdownStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  countdownWrapper: {
    padding: 10,
  },
});
