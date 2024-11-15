import { Regatta } from "../models/subscribers.js";

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattas", getRegattas);
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
