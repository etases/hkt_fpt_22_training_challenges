import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Wrap,
  WrapItem,
  Grid,
  GridItem,
  Image,
  Text,
  useToast,
  Box,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react";
import { Input, Popover } from "~/components";
import { useComponentDidMount, web3StorageClient } from "~/hooks";
import { plug as PlugCanister } from "@canisters/plug";

const TEXT = {
  LOAD_IMAGE: "Load image(s)",
  SELECT_IMAGES: "Select image(s)",
  MINT: "Mint",
  LOAD: "Load",
};

export function Plug() {
  const [files, setFiles] = useState<FileList>();
  const [images, setImages] = useState<any>([]);
  const [transferId, setTransferId] = useState<string>();
  const toast = useToast();

  const componentDidMount = useComponentDidMount();

  useEffect(() => {
    if (componentDidMount) {
      const imageLS = JSON.parse(localStorage.getItem("images"));
      if (imageLS) {
        localStorage.removeItem("images");
      }
      setImages(imageLS);
    }
  }, []);

  return (
    <Grid
      gridTemplateAreas={`"loadButton input mintButton"
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
                  onChange: ({ target: { files: fileList } }) => {
                    setFiles(fileList);
                  },
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
                onClick={async () => {
                  toast({
                    status: "loading",
                    title: "Uploading",
                    description: "Image(s) is being upload to the web",
                    duration: 1000,
                  });
                  // upload file to ipfs
                  const cid = await web3StorageClient.put(files);
                  // upload failed
                  if (!cid) {
                    toast({
                      status: "error",
                      title: "Failed to upload",
                    });
                    return;
                  }
                  // upload success
                  toast({
                    status: "success",
                    title: "Uploaded with cid " + cid,
                  });
                  // get file
                  const res = await web3StorageClient.get(cid);
                  // failed to get file
                  if (!res.ok) {
                    toast({
                      status: "error",
                      title: "failed to get image",
                    });
                    return;
                  }
                  // file available
                  const fileList = await res.files();
                  // select file from response
                  const image = fileList?.[0];
                  // filter uploaded file out from current list
                  const filteredList = images?.filter(
                    (img) => img?.cid !== image?.cid
                  );
                  // add uploaded file to end of the list
                  const updatedList = [
                    ...filteredList,
                    {
                      cid: image?.cid,
                      fileName: image?.name,
                      ipfsUri: `https://ipfs.io/ipfs/${image.cid}`,
                    },
                  ];
                  // update list
                  setImages(updatedList);
                  // update localstorage
                  localStorage.setItem("images", JSON.stringify(updatedList));
                }}
              >
                {TEXT.LOAD}
              </Button>
            ),
          }}
        />
      </GridItem>
      <GridItem>
        <Flex height={"100%"}>
          <Center>
            <Text>Wallet</Text>
          </Center>
          <Spacer />
          <Input
            inputProps={{
              value: transferId,
              onChange: ({ target: { value } }) => {
                setTransferId(value);
              },
              height: "100%",
            }}
          />
          <Spacer />
          <Button height={"100%"}>Transfer</Button>
        </Flex>
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
        overflow={"auto"}
      >
        <Wrap width={"100%"} height={"100%"}>
          {images?.length > 0 &&
            images?.map((img) => (
              <WrapItem key={img?.cid}>
                <Box
                  borderRadius={"md"}
                  maxWidth={"sm"}
                  maxHeight={"sm"}
                  overflow={"hidden"}
                >
                  <Image src={img?.ipfsUri} />
                </Box>
              </WrapItem>
            ))}
        </Wrap>
      </GridItem>
    </Grid>
  );
}
