import { defineStyle, defineStyleConfig, cssVar } from "@chakra-ui/react";
import { backgroundColors } from "../colors";

const $startColor = cssVar("skeleton-start-color");
const $endColor = cssVar("skeleton-end-color");

const base = defineStyle({
  _light: {
    [$startColor.variable]: backgroundColors.light.HIGHLIGHT,
    [$endColor.variable]: backgroundColors.light.MID,
  },
  _dark: {
    [$startColor.variable]: backgroundColors.dark.HIGHLIGHT,
    [$endColor.variable]: backgroundColors.dark.MID,
  },
});

export const skeletonTheme = defineStyleConfig({
  variants: { base },
  defaultProps: {
    variant: "base",
  },
});
