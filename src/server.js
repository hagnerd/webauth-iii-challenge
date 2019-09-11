const express = require("express");
const { register, login, users } = require("./routes");
const server = express();

server.use(express.json());
server.use("/api/register", register);
server.use("/api/login", login);
server.use("/api/users", users);

server.get("/", (_req, res) => {
  res.json({
    message: "Hello, Server"
  });
});

module.exports = server;
