import * as React from "react";
import {
  Button,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Input, Popover } from "~/components";

const TEXT = {
  LOAD_IMAGE: "Load image(s)",
  SELECT_IMAGES: "Select image(s)",
  MINT: "Mint",
  LOAD: "Load",
};

export function Plug() {
  const toast = useToast();

  return (
    <Grid
      gridTemplateAreas={`"loadButton space mintButton"
                          "container container container"`}
      gridTemplateColumns={"200px auto 200px"}
      gridTemplateRows={"50px auto"}
      width={"100%"}
      height={"100%"}
      gap={2}
    >
      <GridItem gridArea={"loadButton"}>
        <Popover
          popoverTriggerProps={{
            children: (
              <Button colorScheme={"blue"} width={"100%"} height={"100%"}>
                {TEXT.LOAD_IMAGE}
              </Button>
            ),
          }}
          popoverBodyProps={{
            children: (
              <Input
                inputProps={{
                  type: "file",
                }}
              />
            ),
          }}
          popoverHeaderProps={{
            children: <Text>{TEXT.SELECT_IMAGES}</Text>,
          }}
          popoverFooterProps={{
            children: (
              <Button
                variant={"outline"}
                colorScheme={"blue"}
                onClick={() => {
                  toast({
                    status: "loading",
                    title: "Uploading",
                    description: "Image(s) is being upload to the web",
                    duration: 1000,
                    onCloseComplete: () => {
                      toast({
                        status: "success",
                        title: "Uploaded",
                        description: "Image(s) is uploaded to the web",
                        duration: 2000,
                      });
                    },
                  });
                }}
              >
                {TEXT.LOAD}
              </Button>
            ),
          }}
        />
      </GridItem>
      <GridItem gridArea={"mintButton"}>
        <Button
          colorScheme={"blue"}
          width={"100%"}
          height={"100%"}
          onClick={() => {
            toast({
              status: "loading",
              title: "Minting",
              duration: 2000,
              onCloseComplete: () => {
                toast({
                  status: "success",
                  title: "Minted",
                  duration: 2500,
                });
              },
            });
          }}
        >
          {TEXT.MINT}
        </Button>
      </GridItem>
      <GridItem
        gridArea={"container"}
        background={"gray.300"}
        borderRadius={"md"}
      >
        <Wrap width={"100%"} height={"100%"}>
          <WrapItem>
            <Image />
          </WrapItem>
        </Wrap>
      </GridItem>
    </Grid>
  );
}
