import { computeCountdown, CountdownResult } from "@/utils/countdown";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface CountdownProps {
  date: string;
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
