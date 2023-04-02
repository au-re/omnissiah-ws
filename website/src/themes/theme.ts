import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";
import { badgeTheme } from "./components/Badge";
import { buttonTheme } from "./components/Button";
import { dividerTheme } from "./components/Divider";
import { headingTheme } from "./components/Heading";
import { skeletonTheme } from "./components/Skeleton";
import { textareaTheme } from "./components/Textarea";
import { fonts } from "./fonts";
import { globalStyles } from "./foundations/global";
import { layerStyles, textStyles } from "./foundations/layers";

export const omnissiahTheme = extendTheme({
  colors,
  fonts,
  fontSizes: {
    xs: "9px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  layerStyles,
  styles: globalStyles,
  textStyles,
  components: {
    Skeleton: skeletonTheme,
    Button: buttonTheme,
    Textarea: textareaTheme,
    Badge: badgeTheme,
    Divider: dividerTheme,
    Heading: headingTheme,
  },
});
