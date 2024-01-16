import { useEffect, useState } from "react";
import ws from "ws";

export const useSocket = ({ url }): WebSocket => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    try {
      const client = new WebSocket(url);

      client.onopen = (ev) => {
        // console.log("Client connected!", ev);
        setSocket(client);
      };

      client.onclose = (ev) => {
        // console.log("Client closed!", ev);
        setSocket(null);
      };
    } catch (err) {
      console.error(err);
    }
  }, [url]);

  return socket;
};
