import { Colors } from "@/constants/theme";
import { Path, Svg } from "react-native-svg";

interface SvgProps {
  color?: string;
  height?: string;
  width?: string;
}

export default function AddIcon({ color = Colors.text, height = "32", width = "32" }: SvgProps) {
  return (
    <Svg height={height} viewBox="0 -960 960 960" width={width}>
      <Path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" fill={color} />
    </Svg>
  );
}
