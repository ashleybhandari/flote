import { createRequire } from "module";
import { createServer } from "http";
import { Server } from "socket.io";
import subscribersRouter from "./routes/subscribers.js";

const require = createRequire(import.meta.url);
require("dotenv").config();

// Set up an app with express
const express = require("express");
const app = express();

// Connect to our database using mongoose and dotenv
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

// View problem or success when connecting to db
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("Connected to database"));

// Set up routes with express as a body
app.use(express.json());
app.use("/subscribers", subscribersRouter);

// Set up socket.io
const cors = require("cors");
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

// Listen for events
io.on("connection", (socket) => {
  socket.on("getUser", () => {
    const data = {};
    socket.emit("getUser", data);
  });
});

// Start server on local host
server.listen(3000, () => console.log("server started"));
