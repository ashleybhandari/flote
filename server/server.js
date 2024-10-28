import { createRequire } from "module";
import { createServer } from "http";
import { Server } from "socket.io";
import subscribersRouter from "./routes/subscribers.js";

const require = createRequire(import.meta.url);
require("dotenv").config();

// Set up an app with express
const express = require("express");
const app = express();

//sets up auth0
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '374515c555b791c32a01ec4b018c76abbbe62d625581cbc18652f4f93a7af23d',
  baseURL: 'http://localhost:3000',
  clientID: 'izgea8EQWehX3fGtMY0a6hM5ByiToMRb',
  issuerBaseURL: 'https://dev-rvwwzp45gttpuq7a.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// database connection
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://megraves:B0a+s@flotedbcluster.qq2og.mongodb.net/?retryWrites=true&w=majority&appName=flotEdbCluster')
  .then(() => console.log("Connected to database"))
  .catch(err => console.error("Database connection error:", err));

// Set up routes with express as a body
app.use(express.json());
app.use("/subscribers", subscribersRouter);

// temporary data to prove that MONGODB is communicating with the server
const temporaryData = async () => {
  const { Regatta } = await import('./models/subscribers.js');
  const newRegatta = new Regatta({
    id: 1,
    name: "Temporary Regatta",
    adminId: 111,
    timeKeeperIds: [111, 222]
  });

  try {
    const tempRegattaCall = await newRegatta.save();
    console.log("Data successfully obtained from the temporary Regatta:", tempRegattaCall);
  } catch (error) {
    console.error("Could not establish connection to the database", error.message);
  }
}

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

// calling temporaryData
temporaryData();

// Start server on local host
server.listen(3000, () => console.log("server started"));
