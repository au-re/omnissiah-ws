import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { backgroundColors, borderColors, fontColors } from "../colors";
import { shadows, transitions } from "../shadows";

const base = defineStyle({
  height: "auto",
  padding: "3",
  _light: {
    color: fontColors.light.PRIMARY,
    background: backgroundColors.light.MID,
    _hover: {
      background: backgroundColors.light.MID,
    },
    _active: {
      background: backgroundColors.light.HIGHLIGHT,
    },
  },
  _dark: {
    color: fontColors.dark.PRIMARY,
    background: backgroundColors.dark.MID,
    _hover: {
      background: backgroundColors.dark.MID,
    },
    _active: {
      background: backgroundColors.dark.MID,
    },
  },
});

const minimalStyle = {
  _light: {
    bg: backgroundColors.light.BASE,
    border: `1px solid ${borderColors.light.PRIMARY}`,
    color: fontColors.light.PRIMARY,
    _hover: {
      boxShadow: shadows.light.PRIMARY,
    },
    _selected: {
      boxShadow: shadows.light.PRIMARY,
    },
    _active: {
      bg: backgroundColors.light.HIGHLIGHT,
      boxShadow: "none",
    },
    transition: transitions.SHADOW,
  },
  _dark: {
    bg: backgroundColors.dark.BASE,
    border: `1px solid ${borderColors.dark.SECONDARY}`,
    color: fontColors.dark.PRIMARY,
    _hover: {
      borderColor: borderColors.dark.PRIMARY,
    },
    _selected: {
      borderColor: borderColors.dark.PRIMARY,
    },
    _active: {
      bg: backgroundColors.dark.MID,
    },
    transition: transitions.SHADOW,
  },
};

const minimal = defineStyle({ height: "auto", padding: "3", ...minimalStyle });

export const buttonTheme = defineStyleConfig({
  variants: { base, minimal },
  defaultProps: { size: "sm" },
});
