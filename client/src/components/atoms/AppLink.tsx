import classNames from "classnames";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

export const AppLink = ({
  href,
  className = null,
  activeClassName = null,
  ...other
}) => {
  const { pathname } = useLocation();

  const isActive = useMemo(() => {
    return href === pathname;
  }, [pathname]);

  return (
    <Link
      {...other}
      className={classNames(className, {
        [activeClassName]: activeClassName && isActive,
      })}
      to={href}
    />
  );
};
