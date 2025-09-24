import { Colors } from "@/constants/theme";
import { DaysLeftResult, resolveDateWidgetOptions } from "@/utils/countdown";
import { StyleSheet, Text, View } from "react-native";

export default function resolveListWidgetChips(dateData: DaysLeftResult) {
  const status = resolveDateWidgetOptions(dateData);

  switch (status) {
    case "future":
      return null;
    case "tomorrow":
      return <CountdownListWidgetChips color={Colors.white} text="tomorrow" />;
    case "today":
      return <CountdownListWidgetChips color={Colors.gold} text="today" />;
    case "past":
      return <CountdownListWidgetChips color={Colors.red} text="finished" />;
  }
}

interface CountdownListWidgetChipsProps {
  color: string;
  text: string;
}
function CountdownListWidgetChips({ color, text }: CountdownListWidgetChipsProps) {
  return (
    <View style={[styles.chipContainer, { backgroundColor: color }]}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    position: "absolute",
    zIndex: 2,
    padding: 4,
    borderBottomRightRadius: 8,
  },
});
