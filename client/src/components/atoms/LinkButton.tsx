import React from "react";
import { AppLink } from "src/components/atoms/AppLink";
import { Button } from "src/components/atoms/Button";
import "src/styles/button.style.css";

export const LinkButton = ({ href, activeClassName, ...other }) => {
  return (
    <AppLink href={href} activeClassName={activeClassName}>
      <Button {...other} />
    </AppLink>
  );
};
