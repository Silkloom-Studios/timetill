import { computeCountdown, CountdownResult } from "@/utils/countdown";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountdownWidget from "./CountDownWidget";

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
          <>
            <CountdownWidget number={days} text={"DAYS"} index={0} />
            <CountdownWidget number={hours} text={"HOURS"} index={1} />
            <CountdownWidget number={minutes} text={"MINUTES"} index={2} />
            <CountdownWidget number={seconds} text={"SECONDS"} index={3} />
          </>
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
  },
});
