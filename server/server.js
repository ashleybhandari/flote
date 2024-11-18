import { env } from 'node:process';
import { createRequire } from "module";
import { createServer } from "http";
import { BoatHandler } from "./event-handlers/boat-handler.js";
import { RaceHandler } from "./event-handlers/race-handler.js";
import { RegattaHandler } from "./event-handlers/regatta-handler.js";
import { Server } from "socket.io";
import subscribersRouter from "./routes/subscribers.js";

const require = createRequire(import.meta.url);
require("dotenv").config();

// set up an app with express
const express = require("express");
const app = express();

// set up routes with express as a body
app.use(express.json());
app.use("/subscribers", subscribersRouter);

// set up auth0
const { auth } = require("express-openid-connect");
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "374515c555b791c32a01ec4b018c76abbbe62d625581cbc18652f4f93a7af23d",
  baseURL: "http://localhost:3000",
  clientID: "izgea8EQWehX3fGtMY0a6hM5ByiToMRb",
  issuerBaseURL: "https://dev-rvwwzp45gttpuq7a.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// database connection
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://" + process.env.USER_PASS + "@flotedbcluster.qq2og.mongodb.net/?retryWrites=true&w=majority&appName=flotEdbCluster"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

// set up socket.io
const cors = require("cors");
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  BoatHandler(io, socket);
  RaceHandler(io, socket);
  RegattaHandler(io, socket);
});

// start server on port 3000
server.listen(3000, () => console.log("server started"));
