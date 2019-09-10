const express = require("express");
const server = express();

server.get("/", (_req, res) => {
  res.json({
    message: "Hello, Server"
  });
});

module.exports = server;
