import { Platform } from "react-native";

export const Colors = {
  red: "#E14F51",
  white: "#EEEEEE",
  gold: "#F9D5B6",
  lightGray: "#32383D",
  midGray: "#293035",
  darkGray: "#1E2327",
  background: "#32383D",
  text: "#EEEEEE",
};

export const Fonts = {
  custom: {
    headings: "rubikMono",
    time: "ubuntuMonoRegular",
  },
  system: Platform.select({
    ios: {
      /** iOS `UIFontDescriptorSystemDesignDefault` */
      sans: "system-ui",
      /** iOS `UIFontDescriptorSystemDesignSerif` */
      serif: "ui-serif",
      /** iOS `UIFontDescriptorSystemDesignRounded` */
      rounded: "ui-rounded",
      /** iOS `UIFontDescriptorSystemDesignMonospaced` */
      mono: "ui-monospace",
    },
    default: {
      sans: "normal",
      serif: "serif",
      rounded: "normal",
      mono: "monospace",
    },
  }),
};
