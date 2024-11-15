import { Regatta } from "../models/subscribers.js";

export function SearchHandler(io, socket) {
  socket.on("searchRegattas", searchRegattas);
}

/**
 * Search the database for all regattas that match the query. The callback is
 * called with an object with a data field that holds the matching regattas:
 * { regattas: Regatta[] }
 * @param {string} query
 * @param {Function} callback
 */
async function searchRegattas(query, callback) {
  const response = {};

  try {
    const regattas = await Regatta.find({
      name: new RegExp(query, "i"),
    }).exec();
    response.data = { regattas };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
