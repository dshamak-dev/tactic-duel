import { BattleActionType } from "src/battle/battle.model";
import { Player } from "src/player/player";

export class BattleTurn {
  active: boolean;
  duration: number = 90;
  actions: Record<Player['id'], BattleActionType[]>;
  appliedActionIndex?: number;

  constructor() {
    this.actions = {};
  }

  start() {
    this.appliedActionIndex = -1;
    this.active = true;
  }

  end() {
    this.active = false;
  }

  setPlayerActions(playerId: Player['id'], actions: BattleActionType[] = [] ) {
    this.actions[playerId] = actions;
  }
}