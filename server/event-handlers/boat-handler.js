import { Boat } from "../models/subscribers.js";

export function BoatHandler(io, socket) {
  socket.on("searchBoats", searchBoats);
}

/**
 * Searches the database for all boats whose name, id, or participants match
 * the query. The callback is called with an object with a data field that
 * holds the matching boats: { boats: Boat[] }
 * @param {string} query
 * @param {Function} callback
 */
async function searchBoats(query, callback) {
  const response = {};

  try {
    const regex = new RegExp(query, "i");

    const nameMatch = await Boat.find({ name: regex }).exec();
    const idMatch = await Boat.find({ registrationId: regex }).exec();
    const participantMatch = await Boat.find({
      participantNames: regex,
    }).exec();

    const matches = [...nameMatch, ...idMatch, ...participantMatch];
    response.data = {
      boats: [...new Set(matches)],
    };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
