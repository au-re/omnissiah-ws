import { defineStyleConfig } from "@chakra-ui/react";
import { borderColors } from "../colors";

export const dividerTheme = defineStyleConfig({
  baseStyle: {
    _light: {
      borderColor: borderColors.light.SECONDARY,
    },
    _dark: {
      borderColor: borderColors.dark.SECONDARY,
    },
  },
});
