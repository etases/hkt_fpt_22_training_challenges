import { day_1 as DayOneCanister } from "@canisters/day_1";
import { StackDivider, VStack } from "@chakra-ui/react";
import * as React from "react";
import { Add } from "~/components";

export function DayOne() {
  return (
    <VStack
      width={"100%"}
      height={"100%"}
      spacing={1}
      align={"stretch"}
      divider={<StackDivider borderColor={"gray.300"} />}
    >
      <Add canister={DayOneCanister} />
    </VStack>
  );
}
