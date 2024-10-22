const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Create schema for users
    email: {
        type: String,
        required: true
    }

    // TODO: add more
})