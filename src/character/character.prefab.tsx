import React from "react";
import { Character } from "src/character/character";

interface Props {
  character: Character;
}

export const CharacterPrefab: React.FC<Props> = ({ character }) => {
  return (
    <div>
      <div data-aria="character"
          style={{
            position: "absolute",
            left: "calc(50% )",
            bottom: "0.5rem",
            height: "3rem",
            width: "0",
          }}>
        <div
          data-aria="body"
          style={{
            position: "absolute",
            left: "calc(50% - 0.9rem)",
            bottom: "0.2rem",
            height: "2.8rem",
            width: "1.8rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "2rem",
            zIndex: 1,
          }}
        ></div>
        <div
          data-aria="head"
          style={{
            position: "absolute",
            left: "calc(50% - 0.8rem)",
            top: "-1rem",
            height: "2rem",
            width: "2rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "2rem",
            zIndex: 2,
          }}
        ></div>
        <div
          data-aria="hand-left"
          style={{
            position: "absolute",
            right: "calc(50% - 1.8rem)",
            top: "calc(50% - 0.5rem)",
            height: "1rem",
            width: "1rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "100%",
            zIndex: 0,
          }}
        ></div>
        <div
          data-aria="hand-right"
          style={{
            position: "absolute",
            left: "calc(50% - 2rem)",
            top: "calc(50% - 0.5rem)",
            height: "1rem",
            width: "1rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "100%",
            zIndex: 1,
          }}
        ></div>
        <div
          data-aria="foot-left"
          style={{
            position: "absolute",
            right: "calc(50% - 1.5rem)",
            bottom: "-0.5rem",
            height: "0.5rem",
            width: "0.8rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "0.5rem",
            zIndex: 0,
          }}
        ></div>
        <div
          data-aria="foot-right"
          style={{
            position: "absolute",
            left: "calc(50% - 1rem)",
            bottom: "-0.5rem",
            height: "0.5rem",
            width: "0.8rem",
            border: "1px solid black",
            background: "white",
            borderRadius: "0.5rem",
            zIndex: 1,
          }}
        ></div>
      </div>
    </div>
  );
};
