import {
  BattleActionRecord,
  BattleActionType,
  BattleEventType,
  BattleStateType,
  battleActionPriority,
} from "src/battle/battle.model";
import { BattleTurn } from "src/battle/battle.turn";
import { Grid } from "src/grid/grid";
import { Player } from "src/player/player";
import { generatePlayerActions } from "src/player/player.factory";
import { triggerCustomEvent } from "src/support/event";
import { waitForMap } from "src/support/time";

export class Battle {
  players: Player[];
  grid: Grid;
  turns: BattleTurn[];
  active?: boolean;
  state?: BattleStateType;
  winnerId?: Player['id'];

  get activeTurn(): BattleTurn {
    return this.turns.slice(-1)[0];
  }

  constructor(grid: Grid, players: Player[]) {
    this.clear();

    this.grid = grid;
    this.players = players.slice();
  }

  clear() {
    this.players = null;
    this.grid = null;
    this.turns = [];
  }

  setActive(state: boolean) {
  
    if (this.state !== BattleStateType.Ended) {
      this.active = state;
      this.state = state ? BattleStateType.Active : BattleStateType.Paused;
    }

    triggerCustomEvent(BattleEventType.ActiveStateChange, null);
  }

  startTurn() {
    const _nextTurn = new BattleTurn();

    this.players.forEach((p) => {
      _nextTurn.setPlayerActions(
        p.id,
        new Array(p.actionsNum).fill(BattleActionType.None)
      );
    });

    this.turns.push(_nextTurn);

    _nextTurn.start();

    triggerCustomEvent(BattleEventType.TurnStart, null);
  }

  async endTurn() {
    const _self = this;

    this.activeTurn.end();

    const actions: BattleActionRecord[][] = Object.entries(
      this.activeTurn.actions
    ).reduce((_all, [id, actions]) => {
      const _nextAll = _all.slice();

      actions.forEach((action, index) => {
        if (_nextAll[index] == null) {
          _nextAll[index] = [];
        }

        _nextAll[index].push({ id, action });
      });

      return _nextAll;
    }, []);

    const actionDuration = 1000;

    await waitForMap(actions, actionDuration, (actionsSet, index) => {
      _self.players.forEach((p) => p.onBeforeTurnAction());

      actionsSet
        .sort((a, b) => {
          return battleActionPriority[a.action] > battleActionPriority[b.action]
            ? 1
            : -1;
        })
        .forEach((it) => {
          const { id, action }: BattleActionRecord = it;

          _self.applyPlayerAction(id, action);
        });

        _self.activeTurn.appliedActionIndex = index;
    });

    const activePlayers = this.players.filter((p) => p.health > 0);

    if (activePlayers.length > 1) {
      this.startTurn();
    } else {
      this.winnerId = activePlayers[0]?.id;
      this.gameOver();
    }
  }

  applyPlayerAction(id: Player["id"], action: BattleActionType) {
    const player = this.players.find((it) => it.id === id);

    player?.setAction(action, this.grid);

    switch (action) {
      case BattleActionType.Attack: {
        this.players.filter((it) => {
          if (it.id === id) {
            return false;
          }

          return it.position.y === player.position.y;
        }).forEach((it) => {
          it.setDamage(1);
        });

        break;
      }
    }

    triggerCustomEvent(BattleEventType.Update, null);
  }

  setPlayerActions(playerId: Player["id"], actions: BattleActionType[]) {
    const activeTurn = this.activeTurn;

    activeTurn.setPlayerActions(playerId, actions);

    const aiPlayers = this.players.filter((p) => p.id !== playerId);

    aiPlayers.forEach((p) => {
      const _actions = generatePlayerActions(p);

      activeTurn.setPlayerActions(p.id, _actions);
    });

    this.endTurn();
  }

  gameOver() {
    this.active = false;
    this.state = BattleStateType.Ended;

    triggerCustomEvent(BattleEventType.Update, null);
  }
}
