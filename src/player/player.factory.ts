import { BattleActionType } from "src/battle/battle.model";
import { Character } from "src/character/character";
import { Player } from "src/player/player";
import { Vector2 } from "src/support/vector";

export const generatePlayer = (
  index: number,
  position: Vector2,
  character: Character
): Player => {
  const player = new Player();

  player.id = index.toString();
  player.name = `Player ${index + 1}`;

  player.position = position;
  player.character = character;

  player.health = character.health;
  player.ammo = character.ammo;
  player.shield = character.shield;

  player.actionsNum = 3;
  player.actions = [
    BattleActionType.None,
    BattleActionType.Attack,
    BattleActionType.Block,
    BattleActionType.Reload,
    BattleActionType.MoveDown,
    BattleActionType.MoveLeft,
    BattleActionType.MoveUp,
    BattleActionType.MoveRight,
  ];

  return player;
};

export const generatePlayerActions = (player: Player): BattleActionType[] => {
  return new Array(player.actionsNum).fill(null).map(() => {
    const index =
      Math.floor(Math.random() * player.actions.length) % player.actions.length;

    return player.actions[index];
  });
};
