import { Colors, Fonts } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { formatDaysLeft, resolveNumberStyleBasedOnDigits } from "@/utils/countdown";
import { StyleSheet, Text, View } from "react-native";

interface CountdownWidgetProps {
  number: number;
  text: "DAYS" | "HOURS" | "MINUTES" | "SECONDS";
}

export default function CountdownWidgetPanel({ number, text }: CountdownWidgetProps) {
  return (
    <View style={styles.cardPanel}>
      <View style={styles.cardPanelContainer}>
        <View style={styles.cardPanelTop}></View>
        <View style={styles.cardPanelBottom}></View>
        <View style={styles.cardPanelNumberWrapper}>
          <Text style={[styles.cardPanelNumber, resolveNumberStyleBasedOnDigits(number)]}>
            {formatDaysLeft(number).padStart(2, "0")}
          </Text>
        </View>
      </View>
      <View style={styles.cardTimeTextWrapper}>
        <Text style={[styles.cardTimeText, styles[text]]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardPanel: {
    padding: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "100%",
  },
  cardPanelContainer: {
    flex: 1,
    minWidth: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: 4,
    position: "relative",
    overflow: "hidden",
  },
  cardPanelTop: {
    height: 49,
    width: "100%",
    backgroundColor: Colors.midGray,
  },
  cardPanelBottom: {
    height: 49,
    width: "100%",
    backgroundColor: Colors.darkGray,
  },
  cardPanelNumberWrapper: {
    position: "absolute",
    display: "flex",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardPanelNumber: {
    fontFamily: Fonts.custom.time,
  },
  cardTimeTextWrapper: {
    paddingLeft: 6,
    height: 100,
  },
  cardTimeText: {
    flex: 1,
    flexWrap: "wrap",
    color: addOpacity(Colors.gold, 90),
  },
  DAYS: {
    fontSize: 16,
    lineHeight: 16,
    width: 16,
  },
  HOURS: {
    fontSize: 16,
    lineHeight: 16,
    width: 16,
  },
  MINUTES: {
    fontSize: 14,
    lineHeight: 14,
    width: 12,
    textAlign: "center",
  },
  SECONDS: {
    fontSize: 14,
    lineHeight: 14,
    width: 12,
    textAlign: "center",
  },
});
