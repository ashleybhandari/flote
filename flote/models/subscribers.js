import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Create schema for users
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})


const regattaSchema = new mongoose.Schema({
    // Create schema for regattas
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: Number,
        required: true
    },
    timekeeperIds: {
        type: [Number],
        required: true
    }
})
  

const raceSchema = new mongoose.Schema({
    // Create schema for races
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    finishTime: {
        type: Date,
        required: true
    },
    regattaId: {
        type: Number,
        required: true
    },
    boatIds: {
        type: [Number],
        required: true
    }
})


  const boatSchema = new mongoose.Schema({
    // Create schema for boats
    id: {
        type: Number,
        required: true
    },
    registrationId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    finishTime: {
        type: Date,
        required: true
    },
    dns: {
        type: Boolean,
        required: true
    },
    participantNames: {
        type: [String],
        required: true
    },
    raceId: {
        type: Number,
        required: true
    }
})
  

//exporting the schemas
module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Regatta', regattaSchema);
module.exports = mongoose.model('Race', raceSchema);
module.exports = mongoose.model('Boat', boatSchema);