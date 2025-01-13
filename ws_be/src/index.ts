import "dotenv/config";
import { createServer } from "http";
import { terminal_wss } from "./ws_routes/terminal";
import express, { Request, Response } from "express";
import { metrics_wss } from "./ws_routes/metrics";
import cors from "cors";
import axios from "axios";
import { DOCKER_API_ENDPOINT } from "./lib/vars";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("CaaS WebSocket Backend");
});
app.get("/ws/metrics/container/status", async (req, res) => {
  try {
    const { container_id } = req.query;
    const containerStatusResponse = await axios({
      method: "GET",
      url: `${DOCKER_API_ENDPOINT}/containers/${container_id}/json`,
      // httpsAgent,
    });
    res.status(200).json({
      state: containerStatusResponse.data.State.Running,
    });
  } catch (error) {
    console.error("Error in server:", error);
    res.status(500).send("Error in server");
  }
});

const mainServer = createServer(app);

mainServer.on("upgrade", function upgrade(request, socket, head) {
  socket.on("error", (err: any) => {
    console.error(err);
  });

  // CODE FOR AUTH CHECK
  // socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
  // socket.destroy();
  // return;

  const pathname = request.url;
  console.log(pathname);

  if (pathname?.startsWith("/ws/terminal")) {
    terminal_wss.handleUpgrade(request, socket, head, function (ws) {
      terminal_wss.emit("connection", ws, request);
    });
  } else if (pathname?.startsWith("/ws/metrics")) {
    metrics_wss.handleUpgrade(request, socket, head, function (ws) {
      metrics_wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }

  socket.removeListener("error", (err: any) => {
    console.error(err);
  });
});

mainServer.listen(5000, () => {
  console.log("Server is running on port 5000");
});
