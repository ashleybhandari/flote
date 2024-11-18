import { Race } from "../models/subscribers.js";

export function RaceHandler(io, socket) {
  socket.on("createRace", createRace);
  socket.on("updateRaces", updateRaces);
  socket.on("deleteRaces", deleteRaces);
  socket.on("searchRaces", searchRaces);
  socket.on("getRacesById", getRacesById);
}


async function createRace(race, callback) {
  const response = {};

  try {
    const doc = await new Race(race).save();
    response.data = { id: doc._id };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

async function updateRaces(userId) {
  const response = {};

  try {
    const admin = await Race.findByIdAndUpdate({ adminId: userId });
    const timekeeper = await Race.findByIdAndUpdate({ timekeeperIds: userId });
    response.data = {
      races: { admin, timekeeper },
    };
  } catch (error) {
    response.error = error.message;
  }

  console.log("Race updated.")
}

async function deleteRaces(userId) {
  const response = {};

  try {
    const admin = await Race.findByIdAndDelete({ adminId: userId });
    const timekeeper = await Race.findByIdAndDelete({ timekeeperIds: userId });
    response.data = {
      races: { admin, timekeeper },
    };
  } catch (error) {
    response.error = error.message;
  }

  console.log("Race deleted.")
}


/**
 * Searches the database for all races that match the query. The callback is
 * called with an object with a data field that holds the matching races:
 * { races: Race[] }
 * @param {string} query
 * @param {Function} callback
 */
async function searchRaces(query, callback) {
  const response = {};

  try {
    const races = await Race.find({
      name: new RegExp(query, "i"),
    }).exec();

    response.data = { races };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

async function getRacesById(raceId, userId, callback) {
  const response = {};
  try {
    const races = await Race.find({raceId: raceId});
    response.data = {
      race: { races, userId },
    };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
