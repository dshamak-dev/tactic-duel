import ws from "ws";

export const createWebsocketServer = (server: any) => {
  const wsServer = new ws.Server({ noServer: true });

  server.on("upgrade", (request: any, socket: any, head: any) => {
    wsServer.handleUpgrade(request, socket, head, (socket) => {
      wsServer.emit("connection", socket, request);
    });
  });

  wsServer.on("connection", (socket, req) => {
    const ip = req.socket.remoteAddress;

    console.log("connection from: ", ip);
    socket.on("message", (message) => {
      console.log("Message: ", message.toString());
    });
  });

  wsServer.on("disconnect", () => {
    console.log("disconnect");
  });

  return wsServer;
};
