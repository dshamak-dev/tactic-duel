import React, { useState } from "react";
import { BattleActionType, battleActionIcon } from "src/battle/battle.model";
import { BattleTurn } from "src/battle/battle.turn";
import { Player } from "src/player/player";

interface Props {
  player: Player;
  actions: BattleActionType[];
  onChange: (playerId: Player["id"], actions: BattleActionType[]) => void;
  turn: BattleTurn;
}

export const BattleTurnControls: React.FC<Props> = ({
  player,
  actions,
  turn,
  onChange,
}) => {
  const handleActionChange = (index: number, action: BattleActionType) => {
    const _actions = actions.slice();
    _actions.splice(index, 1, action);

    onChange(player.id, _actions);
  };

  const handleActionToggle = (index: number) => {
    const selectedAction = actions[index];
    const selectedActionIndex = player.actions.findIndex(
      (it) => it === selectedAction
    );

    const nextAction =
      player.actions[(selectedActionIndex + 1) % player.actions.length];
    handleActionChange(index, nextAction);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      {actions.map((action, index) => {
        const isActive = turn.appliedActionIndex < index;

        return (
          <div
            key={index}
            style={{
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2rem",
              height: "2rem",
              border: "1px solid black",
              transform: "rotateZ(45deg)",
              opacity: isActive ? 1 : 0.3
            }}
            onClick={() => handleActionToggle(index)}
          >
            <span
              data-action={action}
              style={{
                display: "block",
                transform: "rotateZ(-45deg)",
              }}
            >
              {battleActionIcon[action]}
            </span>
          </div>
        );
      })}
    </div>
  );
};
