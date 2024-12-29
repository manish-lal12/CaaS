import Dockerode from "dockerode";
import fs from "fs";
import https from "https";

export const docker = new Dockerode({
  host: "http://192.168.122.2",
  port: 2375,
});

// export const docker = new Dockerode({
//   host: "127.0.0.1",
//   protocol: "https",
//   port: 2376,
//   ca: fs.readFileSync("/home/manish/docker-certs-local/ca.pem"),
//   cert: fs.readFileSync("/home/manish/docker-certs-local/cert.pem"),
//   key: fs.readFileSync("/home/manish/docker-certs-local/key.pem"),
// });

// const httpsAgent = new https.Agent({
//   ca: fs.readFileSync("/home/manish/docker-certs-local/ca.pem"),
//   cert: fs.readFileSync("/home/manish/docker-certs-local/cert.pem"),
//   key: fs.readFileSync("/home/manish/docker-certs-local/key.pem"),
// });
