import { Colors, Fonts } from "@/constants/theme";
import { StyleSheet, Text, type TextProps } from "react-native";

export type ThemedTextProps = TextProps & {
  type?: "title" | "subtitle";
  center?: boolean;
};

export function Title({ style, type = "title", center = false, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: Colors.text },
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        center ? { textAlign: "center" } : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "regular",
    lineHeight: 40,
    fontFamily: Fonts.custom.headings,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "regular",
    lineHeight: 20,
    fontFamily: Fonts.custom.headings,
  },
});
