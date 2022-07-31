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
  VStack,
} from "@chakra-ui/react";
import { Input, Popover } from "~/components";
import { useComponentDidMount, web3StorageClient } from "~/hooks";
import { plug as PlugCanister } from "@canisters/plug";
import { TokenMetadata } from "@canisters/plug/plug.did";

const TEXT = {
  LOAD_IMAGE: "Load image(s)",
  SELECT_IMAGES: "Select image(s)",
  MINT: "Mint",
  LOAD: "Load",
};

export function Plug() {
  const [files, setFiles] = useState<FileList>();
  const [images, setImages] = useState<any>([]);
  const [sessionData, setSessionData] = useState<any>();
  const [selectedImage, setSelectedImage] = useState<any>();
  const [nftName, setNftName] = useState<string>("");
  const [nftDescription, setNftDescription] = useState<string>("");
  const [transferId, setTransferId] = useState<string>();
  const toast = useToast();

  const componentDidMount = useComponentDidMount();

  useEffect(() => {
    // if (componentDidMount) {
    const imageLS = JSON.parse(localStorage.getItem("images"));
    console.log("images", imageLS);
    if (imageLS?.length > 0) {
      setImages(imageLS);
    }
    // PlugCanister.allTokens().then(result => {
    //   console.log("all token", result);
    //   setImages(result || []);
    //   PlugCanister.tokenURI(result[0]).then(ur => {
    //     console.log("tokenURI", ur);
    //   })
    // })

    // setSessionData(JSON.parse(localStorage.getItem("sessionData")));
    // }
  }, [componentDidMount]);

  return (
    <Grid
      gridTemplateAreas={`"container container mintButton"
                          "container container loadButton"`}
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
              <Button colorScheme={"blue"} width={"100%"}>
                Create
              </Button>
            ),
          }}
          popoverBodyProps={{
            children: (
              <VStack>
                <Input
                  inputProps={{
                    type: "file",
                    onChange: ({ target: { files: fileList } }) => {
                      setFiles(fileList);
                    },
                  }}
                />
                <Input
                  inputProps={{
                    placeholder: "NFT Name",
                    value: nftName,
                    onChange: ({ target: { value } }) => {
                      setNftName(value);
                    }
                  }}
                />
                <Input
                  inputProps={{
                    placeholder: "Description",
                    value: nftDescription,
                    onChange: ({ target: { value } }) => {
                      setNftDescription(value);
                    }
                  }}
                />
              </VStack>
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

                  // PlugCanister.mint(cid)
                  const tokenMetadata: TokenMetadata = {
                    uri: `https://ipfs.io/ipfs/${cid}`,
                    description: nftDescription,
                  }
                  const tokenId = await PlugCanister.mint(tokenMetadata);
                  setImages(prev => prev?.filter(id => id !== tokenId));
                  setImages(prev => [...prev, tokenId]);
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
                Submit
              </Button>
            ),
          }}
        />
      </GridItem>
      <GridItem gridArea={"mintButton"}>
        <Button
          colorScheme={"blue"}
          width={"100%"}
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
        borderRadius={"md"}
        overflow={"auto"}
      >
        <VStack height={"100%"}>
          <Text>My NFT</Text>
          <Wrap width={"100%"} height={"100%"}>
            {images?.length > 0 &&
              images?.map((img) => {
                return (
                  <WrapItem key={img.cid}>
                    <Box
                      borderRadius={"md"}
                      maxWidth={"sm"}
                      maxHeight={"sm"}
                      overflow={"hidden"}
                      onClick={() => {
                        setSelectedImage(img);
                      }}
                    >
                      <Image src={img.ipfsUri} />
                    </Box>
                  </WrapItem>
                )
              })}
          </Wrap>
        </VStack>
      </GridItem>
    </Grid>
  );
}
