import { Regatta } from "../models/subscribers.js";
import { REGATTAS } from "../mock-data.js";

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattas", getRegattas);
}

/**
 * Creates a new regatta. The callback is called with an object containing the
 * ID of the newly created regatta: callback({ data: regattaId }).
 * @param {Regatta} regatta 
 * @param {Function} callback
 */
async function createRegatta(regatta, callback) {
  // only for the demo
  const id = REGATTAS.length.toString();
  REGATTAS.push({ ...regatta, id });
  callback({ data: id });

  // uncomment
  // const response = {};

  // try {
  //   data = await new Regatta(regatta).save();
  //   response.data = data._id;
  // } catch (error) {
  //   response.error = error.message;
  // }

  // callback(response);
}

// only for demo
function getRegattas(userId, callback) {
  const response = { data: REGATTAS };
  callback(response);
}
