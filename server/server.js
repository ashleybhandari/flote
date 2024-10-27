import { createRequire } from "module";
import { createServer } from "http";
import { Server } from "socket.io";
import subscribersRouter from "./routes/subscribers.js";

const require = createRequire(import.meta.url);
require("dotenv").config();

// Set up an app with express
const express = require("express");
const app = express();

//auth0 code 
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'izgea8EQWehX3fGtMY0a6hM5ByiToMRb',
  issuerBaseURL: 'https://dev-rvwwzp45gttpuq7a.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

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
