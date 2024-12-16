import { createServer } from "http";
import { WebSocketServer } from "ws";
import { docker } from "./lib/Docker";
const mainServer = createServer();
const wss = new WebSocketServer({ server: mainServer });

wss.on("connection", async (ws) => {
  const container = docker.getContainer("76941c597e89");
  console.log("client connected");
  const exec = await container.exec({
    Cmd: ["/bin/sh"],
    AttachStdin: true,
    AttachStdout: true,
    User: "root",
    Tty: true,
  });
  const stream = await exec.start({ stdin: true, hijack: true, Tty: true });
  stream.on("data", (data) => {
    ws.send(data.toString());
  });
  ws.on("message", (msg) => {
    stream.write(msg);
  });
  ws.on("close", () => {
    console.log("client disconnected");
  });
});

mainServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});
