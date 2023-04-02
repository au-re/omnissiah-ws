import { defineStyleConfig } from "@chakra-ui/react";
import { backgroundColors, borderColors, fontColors } from "../colors";

export const textareaTheme = defineStyleConfig({
  baseStyle: {
    borderRadius: "0",
    _light: {
      background: backgroundColors.light.HIGHLIGHT,
      color: fontColors.light.PRIMARY,
      borderColor: borderColors.light.SECONDARY,
      "::placeholder": {
        color: fontColors.light.SECONDARY,
      },
    },
    _dark: {
      background: backgroundColors.dark.HIGHLIGHT,
      color: fontColors.dark.PRIMARY,
      borderColor: borderColors.dark.SECONDARY,
      "::placeholder": {
        color: fontColors.dark.SECONDARY,
      },
    },
  },
});
