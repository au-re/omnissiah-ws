import { backgroundColors, borderColors, fontColors } from "../colors";
import { shadows, transitions } from "../shadows";

// todo: work in progress, finish to align styles

export const layerStyles = {
  baseMid: {
    transition: transitions.SHADOW,
    cursor: "pointer",
    ".chakra-ui-dark &": {
      border: `1px solid ${borderColors.dark.SECONDARY}`,
    },
    ".chakra-ui-light &": {
      border: `1px solid ${borderColors.light.SECONDARY}`,
    },
    _hover: {
      ".chakra-ui-light &": {
        boxShadow: shadows.light.PRIMARY,
      },
    },
    _focus: {
      ".chakra-ui-light &": {
        boxShadow: shadows.light.PRIMARY,
      },
    },
    padding: "2",
    display: "flex",
  },
  listItem: {
    cursor: "pointer",
    _hover: {
      ".chakra-ui-light &": {
        bg: backgroundColors.light.HIGHLIGHT,
      },
      ".chakra-ui-dark &": {
        bg: backgroundColors.dark.BASE,
      },
    },
  },
  baseMidRoundedNew: {
    ".chakra-ui-dark &": {
      bg: backgroundColors.dark.BASE,
      borderLeft: `1px solid ${borderColors.dark.SECONDARY}`,
      borderBottom: `1px solid ${borderColors.dark.SECONDARY}`,
    },
    ".chakra-ui-light &": {
      bg: backgroundColors.light.BASE,
      borderLeft: `1px solid ${borderColors.light.SECONDARY}`,
      borderBottom: `1px solid ${borderColors.light.SECONDARY}`,
    },
    padding: "2",
    display: "flex",
  },
  editor: {
    minHeight: "120px",
    transition: transitions.SHADOW,
    borderTopRadius: "8px",
    borderBottomRadius: "8px",
    fontSize: "xl",
    ".chakra-ui-dark &": { bg: backgroundColors.dark.HIGHLIGHT },
    ".chakra-ui-light &": {
      border: `1px solid ${borderColors.light.PRIMARY}`,
    },
    _focus: {
      ".chakra-ui-light &": {
        boxShadow: shadows.light.PRIMARY,
      },
      outline: "none",
    },
  },
};

export const textStyles = {
  primary: {
    ".chakra-ui-dark &": { color: fontColors.dark.PRIMARY },
    ".chakra-ui-light &": { color: fontColors.light.PRIMARY },
  },
  secondary: {
    ".chakra-ui-dark &": { color: fontColors.dark.SECONDARY },
    ".chakra-ui-light &": { color: fontColors.light.SECONDARY },
  },
};
