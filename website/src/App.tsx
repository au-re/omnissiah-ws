import { Box, Center, Flex, Image, Input, Stack, Text, chakra, keyframes } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Glitch } from "./components/Glitch";
import { Rotation } from "./components/Rotation";
import { baseUrl } from "./constants";

const BlinkCaret = keyframes`
  from, to { color: transparent }
  50% { color: #ffffffdd }
`;

const createCompletion = async (query: string) => {
  const res = await axios.post(`${baseUrl}/v1/query`, { query });
  return res.data;
};

function App() {
  const [, setError] = useState(false);
  const [lastRequest, setLastRequest] = useState("");
  const [isLoadingResponse, setLoadingResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [value, setValue] = useState("");

  const queryTheMachineGod = async (query: string) => {
    setError(false);
    setLoadingResponse(true);
    try {
      const { response, results } = await createCompletion(query);
      console.log(results);
      setResponse(response);
    } catch (error) {
      setError(true);
    }
    setLoadingResponse(false);
  };

  return (
    <Box>
      <Center paddingY="4rem" paddingX="2rem">
        <Stack gap={4} width="2xl" maxWidth="100%">
          <Flex justifyContent="center" position="relative" height="250px" opacity={isLoadingResponse ? 0.8 : 0.4}>
            <Rotation isRotating={isLoadingResponse}>
              <Image top={0} transform="rotate(10, 300, 300)" width="250px" src="Cog.svg" />
            </Rotation>
            <Image top="60px" position="absolute" transform="rotate(10, 300, 300)" maxWidth="120px" src="Phi.svg" />
          </Flex>
          <Box>
            <Flex border="1px solid white" padding="2" borderBottom={0} opacity={0.4} alignItems="top">
              <Glitch text="The machine god awaits your incantation..." />
            </Flex>
            <Input
              size="lg"
              fontSize="lg"
              color="white"
              borderColor="#666666"
              _focusVisible={{ outline: "pink" }}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  queryTheMachineGod(value);
                  setLastRequest(value);
                  setValue("");
                }
              }}
              value={value}
              borderRadius={0}
              placeholder="Type here"
            />
          </Box>
          <Text fontSize="xl">{lastRequest}</Text>
          {isLoadingResponse && (
            <>
              <Text>
                loading...{" "}
                <chakra.span lineHeight={"2rem"} animation={`${BlinkCaret} 0.9s step-end infinite`} fontSize="xl">
                  ▮
                </chakra.span>
              </Text>
            </>
          )}
          <Box fontSize="lg" whiteSpace="pre-wrap" color="white">
            {response}
          </Box>
        </Stack>
      </Center>
    </Box>
  );
}

export default App;
