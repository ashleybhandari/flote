import { Regatta } from "../models/subscribers.js";

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattas", getRegattas);
  socket.on("searchRegattas", searchRegattas);
}

/**
 * Creates a new regatta. The callback is called with an object with a data
 * field that holds the ID of the newly created regatta: { id: string }.
 * @param {Regatta} regatta
 * @param {Function} callback
 */
async function createRegatta(regatta, callback) {
  const response = {};

  try {
    const doc = await new Regatta(regatta).save();
    response.data = { id: doc._id };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

/**
 * Gets all regattas the user with the specified ID admins and timekeeps. The
 * callback is called with an object with a data field that holds the regattas:
 * { regattas: { admin: Regatta[], timekeeper: Regatta[] } }.
 * @param {string} userId
 * @param {Function} callback
 */
async function getRegattas(userId, callback) {
  const response = {};

  try {
    const admin = await Regatta.find({ adminId: userId }).exec();
    const timekeeper = await Regatta.find({ timekeeperIds: userId }).exec();

    response.data = {
      regattas: { admin, timekeeper },
    };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

/**
 * Searches the database for all regattas that match the query. The callback is
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
