import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

export const Loader = ({ className = null, ...other }) => {
  return <div {...other} className={classNames("flex justify-center items-center", className)}>
    <FontAwesomeIcon icon={faSpinner} className="animate-loader" />
  </div>;
};
