import { Box, keyframes } from "@chakra-ui/react";

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const Rotation = ({ children, isRotating }: any) => {
  return (
    <Box width="250px" position="absolute" animation={isRotating ? `${rotation} 42s infinite linear` : ""}>
      {children}
    </Box>
  );
};
