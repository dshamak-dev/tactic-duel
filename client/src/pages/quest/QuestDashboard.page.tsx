import React from "react";
import { UserNavigation } from "src/components/molecules/UserNavigation";

export const QuestDashboardPage = () => {
  const user = {};

  return (
    <main>
      <UserNavigation />
      <div className="flex flex-col gap-4 justify-center px-12">
        <h1>No quests available!</h1>
        <h3>Come back later.</h3>
      </div>
    </main>
  );
};
