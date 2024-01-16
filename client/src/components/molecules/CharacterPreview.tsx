import classNames from "classnames";
import React from "react";

export const CharacterPreview = ({
  imageURL = null,
  selected = false,
  children = null,
  onClick = null,
  ...other
}) => {
  return (
    <div
      {...other}
      onClick={onClick}
      className={classNames(
        "flex justify-center items-center",
        "h-24",
        "bg-cover bg-center bg-no-repeat",
        {
          "opacity-50 hover:opacity-100": !selected,
          "opacity-100 border-4 border-black/50": selected,
          "cursor-pointer": !!onClick,
        }
      )}
      style={{ backgroundImage: imageURL ? `url(${imageURL})` : null }}
    >
      {children}
    </div>
  );
};
