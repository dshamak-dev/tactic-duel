import React, { useEffect } from "react";
import { useSocket } from "src/support/useSocket";
import { appConfig } from "src/config";

export const BattleSessionPage = (props) => {
  const socket: WebSocket = useSocket({
    url: `${appConfig.WEBSOCKET_URL}`,
  });

  useEffect(() => {
    if (!socket || !socket.readyState) {
      return;
    }

    socket.send("Hello!");

    socket.addEventListener("error", () => {
      // console.log('Socket is failed');
    });

    socket.addEventListener("message", (ev) => {
      // console.log('Socket message', ev.data);
    });
  }, [socket]);

  return <main>Battle page</main>;
};
