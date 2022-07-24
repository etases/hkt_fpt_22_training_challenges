import * as React from "react";
import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import { Router } from "~/routers";

import "~/styles/index.css";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
