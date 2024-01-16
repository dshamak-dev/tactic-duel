import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { AppLink } from "src/components/atoms/AppLink";

export const UserAvatar = ({ user, ...other }) => {
  return (
    <AppLink
      href="/account"
      className="flex w-16 h-16 items-center justify-center text-2xl border"
    >
      <FontAwesomeIcon icon={faUser} />
    </AppLink>
  );
};
