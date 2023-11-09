import { Player } from "src/player/player";
import { Vector2 } from "src/support/vector";

export enum BattleStateType {
  Draft,
  Active,
  Paused,
  Ended
}

export enum BattleEventType {
  Update = "battleupdate",
  TurnStart = "battleturnstart",
  ActiveStateChange = 'battle-active-change'
}

export enum BattleActionType {
  None = -1,
  Attack = 0,
  Reload,
  MoveUp,
  MoveDown,
  MoveRight,
  MoveLeft,
  Block,
  Dodge,
}

export interface BattleActionRecord {
  id: Player["id"];
  action: BattleActionType;
}

export const battleActionPriority: Record<BattleActionType, number> = {
  [BattleActionType.None]: 0,
  [BattleActionType.Attack]: 1,
  [BattleActionType.Reload]: 0,
  [BattleActionType.MoveUp]: 2,
  [BattleActionType.MoveDown]: 2,
  [BattleActionType.MoveLeft]: 2,
  [BattleActionType.MoveRight]: 2,
  [BattleActionType.Block]: 2,
  [BattleActionType.Dodge]: 3,
};

export const battleActionIcon: Record<BattleActionType, string> = {
  [BattleActionType.None]: "",
  [BattleActionType.Attack]: "🎯",
  [BattleActionType.Reload]: "🔄",
  [BattleActionType.MoveUp]: "⬆",
  [BattleActionType.MoveDown]: "⬇",
  [BattleActionType.MoveLeft]: "⬅",
  [BattleActionType.MoveRight]: "➡️",
  [BattleActionType.Block]: "🛡",
  [BattleActionType.Dodge]: "",
};

export const battleActionMoveDirection: Record<number, Vector2> = {
  [BattleActionType.MoveUp]: new Vector2(0, -1),
  [BattleActionType.MoveDown]: new Vector2(0, 1),
  [BattleActionType.MoveLeft]: new Vector2(-1, 0),
  [BattleActionType.MoveRight]: new Vector2(1, 0),
};
