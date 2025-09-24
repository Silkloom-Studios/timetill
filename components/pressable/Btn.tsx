import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

export interface BtnProps {
  onPress: () => void;
  text: string;
  type: "dark" | "goldOutline" | "red";
  disabled?: boolean;
  style?: ViewStyle;
}

export default function Btn({ onPress, text, type, disabled = false, style = {} }: BtnProps) {
  return (
    <Pressable
      style={[pressableStyles.base, disabled ? pressableStyles.disabled : pressableStyles[type], style]}
      onPress={() => (disabled ? {} : onPress())}
    >
      <Text style={[textStyles.base, disabled ? textStyles.disabled : textStyles[type]]}>{text}</Text>
    </Pressable>
  );
}

export const pressableStyles = StyleSheet.create({
  base: {
    borderRadius: 4,
    paddingVertical: 10,
  },
  dark: {
    backgroundColor: Colors.darkGray,
    borderColor: Colors.darkGray,
    borderWidth: 2,
  },
  goldOutline: {
    borderColor: addOpacity(Colors.gold, 70),
    borderWidth: 2,
  },
  red: {
    borderColor: addOpacity(Colors.red, 70),
    borderWidth: 2,
  },
  disabled: {
    borderColor: addOpacity(Colors.foreground, 10),
    borderWidth: 2,
  },
});

export const textStyles = StyleSheet.create({
  base: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
  dark: {
    color: Colors.gold,
  },
  goldOutline: { color: addOpacity(Colors.darkGray, 100) },
  red: { color: addOpacity(Colors.red, 90) },
  disabled: {
    color: addOpacity(Colors.foreground, 20),
  },
});
