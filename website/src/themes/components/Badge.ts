import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { fontColors } from "../colors";

const base = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "gray.400",
});

const relation = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "blue.400",
});

const concept = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "teal.400",
});

const system = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "purple.400",
});

const component = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "yellow.400",
});

const user = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "red.400",
});

const action = defineStyle({
  color: fontColors.light.PRIMARY,
  background: "blue.400",
});

export const badgeTheme = defineStyleConfig({
  variants: { base, relation, concept, system, component, user, action },
  baseStyle: {
    display: "flex",
    alignItems: "center",
  },
  defaultProps: {
    size: "lg",
    variant: "base",
  },
});
