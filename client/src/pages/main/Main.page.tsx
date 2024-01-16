import React from "react";
import { LinkCard } from "src/components/atoms/LinkCard";
import { UserNavigation } from "src/components/molecules/UserNavigation";
import { mainPageLinks } from "src/pages/main/main.model";

export const MainPage = () => {
  const user = {};

  return (
    <main>
      <UserNavigation />
      <div className="flex flex-wrap justify-center gap-8 px-12">
        {mainPageLinks.map(({ text, href, icon }, index) => {
          return (
            <LinkCard
              key={index}
              href={href}
              text={text}
              icon={icon}
              className="min-w-[9rem]"
            />
          );
        })}
      </div>
    </main>
  );
};
