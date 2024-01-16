import React from "react";
import { Button } from "src/components/atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { AppLink } from "src/components/atoms/AppLink";
import classNames from "classnames";

interface LinkCardProps {
  icon: IconProp;
  text: string;
  href: string;
  className?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  icon,
  text,
  href,
  className,
  ...other
}) => {
  return (
    <AppLink
      {...other}
      className={classNames(
        "flex flex-col gap-4 px-4 py-8 border text-center",
        className
      )}
      href={href}
    >
      <div className="text-4xl">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <span>{text}</span>
      </div>
    </AppLink>
  );
};
