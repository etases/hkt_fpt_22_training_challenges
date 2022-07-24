import * as React from "react";

import {
  ChakraProvider as Provider,
  ChakraProviderProps,
} from "@chakra-ui/react";

export function ChakraProvider(props: ChakraProviderProps) {
  return <Provider resetCSS={true} {...props} />;
}
