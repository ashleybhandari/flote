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
  id: {
    type: String,
    required: true,
  },
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
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  finishTime: {
    type: Date,
    required: true,
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
  id: {
    type: String,
    required: true,
  },
  registrationId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  finishTime: {
    type: Date,
    required: true,
  },
  dns: {
    type: Boolean,
    required: true,
  },
  participantNames: {
    type: [String],
    required: true,
  },
  raceId: {
    type: String,
    required: true,
  },
});

//exporting the schemas
// editing how these are exported - dila
export const User = mongoose.model("User", userSchema);
export const Regatta = mongoose.model("Regatta", regattaSchema);
export const Race = mongoose.model("Race", raceSchema);
export const Boat = mongoose.model("Boat", boatSchema);
