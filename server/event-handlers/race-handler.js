import { Race } from "../models/subscribers.js";

export function RaceHandler(io, socket) {
  socket.on("searchRaces", searchRaces);
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
