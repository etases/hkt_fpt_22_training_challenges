import {
  Center,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { ChakraProvider } from "~/providers";

export function App() {
  return (
    <ChakraProvider>
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
          <LinkBox>
            <LinkOverlay as={RouterLink} to={"/"}>
              <Text>Home</Text>
            </LinkOverlay>
          </LinkBox>
        </GridItem>
        <GridItem area={"nav"} background={"gray.100"} padding={2}>
          <VStack>
            <LinkBox>
              <LinkOverlay as={RouterLink} to={"day-1"}>
                <Text>Day 1</Text>
              </LinkOverlay>
            </LinkBox>
          </VStack>
        </GridItem>
        <GridItem area={"main"} background={"gray.200"} padding={2}>
          <Center width={"100%"} height={"100%"}>
            <Outlet />
          </Center>
        </GridItem>
        <GridItem area={"footer"} background={"gray.100"} padding={2}>
          <Text>footer</Text>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
