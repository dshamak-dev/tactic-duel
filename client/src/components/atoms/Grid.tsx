import classNames from "classnames";
import React from "react";

export const Grid = ({ className = null, ...other }) => {
  return <div {...other} className={classNames("grid", className)} />;
};
