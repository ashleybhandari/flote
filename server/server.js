import { env } from 'node:process';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();

// Create app with express and mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Connect to our database using mongoose and dotenv
// should hide credentials in .env
mongoose.connect('mongodb+srv://megraves:B0a+s@flotedbcluster.qq2og.mongodb.net/?retryWrites=true&w=majority&appName=flotEdbCluster'); //process.env.DB_URL
const db = mongoose.connection;

// View problem or success when connecting to db
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

// Setting up routes with express as a body
app.use(express.json());

// Routing
import subscribersRouter from './routes/subscribers.js';
app.use('/subscribers', subscribersRouter);

// Start server on local host
app.listen(3000, () => console.log('server started')); // start server on local host