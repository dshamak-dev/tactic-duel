import React from "react";
import { UserNavigation } from "src/components/molecules/UserNavigation";

export const ShopPage = () => {
  return (
    <main>
      <UserNavigation />
      <div className="flex flex-col gap-4 justify-center px-12">
        <h1>Shop is closed!</h1>
        <h3>I will come back in 15 minutes.</h3>
      </div>
    </main>
  );
};
