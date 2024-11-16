import { Regatta, Race } from "../models/subscribers.js";

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattas", getRegattas);
  socket.on("getRegattaById", getRegattaById);
}

/**
 * Creates a new regatta. The callback is called with an object containing the
 * ID of the newly created regatta: callback({ data: regattaId }).
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

async function getRegattaById(regattaId, userId, callback) {
  const response = {};
  try {
    const reg = await Regatta.find({_id: regattaId}).exec();
    const races = await Race.find({regattaId: regattaId});
    response.data = {
      regatta: { reg, races, userId },
    };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
