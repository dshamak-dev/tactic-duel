import React from "react";
import { AppLink } from "src/components/atoms/AppLink";
import { UserNavigation } from "src/components/molecules/UserNavigation";

export const ItemsPage = () => {
  const user = {};

  return (
    <main>
      <UserNavigation />
      <div className="flex flex-col gap-4 justify-center px-12">
        <h1>No items found!</h1>
        <h3>Buy some at the <AppLink href="/shop" className="underline">SHOP</AppLink>.</h3>
      </div>
    </main>
  );
};
