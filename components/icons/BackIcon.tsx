import { Colors } from "@/constants/theme";
import { Path, Svg } from "react-native-svg";

interface SvgProps {
  color?: string;
  height?: string;
  width?: string;
}

export default function BackIcon({ color = Colors.text, height = "32", width = "32" }: SvgProps) {
  return (
    <Svg height={height} viewBox="0 -960 960 960" width={width}>
      <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" fill={color} />
    </Svg>
  );
}
