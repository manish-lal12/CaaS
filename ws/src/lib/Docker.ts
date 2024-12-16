import Dockerode from "dockerode";

export const docker = new Dockerode({
  host: "http://192.168.122.2",
  port: 2375,
});
