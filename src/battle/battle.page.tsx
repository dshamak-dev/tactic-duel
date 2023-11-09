import classNames from "classnames";
import React, { useState, useEffect, useMemo } from "react";
import { clearBattle, createBattle } from "src/battle/battle.manager";
import {
  BattleActionType,
  BattleEventType,
  BattleStateType,
} from "src/battle/battle.model";
import { BattleTurnControls } from "src/battle/battle.turn.controls";
import { Player } from "src/player/player";
import { PlayerBattleCard } from "src/player/player.battle.card";
import { addCustomEvent } from "src/support/event";

const battlePageStyle: any = {
  display: "flex",
  maxHeight: "100vh",
  width: "100vw",
  padding: "6rem 6rem 12rem",
  boxSizing: "border-box",
};

export const BattlePage = () => {
  const battle = useMemo(() => {
    return createBattle();
  }, []);
  const [_, setTigger] = useState(null);
  const turnInfo = useMemo(() => {
    return { turnNumber: 0, timeLeft: -1 };
  }, []);

  const { turnNumber, timeLeft } = turnInfo;

  const winnerPlayer = useMemo(() => {
    if (battle?.winnerId == null) {
      return null;
    }

    return battle.players.find((p) => p.id === battle.winnerId);
  }, [battle?.winnerId]);

  const [playerActions, setPlayerActions] = useState([]);
  const controlledPlayer = useMemo(() => {
    return battle?.players[0];
  }, [battle?.players]);

  const refresh = () => {
    setTigger(Date.now());
  };

  const handleRestart = () => {
    location.pathname = location.pathname;
  };

  useEffect(() => {
    let timer;

    const handleBattleStateChange = () => {
      if (!battle.active) {
        clearInterval(timer);
        return;
      }

      timer = setInterval(() => {
        const turn = battle.activeTurn;

        if (!turn?.active || turnInfo.timeLeft <= 0) {
          return;
        }

        turnInfo.timeLeft = turnInfo.timeLeft - 1;

        refresh();
      }, 1000);
    };

    const updateHandler = () => {
      refresh();
    };

    const handleTurnStart = () => {
      const turn = battle.activeTurn;

      turnInfo.turnNumber = battle?.turns?.length;
      turnInfo.timeLeft = turn.duration;

      setPlayerActions(turn.actions[controlledPlayer?.id] || []);

      refresh();
    };

    const handleKeyPress = (event) => {
      if (event.isComposing) {
        return;
      }

      switch (event.keyCode) {
        // ESC
        case 27: {
          battle.setActive(!battle.active);
          refresh();
          break;
        }
      }
    };

    const handleTabVisibility = () => {
      battle.setActive(document.visibilityState === "visible");
    };

    document.addEventListener("keydown", handleKeyPress);

    document.addEventListener("visibilitychange", handleTabVisibility);

    addCustomEvent(BattleEventType.ActiveStateChange, handleBattleStateChange);
    addCustomEvent(BattleEventType.Update, updateHandler);
    addCustomEvent(BattleEventType.TurnStart, handleTurnStart);

    battle.startTurn();
    battle.setActive(true);

    return () => {
      clearInterval(timer);

      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("visibilitychange", handleTabVisibility);

      removeEventListener(
        BattleEventType.ActiveStateChange,
        handleBattleStateChange
      );
      removeEventListener(BattleEventType.Update, updateHandler);
      removeEventListener(BattleEventType.TurnStart, handleTurnStart);

      clearBattle(battle);
    };
  }, []);

  const endTurn = () => {
    battle.setPlayerActions(controlledPlayer?.id, playerActions);

    refresh();
  };

  useEffect(() => {
    if (timeLeft === 0) {
      endTurn();
    }
  }, [timeLeft]);

  const handleActionsChange = (
    playerId: Player["id"],
    actions: BattleActionType[]
  ) => {
    setPlayerActions(actions);
  };

  if (battle == null) {
    return <div>loading..</div>;
  }

  return (
    <div
      id="battle-page"
      style={battlePageStyle}
      className={classNames({ active: battle.active })}
    >
      {battle.active ? null : (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 3,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            fontSize: "4rem",
            textShadow: "0 0 2px black",
          }}
        >
          {battle.state === BattleStateType.Ended ? (
            <div>
              <h2>
                {winnerPlayer.id === controlledPlayer.id
                  ? "YOU WON!"
                  : "Game Over"}
              </h2>
              <div><button onClick={handleRestart}>Restart</button></div>
            </div>
          ) : (
            "paused"
          )}
        </div>
      )}
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplate: "1fr / repeat(2, min-content)",
          width: "100%",
          justifyContent: "space-around",
          gap: "4rem",
        }}
      >
        {battle.players.map((player, index) => {
          const num = index + 1;
          const isReversed = num % 2 === 0;

          return (
            <PlayerBattleCard
              key={index}
              reversed={isReversed}
              player={player}
              grid={battle.grid}
            />
          );
        })}
        <div
          id="player-controls"
          style={{
            position: "absolute",
            left: 0,
            width: "100%",
            height: "calc(100% + 6rem)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button onClick={endTurn}>end turn {turnNumber}</button>
            <div>
              <h2>{timeLeft}s</h2>
            </div>
            <BattleTurnControls
              turn={battle.activeTurn}
              actions={playerActions}
              player={controlledPlayer}
              onChange={handleActionsChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
