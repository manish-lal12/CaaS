import { WebSocketServer } from "ws";
import { docker } from "../lib/Docker";

export const terminal_wss = new WebSocketServer({ noServer: true });
terminal_wss.on("connection", async (ws, req) => {
  const CONTAINER_ID = req.url?.split("=")[1];
  try {
    const container = docker.getContainer(CONTAINER_ID as string);
    const exec = await container.exec({
      Cmd: ["/bin/sh"],
      AttachStdin: true,
      AttachStdout: true,
      User: "root",
      Tty: true,
    });
    const stream = await exec.start({
      stdin: true,
      hijack: true,
      Detach: false,
    });
    stream.on("data", (data) => {
      ws.send(data.toString());
    });
    ws.on("message", (msg) => {
      stream.write(msg.toString());
    });
    ws.on("close", async () => {
      stream.write("exit\n");
    });
  } catch (error) {
    console.log(error);
    ws.close();
  }
});
