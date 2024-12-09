import { Regatta, Race, Boat } from "../models/subscribers.js";

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattas", getRegattas);
  socket.on("searchRegattas", searchRegattas);
  socket.on("getRegattaById", getRegattaById);
  socket.on("deleteRegatta", deleteRegatta);
  socket.on("updateTimekeepers", updateTimekeepers);
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

/**
 * Fetch a single regatta's details by ID.
 * The callback is called with an object with a data field that holds the regatta:
 * { regatta: Regatta }
 * @param {string} regattaId
 * @param {Function} callback
 */
async function getRegattaById(regattaId, callback) {
  const response = {};

  try {
    const regatta = await Regatta.findById(regattaId).exec();
    const races = await Race.find({ regattaId: regattaId }).exec();
    const boats = await Boat.find({ regattaId: regattaId }).exec();
    if (!regatta) throw new Error("Regatta not found");

    response.data = { regatta, races, boats };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

/**
 * Delete a regatta by id.
 * @param {string} regattaId
 * @param {Function} callback
 */
async function deleteRegatta(regattaId, callback) {
  const response = {};

  try {
    if (!regattaId) {
      throw new Error("Regatta ID is required to delete a regatta.");
    }

    const regatta = await Regatta.findByIdAndDelete(regattaId);

    if (!regatta) {
      throw new Error("Regatta not found.");
    }

    await Boat.deleteMany({ regattaId });

    response.data = { message: "Regatta deleted successfully" };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

/**
 * Updates a regatta's timekeepers. The callback is called with an empty object.
 * @param {{ regattaId: string, timekeeperIds: string[] }} data
 * @param {Function} callback
 */
async function updateTimekeepers(data, callback) {
  const response = {};

  try {
    const { regattaId, timekeeperIds } = data;
    const regatta = await Regatta.findById(regattaId).exec();
    regatta.timekeeperIds = timekeeperIds;
    await regatta.save();
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
