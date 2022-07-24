import * as React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { DEFAULT_ROUTES } from "./routes";

export function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

function Routes() {
  const routes = useRoutes(DEFAULT_ROUTES);
  return routes;
}
