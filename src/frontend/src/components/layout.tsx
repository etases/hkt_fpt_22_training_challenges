import * as React from "react";
import { useState } from "react";
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
  PLUG: "Plug",
  CONNECTION: {
    STATUS: {
      ERROR: "connect error",
    },
    WORD: {
      ID: "id",
      CONNECT: "Connect to Plug",
      CONNECTED: "Plug connected",
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
      <GridItem
        area={"header"}
        backgroundColor={"gray.100"}
        padding={2}
        borderBottomRadius={"md"}
      >
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
                      maxWidth={200}
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
      <GridItem
        area={"nav"}
        backgroundColor={"gray.100"}
        padding={2}
        borderRightRadius={"md"}
      >
        <VStack>
          <LinkBox>
            <LinkOverlay as={RouterLink} to={"day-1"}>
              <Text>{TEXT.DAY_ONE}</Text>
            </LinkOverlay>
          </LinkBox>
          <LinkBox>
            <LinkOverlay as={RouterLink} to={"plug-wallet"}>
              <Text>{TEXT.PLUG}</Text>
            </LinkOverlay>
          </LinkBox>
        </VStack>
      </GridItem>
      <GridItem
        area={"main"}
        backgroundColor={"gray.200"}
        padding={2}
        borderLeftRadius={"md"}
      >
        <Center width={"100%"} height={"100%"}>
          {/* MAIN VIEW */}
          <Outlet />
        </Center>
      </GridItem>
      <GridItem
        area={"footer"}
        backgroundColor={"gray.100"}
        padding={2}
        borderTopRadius={"md"}
      >
        <Text>{TEXT.FOOTER}</Text>
      </GridItem>
    </Grid>
  );
}
