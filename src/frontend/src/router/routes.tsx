import * as React from "react";
import { RouteObject } from "react-router-dom";
import { App, DayOne } from "~/pages";
import { Layout } from "~/components";
export const DEFAULT_ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "day-1",
        element: <DayOne />,
      },
    ],
  },
];
