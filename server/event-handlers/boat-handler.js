import { Regatta, Race, Boat } from "../models/subscribers.js";

export function BoatHandler(io, socket) {
  socket.on("createBoat", createBoat);
  socket.on("updateBoats", updateBoats);
  socket.on("deleteBoats", deleteBoats);
  socket.on("searchBoats", searchBoats);
  socket.on("getBoatsById", getBoatsById);
}


async function createBoat(boat, callback) {
  const response = {};

  try {
    const doc = await new Boat(boat).save();
    response.data = { id: doc._id };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}


async function updateBoats(registrationId) {
  const response = {};

  try {
    const boat = await Boat.findByIdAndUpdate({ registrationId: registrationId });
    response.data = {
      boats: { boat },
    };
  } catch (error) {
    response.error = error.message;
  }

  console.log("Boat updated.")
}

async function deleteBoats(registrationId) {
  const response = {};

  try {
    const boat = await Boat.findByIdAndDelete({ registrationId: registrationId });
    response.data = {
      boats: { boat },
    };
  } catch (error) {
    response.error = error.message;
  }

  console.log("Boat deleted.")
}


async function searchBoats(query, callback) {
  const response = {};

  try {
    const boats = await Boat.find({
      name: new RegExp(query, "i"),
    }).exec();

    response.data = { boats };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

async function getBoatsById(registrationId, callback) {
  const response = {};
  try {
    const boat = await Boat.find({registrationId: registrationId}).exec();
    const participants = boat.participantNames;
    response.data = {
      boats: { boat, participants },
    };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}
