import { Race, Regatta, Boat } from "../models/subscribers.js";

export function RaceHandler(io, socket) {
  socket.on("createRace", createRace);
  socket.on("updateRaces", updateRaces);
  socket.on("deleteRaces", deleteRaces);
  socket.on("searchRaces", searchRaces);
  socket.on("getRaceById", getRaceById);
}

async function createRace(race, callback) {
  const response = {};

  try {
    const doc = await new Race(race).save();
    const raceId = doc._id;
    
    await Boat.updateMany(
      { _id: { $in: race.boatIds } },
      { $set: { raceId } }
    );

    response.data = { raceId: doc._id };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

async function updateRaces(updateData, callback) {
  const response = {};

  try {
    const { name, raceId, startTime, finishTime, boatIds } = updateData;
    if (!raceId) {
      throw new Error("Race ID is required to update a race.");
    }

    const race = await Race.findById(raceId);

    if (!race) {
      throw new Error("Race not found.");
    }

    if (name !== undefined) race.name = name;
    if (startTime !== undefined) race.startTime = startTime;
    if (finishTime !== undefined) race.finishTime = finishTime;
    if (boatIds !== undefined) race.boatIds = boatIds;
    
    await race.save();
    response.data = race;
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

async function deleteRaces(userId) {
  const response = {};

  try {
    const admin = await Race.findByIdAndDelete({ adminId: userId });
    const timekeeper = await Race.findByIdAndDelete({ timekeeperIds: userId });
    response.data = {
      races: { admin, timekeeper },
    };
  } catch (error) {
    response.error = error.message;
  }

  console.log("Race deleted.")
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


async function getRaceById(raceId, callback) {
  const response = {};
  try {
    const race = await Race.findById(raceId).exec();
    const boats = await Boat.find({ raceId }).exec();

    if (!race) {
      throw new Error("Race not found");
    }

    console.log("Boats fetched for race", boats);
    response.data = { race, boats };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}