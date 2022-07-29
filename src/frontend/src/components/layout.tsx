import * as React from "react";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VisuallyHidden,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import PlugConnect from "@psychedelic/plug-connect";
import { plug as PlugCanister } from "@canisters/plug";

const TEXT = {
  HOME: "Home",
  DAY_ONE: "Day 1",
  FOOTER: "Footer",
  CONNECTION: {
    STATUS: {
      ERROR: "connect error",
    },
    WORD: {
      ID: "id",
      CONNECT: "connect",
      CONNECTED: "connected",
    },
  },
};

const COLOR = {
  BADGE: [
    "whiteAlpha",
    "blackAlpha",
    "gray",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
    "linkedin",
    "facebook",
    "messenger",
    "whatsapp",
    "twitter",
    "telegram",
  ],
};

const wd = () => window as any;

const plug = () => wd()?.ic?.plug;

// const CANISTER = {
//   WHITE_LIST: ["rrkah-fqaaa-aaaaa-aaaaq-cai", "rno2w-sqaaa-aaaaa-aaacq-cai"],
// };

function onConnectCallback() {
  console.log("connect callback");
}

async function verifyConnectionAndAgent(setConnection: any) {
  try {
    let connected = await plug()?.isConnected();

    if (!connected) {
      const key = await plug()?.requestConnect();
      connected = !!key;
    }

    setConnection((prev) => ({
      ...prev,
      connected,
    }));

    // const agentExisted = await plug()?.agent;
    // if (connected && !agentExisted) {
    //   const agent = await plug()?.agent?.createAgent({});
    //   console.log("agent: ", agent);
    // }

    const sessionData = await plug()?.sessionManager?.sessionData;

    setConnection((prev) => ({
      ...prev,
      sessionData,
    }));
  } catch (e) {
    console.log(`${TEXT.CONNECTION.STATUS.ERROR}: ${e.message}`);
  }
}

export function Layout(props) {
  const [connection, setConnection] = useState<any>();

  return (
    <Grid
      templateAreas={`"header header"
                            "nav main"
                            "nav footer"`}
      gridTemplateRows={"50px auto 50px"}
      gridTemplateColumns={"250px auto"}
      gap={2}
      height={"100%"}
    >
      <GridItem area={"header"} background={"gray.100"} padding={2}>
        <Flex overflow={"auto"}>
          <LinkBox>
            <LinkOverlay as={RouterLink} to={"/"}>
              <Text>{TEXT.HOME}</Text>
            </LinkOverlay>
          </LinkBox>
          <Spacer />
          <Spacer />
          <HStack>
            {connection?.connected &&
              connection?.sessionData &&
              Object.entries(connection?.sessionData).map(([key, value]) => {
                const valueType = typeof value;
                if (
                  valueType === "string" ||
                  valueType === "boolean" ||
                  valueType === "number" ||
                  valueType === "bigint"
                ) {
                  return (
                    <Badge
                      key={key}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      maxWidth={100}
                      colorScheme={COLOR.BADGE[key.length % COLOR.BADGE.length]}
                    >
                      {key[0]}
                      {TEXT.CONNECTION.WORD.ID}: {value.toString()}
                    </Badge>
                  );
                }
              })}
            <Button
              onClick={() => verifyConnectionAndAgent(setConnection)}
              variant={"solid"}
              size={"sm"}
              disabled={connection?.connected}
            >
              <Text>
                {connection?.connected
                  ? TEXT.CONNECTION.WORD.CONNECTED
                  : TEXT.CONNECTION.WORD.CONNECT}
              </Text>
            </Button>
          </HStack>
          <VisuallyHidden>
            <PlugConnect onConnectCallback={onConnectCallback} />
          </VisuallyHidden>
        </Flex>
      </GridItem>
      <GridItem area={"nav"} background={"gray.100"} padding={2}>
        <VStack>
          <LinkBox>
            <LinkOverlay as={RouterLink} to={"day-1"}>
              <Text>{TEXT.DAY_ONE}</Text>
            </LinkOverlay>
          </LinkBox>
        </VStack>
      </GridItem>
      <GridItem area={"main"} background={"gray.200"} padding={2}>
        <Center width={"100%"} height={"100%"}>
          {/* MAIN VIEW */}
          <Outlet />
        </Center>
      </GridItem>
      <GridItem area={"footer"} background={"gray.100"} padding={2}>
        <Text>{TEXT.FOOTER}</Text>
      </GridItem>
    </Grid>
  );
}
