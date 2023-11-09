import React from "react";
import { CharacterPrefab } from "src/character/character.prefab";
import { Grid } from "src/grid/grid";
import { Player } from "src/player/player";

interface Props {
  player: Player;
  grid: Grid;
  reversed?: boolean;
}

export const PlayerBattleCard: React.FC<Props> = ({
  reversed = false,
  player,
  grid,
}) => {
  if (player == null || grid == null) {
    return null;
  }

  const healthMap = new Array(player.character.health)
    .fill(null)
    .map((_, index) => {
      return player.health > index;
    });
  const shieldhMap =
    player.character.shield == null
      ? null
      : new Array(player.character.shield).fill(null).map((_, index) => {
          return player.shield > index;
        });
  const ammohMap =
    player.character.ammo == null
      ? null
      : new Array(player.character.ammo).fill(null).map((_, index) => {
          return player.ammo > index;
        });
  const gridMap = new Array(grid.size.x * grid.size.y).fill(null);

  const statsStyle: any = {
    display: "flex",
    flexDirection: reversed ? 'row' : 'row-reverse',
    gap: '0.5rem'
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: reversed ? "flex-start" : "flex-end",
        justifyContent: "space-between",
        gap: "3rem",
        textAlign: reversed ? 'left' : 'right',
      }}
    >
      <div>
        <div>{player.name}</div>
        <div style={statsStyle}>
          <span>health </span>
          {healthMap.map((active, index) => (
            <span key={index}>{active ? "❤️" : "🖤"}</span>
          ))}
        </div>
        {shieldhMap && (
          <div style={statsStyle}>
            <span>shield </span>
            {shieldhMap.map((active, index) => (
              <span key={index}>{active ? "🔸" : "🔷"}</span>
            ))}
          </div>
        )}
        {ammohMap && (
          <div style={statsStyle}>
            <span>ammo </span>
            {ammohMap.map((active, index) => (
              <span key={index}>{active ? "🔔" : "🔕"}</span>
            ))}
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplate: `repeat(${grid.size.y}, 2rem) / repeat(${grid.size.x}, 3rem)`,
          }}
        >
          {gridMap.map((_, index) => {
            const column = index % grid.size.x;
            const row = Math.floor(index / grid.size.y);

            const hasCharacter =
              player.position.x === column && player.position.y === row;

            return (
              <span
                key={index}
                data-index={index}
                data-col={column}
                data-row={row}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                {hasCharacter ? (
                  <div
                    style={{
                      transform: `rotateY(${reversed ? 180 : 0}deg)`,
                    }}
                  >
                    <CharacterPrefab character={player.character} />
                  </div>
                ) : null}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
