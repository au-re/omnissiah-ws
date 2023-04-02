import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const popoverMain = defineStyle({
  marginTop: "2",
  marginBottom: "2",
  fontSize: "2xl",
  fontWeight: "regular",
});

export const headingTheme = defineStyleConfig({
  variants: { popoverMain },
});
