import React, { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import { App } from "~/pages/app";

import "~/styles/index.css";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
