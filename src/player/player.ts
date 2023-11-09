import { BattleActionType, battleActionMoveDirection } from "src/battle/battle.model";
import { Character } from "src/character/character";
import { Grid } from "src/grid/grid";
import { PlayerStateType } from "src/player/player.model";
import { Vector2 } from "src/support/vector";

export class Player {
  id: string;
  name: string;

  health: number;
  ammo: number;
  shield: number;
  stamina: number;

  actions: BattleActionType[];
  actionsNum: number;

  position: Vector2;
  character: Character;

  activeAction?: BattleActionType = BattleActionType.None;
  state?: PlayerStateType = PlayerStateType.Draft;

  // constructor(id, name, character, position) {}

  reset() {
    this.state = PlayerStateType.Draft;
    this.stamina = this.actionsNum;
  }

  onBeforeTurnAction() {
    this.state = PlayerStateType.Draft;
  }

  setAction(action: BattleActionType, grid: Grid) {
    this.activeAction = action;

    switch (this.activeAction) {
      case BattleActionType.Attack: {
        if (!this.ammo) {
          this.activeAction = BattleActionType.None;
          return;
        }

        this.ammo -= 1;
        break;
      }
      case BattleActionType.Block: {
        if (!this.shield) {
          this.activeAction = BattleActionType.None;
          return;
        }
        break;
      }
      case BattleActionType.Reload: {
        this.ammo = this.character.ammo;
        break;
      }
      case BattleActionType.MoveDown:
      case BattleActionType.MoveUp:
      case BattleActionType.MoveRight:
      case BattleActionType.MoveLeft: {
        const direction: Vector2 = battleActionMoveDirection[action];
        const _nextPosition = Vector2.add(this.position, direction);

        if (!grid.canMoveTo(_nextPosition)) {
          this.activeAction = BattleActionType.None;
          return;
        }

        // this.stamina -= 1;
        this.position = _nextPosition;

        break;
      }
    }
  }

  setDamage(damage: number) {
    if (this.activeAction === BattleActionType.Block) {
      this.shield -= 1;
      return;
    }

    this.health -= damage;
    this.state = PlayerStateType.Hit;
  }
}
