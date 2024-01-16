import React from "react";
import { Link, createBrowserRouter, redirect } from "react-router-dom";
import { validateAuth } from "src/auth/auth.controller";
import { AccountPage } from "src/pages/account/Account.page";
import { BattleSessionPage } from "src/pages/battle/BattleSession.page";
import { CampaignPage } from "src/pages/campaign/Campaign.page";
import { CharactersPage } from "src/pages/characters/Characters.page";
import { ItemsPage } from "src/pages/items/Items.page";
import { LobbyPage } from "src/pages/lobby/Lobby.page";
import { MainPage } from "src/pages/main/Main.page";
import { QuestDashboardPage } from "src/pages/quest/QuestDashboard.page";
import { ShopPage } from "src/pages/shop/Shop.page";
import { SignInPage } from "src/pages/signin/SignIn.page";
import { SignUpPage } from "src/pages/signup/SignUp.page";

export const appRouter = createBrowserRouter([
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    loader: async ({ params, request, ...other }) => {
      const logged = await validateAuth();

      const parts = new URL(request.url);

      return logged ? null : redirect(`/signin?redirect=${parts.pathname}`);
    },
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/account",
        element: <AccountPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/characters",
        element: <CharactersPage />,
      },
      {
        path: "/items",
        element: <ItemsPage />,
      },
      {
        path: "/lobby",
        element: <LobbyPage />,
      },
      {
        path: "/battle/:id",
        element: <BattleSessionPage />,
      },
      {
        path: "/quests",
        element: <QuestDashboardPage />,
      },
      {
        path: "/campaign",
        element: <CampaignPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    errorElement: <div>404 error</div>,
  },
]);

function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">go home</Link>
    </div>
  );
}
