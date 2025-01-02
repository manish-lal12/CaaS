import { WebSocketServer } from "ws";
import axios from "axios";
import { calculateStats } from "../utils/stats";
import { DOCKER_API_ENDPOINT } from "../lib/vars";

export const metrics_wss = new WebSocketServer({ noServer: true });

metrics_wss.on("connection", async (ws, req) => {
  try {
    const container_id = req.url?.split("=")[1];

    const docker_api_endpoint = `${DOCKER_API_ENDPOINT}/containers/${container_id}/stats`;
    const response = await axios({
      method: "GET",
      url: docker_api_endpoint,
      responseType: "stream",
      // httpsAgent,
    });
    if (!response) {
      ws.close();
      throw new Error(`Failed to fetch data: ${response}`);
    }

    const incomingStream = response.data;
    for await (const chunk of incomingStream) {
      if (ws.readyState === ws.OPEN) {
        const data = calculateStats(chunk);
        ws.send(JSON.stringify(data));
      }
    }
    ws.on("close", () => {
      console.log("Client disconnected.");
    });
    ws.on("error", (error: Error) => {
      console.error("WebSocket error:", error.message);
    });
  } catch (error) {
    console.log(error);
    ws.close();
  }
});
