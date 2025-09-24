import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { StyleSheet, View } from "react-native";
import CountdownWidgetPanel from "./CountdownWidgetPanel";

interface CountdownWidgetProps {
  number: number;
  text: "DAYS" | "HOURS" | "MINUTES" | "SECONDS";
  index: number;
}

export default function CountdownWidget({ number, text, index }: CountdownWidgetProps) {
  const padding = index % 2 === 0 ? { paddingRight: 8 } : { paddingLeft: 8 };
  return (
    <View style={[styles.container, padding]}>
      <View style={styles.cardBackground}>
        <CountdownWidgetPanel number={number} text={text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    maxHeight: 124,
    height: "100%",
  },
  cardBackground: {
    backgroundColor: addOpacity(Colors.foreground, 10),
    width: "100%",
    height: 124,
    borderRadius: 4,
    position: "relative",
  },
});
