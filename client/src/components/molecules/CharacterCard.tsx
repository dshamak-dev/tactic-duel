import classNames from "classnames";
import React from "react";
import { CharacterPreview } from "src/components/molecules/CharacterPreview";

export const CharacterList = ({
  characters,
  selected = [],
  activeClassName = null,
  onCharacterClick = null,
  ...other
}) => {
  if (characters == null) {
    return null;
  }

  return characters.map((it, index) => {
    const isSelected = selected ? selected.includes(it.id) : false;

    return (
      <CharacterPreview
        key={index}
        imageURL={it.avatarURL}
        selected={isSelected}
        onClick={() => {
          if (onCharacterClick) {
            onCharacterClick(it);
          }
        }}
      />
    );
  });
};
