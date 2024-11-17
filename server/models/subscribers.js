import { createRequire } from "module";

const require = createRequire(import.meta.url);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Create schema for users
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const regattaSchema = new mongoose.Schema({
  // Create schema for regattas
  name: {
    type: String,
    required: true,
  },
  adminId: {
    type: String,
    required: true,
  },
  timekeeperIds: {
    type: [String],
    required: true,
  },
});

const raceSchema = new mongoose.Schema({
  // Create schema for races
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: false,
  },
  finishTime: {
    type: Date,
    required: false,
  },
  regattaId: {
    type: String,
    required: true,
  },
  boatIds: {
    type: [String],
    required: true,
  },
});

const boatSchema = new mongoose.Schema({
  // Create schema for boats
  registrationId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  finishTime: {
    type: Date,
    required: false,
  },
  dns: {
    type: Boolean,
    required: false,
  },
  participantNames: {
    type: [String],
    required: true,
  },
  raceId: {
    type: String,
    required: null,
  },
  regattaId: {
    type: String,
    required: true,
  },
});

//exporting the schemas
export const User = mongoose.model("User", userSchema);
export const Regatta = mongoose.model("Regatta", regattaSchema);
export const Race = mongoose.model("Race", raceSchema);
export const Boat = mongoose.model("Boat", boatSchema);
