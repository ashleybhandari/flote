import { Boat } from "../models/subscribers.js";

export function BoatHandler(io, socket) {
  socket.on("addBoats", addBoats);
  socket.on("getBoats", getBoats);
  socket.on("searchBoats", searchBoats);
}

/**
 * Creates a new boat and associates it with a regatta
 * @param {Object} boatData - The boat data from the frontend
 * @param {Function} callback - Callback function to send back the response
 */
async function addBoats(boat, callback) {
  const response = {};
  console.log("Received boat data:", boat);

  try {
    // Ensure boat includes regattaId
    if (!boat.regattaId) {
      throw new Error("Boat must have a regattaId.");
    }

    const doc = await new Boat(boat).save();

    response.data = { boatId: doc._id, boatName: doc.name };
  } catch (error) {
    response.error = error.message;
  }

  callback(response);
}

/**
 * Fetch all boats associated with a specific regatta
 * @param {String} regattaId - The regatta ID to fetch boats for
 * @param {Function} callback - Callback function to send back the response
 */
async function getBoats(regattaId, callback) {
  const response = {};

  try {
    // Fetch the boats from the database that match the regattaId
    const boats = await Boat.find({ regattaId }).exec();
    response.data = { boats }; // Return boats in the response
  } catch (error) {
    response.error = error.message;
  }

  callback(response); // Send the response back to the client
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
