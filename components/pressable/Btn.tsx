import { Colors } from "@/constants/theme";
import { addOpacity } from "@/utils/colors";
import { Pressable, StyleSheet, Text } from "react-native";

interface BtnProps {
  onPress: () => void;
  text: string;
  type: "dark" | "goldOutline" | "red";
  disabled?: boolean;
}

export default function Btn({ onPress, text, type, disabled = false }: BtnProps) {
  return (
    <Pressable
      style={[pressableStyles.base, disabled ? pressableStyles.disabled : pressableStyles[type]]}
      onPress={() => (disabled ? {} : onPress())}
    >
      <Text style={[textStyles.base, disabled ? textStyles.disabled : textStyles[type]]}>{text}</Text>
    </Pressable>
  );
}

const pressableStyles = StyleSheet.create({
  base: {
    borderRadius: 4,
    paddingVertical: 10,
  },
  dark: {
    backgroundColor: Colors.darkGray,
    borderColor: Colors.darkGray,
    borderWidth: 2,
  },
  goldOutline: {},
  red: {
    borderColor: addOpacity(Colors.red, 70),
    borderWidth: 2,
  },
  disabled: {
    borderColor: addOpacity(Colors.foreground, 10),
    borderWidth: 2,
  },
});

const textStyles = StyleSheet.create({
  base: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  dark: {
    color: Colors.gold,
  },
  goldOutline: {},
  red: { color: addOpacity(Colors.red, 80) },
  disabled: {
    color: addOpacity(Colors.foreground, 20),
  },
});
