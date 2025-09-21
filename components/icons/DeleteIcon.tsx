import { Colors } from "@/constants/theme";
import { Path, Svg } from "react-native-svg";

interface SvgProps {
  color?: string;
  height?: string;
  width?: string;
}

export default function DeleteIcon({ color = Colors.text, height = "32", width = "32" }: SvgProps) {
  return (
    <Svg height={height} viewBox="0 -960 960 960" width={width}>
      <Path
        d="m280-120q-33 0-56.5-23.5t-23.5-56.5v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5t-56.5 23.5zm400-600h-400v520h400zm-320 440h80v-360h-80zm160 0h80v-360h-80zm-240-440v520z"
        fill={color}
      />
    </Svg>
  );
}
