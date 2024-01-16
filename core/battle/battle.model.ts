import { ICharacter } from "../character/character.model";
import { DateType, IdType } from "../common/common.model";
import { IPlayer } from "../player/player.model";

export interface IBattle {
  id: IdType;
  players: IBattlePlayer[];
  createdAt: DateType;
  stage: BattleStageTypes;
}

export interface IBattlePlayer {
  playerId: IPlayer['id'];
  characterId: ICharacter['id'];
}

export enum BattleStageTypes {
  Draft = 0,
  Lobby,
  Active,
  Close,
}

export interface IBattleRound {
  stage: BattleRoundStageTypes;
}

export enum BattleRoundStageTypes {
  Draft = 0,
  Selection,
  Apply,
  End,
}