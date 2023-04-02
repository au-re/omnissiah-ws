import { createIcon } from "@chakra-ui/react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const convertIcon = (faIcon: IconDefinition) => {
  const { icon, iconName } = faIcon;

  return createIcon({
    displayName: iconName,
    viewBox: `0 0 ${icon[0]} ${icon[1]}`,
    d: icon[4] as string,
  });
};
