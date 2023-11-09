import React, { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { BattlePage } from "src/battle/battle.page";

// const BattlePage = lazy(() =>
//   import('src/battle/battle.page').then((module) => ({ default: module.BattlePage }))
// );

const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <BattlePage />,
  },
]);

export const GamePage = () => {
  return <RouterProvider router={ROUTER} />;
};
