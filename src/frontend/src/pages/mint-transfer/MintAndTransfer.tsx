import { Flex, LinkBox, LinkOverlay, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import * as React from 'react';

export function MintAndTransfer() {
  return <Flex width={"100%"} height={"100%"}>
    <VStack  width={"100%"} height={"100%"}>
      <Text>My NFT</Text>
      <Wrap>
        <WrapItem>
          image
        </WrapItem>
      </Wrap>
    </VStack>
    <VStack>
      <LinkBox>
        <LinkOverlay as={Link} to={"/mint"}>Mint</LinkOverlay>
      </LinkBox>
      <LinkBox>
        <LinkOverlay as={Link} to={"/transfer"}>Transfer</LinkOverlay>
      </LinkBox>
    </VStack>
  </Flex>
}