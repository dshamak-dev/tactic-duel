import { Battle } from "src/battle/battle";
import { generateCharacter } from "src/character/character.factory";
import { Grid } from "src/grid/grid";
import { generatePlayer } from "src/player/player.factory";
import { Vector2 } from "src/support/vector";

export const createBattle = () => {
  const _grid = new Grid(3, 3);
  const _players = new Array(2).fill(null).map((_, index) => {
    const _character = generateCharacter();

    return generatePlayer(index, Vector2.center(_grid.size), _character);
  });

  return new Battle(_grid, _players);
};

export const clearBattle = (battle: Battle) => {
  if (battle != null) {
    battle.clear();
  }
};
