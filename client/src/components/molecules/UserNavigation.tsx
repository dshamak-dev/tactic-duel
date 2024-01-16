import {
  faBriefcase,
  faHome,
  faShield,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AppLink } from "src/components/atoms/AppLink";
import { LinkButton } from "src/components/atoms/LinkButton";
import { UserAvatar } from "src/components/molecules/UserAvatar";
import { useUser } from "src/support/useUser";

interface UserNavigationProps {}

const _links = [
  {
    href: "/",
    text: null,
    icon: faHome
  },
  {
    href: "/characters",
    text: "characters",
    icon: faUsers,
  },
  {
    href: "/items",
    text: "items",
    icon: faBriefcase,
  },
  // {
  //   href: "/guild",
  //   text: "guild",
  //   icon: faShield,
  // },
];

export const UserNavigation: React.FC<UserNavigationProps> = ({}) => {
  const {user} = useUser(); 

  return (
    <nav className="flex justify-between px-4 py-2">
      <div className="flex gap-4 h-fit">
        {_links.map(({ href, text, icon }, index) => {
          return (
            <LinkButton
              key={index}
              href={href}
              activeClassName="bg-black text-white"
              className="flex gap-4 items-center px-4 py-2 h-12"
            >
              {text ? <span>{text}</span> : null}
              <FontAwesomeIcon icon={icon} />
            </LinkButton>
          );
        })}
      </div>
      <div>
        <div></div>
        <UserAvatar user={user} />
      </div>
    </nav>
  );
};
