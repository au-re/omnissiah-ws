import { mode } from "@chakra-ui/theme-tools";
import { fontColors } from "../colors";

export const globalStyles = {
  global: (props: any) => ({
    "::selection": {
      color: fontColors.light.PRIMARY,
      background: "teal.300",
    },
    body: {
      fontSize: "md",
      bg: mode("background.light.BASE", "background.dark.BASE")(props),
      color: mode("font.light.PRIMARY", "font.dark.PRIMARY")(props),
      borderColor: mode("border.light.PRIMARY", "border.dark.PRIMARY")(props),
    },
  }),
};
