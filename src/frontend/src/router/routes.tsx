import * as React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { App, Customer, Register, Mint, TransferNTF, MintAndTransfer, Plug } from "~/pages";
export const DEFAULT_ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path: "plug-wallet",
      //   element: <Plug />,
      // },
      {
        path: "mint-and-transfer",
        element: <Plug />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "mint",
        element: <Mint />,
      },
      {
        path: "transfer",
        element: <TransferNTF />,
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace={true} />,
  },
];
