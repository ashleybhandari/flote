import { Race } from "../models/subscribers.js";

export function RaceHandler(io, socket) {
  socket.on("searchRaces", searchRaces);
  socket.on("getRaceById", getRaceById);
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

/**
 * Fetch a races by ID. The callback is called with an object with a data field
 * that holds the race: { race: Race }
 * @param {string} raceId
 * @param {Function} callback
 */
async function getRaceById(raceId, callback) {
  const response = {};

  try {
    const race = await Race.findById(raceId).exec();
    response.data = { race };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
