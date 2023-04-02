import { mode } from "@chakra-ui/theme-tools";
import { fontColors } from "../colors";

export const globalStyles = {
  global: (props: any) => ({
    "::selection": {
      color: fontColors.light.PRIMARY,
      background: "red.700",
    },
    html: {
      height: "100vh",
      background: "black",
    },
    body: {
      height: "100%",
      background: "black",
      fontSize: "md",
      color: mode("font.light.PRIMARY", "font.dark.PRIMARY")(props),
    },
  }),
};
