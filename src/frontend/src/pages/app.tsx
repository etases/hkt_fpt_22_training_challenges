import * as React from "react";
import { ChakraProvider } from "~/providers";
import { Layout } from "~/components";

export function App() {
  return (
    <ChakraProvider>
      <Layout />
    </ChakraProvider>
  );
}
