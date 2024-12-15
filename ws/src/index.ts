import { createServer } from "http";
import WebSocket, { WebSocketServer } from "ws";

const mainServer = createServer();
const wss = new WebSocketServer({ server: mainServer });

wss.on("connection", (ws) => {
  console.log("client connected");
  const cws = new WebSocket(
    "ws://192.168.122.2:2375/containers/58e8737cd5d6/attach/ws?stream=1&stdout=1&stdin=1&logs=0&stderr=1"
  );
  cws.on("open", () => {
    console.log("container connected");
  });
  ws.on("message", (msg) => {
    cws.send(msg);
  });
  cws.on("message", (msg) => {
    ws.send(msg);
  });
});

mainServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});
