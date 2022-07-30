import * as React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { App, DayOne, Plug } from "~/pages";
export const DEFAULT_ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "day-1",
        element: <DayOne />,
      },
      {
        path: "plug-wallet",
        element: <Plug />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace={true} />,
  },
];
