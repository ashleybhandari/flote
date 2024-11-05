import mongoose from "mongoose";
import { Regatta } from "../models/subscribers.js";

const REGATTAS = [];

export function RegattaHandler(io, socket) {
  socket.on("createRegatta", createRegatta);
  socket.on("getRegattasAdmin", getRegattasAdmin);
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

async function getRegattasAdmin(userId, callback) {
  const response = {};

  try {
    const docs = await Regatta.find({ adminId: userId }).exec();
    response.data = { regattas: docs };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
