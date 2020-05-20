const express = require("express");
const helmet = require("helmet");

const usersRouter = require("../users/users-router"); // ADD ROUTER HERE!

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", usersRouter); // ADD ROUTER HERE!

server.get("/", (req, res) => {
    res.json({ api: "up" });
  });

module.exports = server;
