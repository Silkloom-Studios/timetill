import { Link, RelativePathString } from "expo-router";
import { Text } from "react-native";
import { BtnProps, pressableStyles, textStyles } from "./Btn";

interface BtnLinkProps extends BtnProps {
  href: RelativePathString;
}

export default function BtnLink({ href, onPress, text, type, disabled = false, style = {} }: BtnLinkProps) {
  return (
    <Link
      href={href}
      style={[pressableStyles.base, disabled ? pressableStyles.disabled : pressableStyles[type], style]}
      onPress={() => (disabled ? {} : onPress())}
    >
      <Text style={[textStyles.base, disabled ? textStyles.disabled : textStyles[type]]}>{text}</Text>
    </Link>
  );
}
