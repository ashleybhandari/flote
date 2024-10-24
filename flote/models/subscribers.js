import { createRequire } from "module";
const require = createRequire(import.meta.url);
const mongoose = require('mongoose');

// EXAMPLE:
const userSchema = new mongoose.Schema({
    // Create schema for users
    email: {
        type: String,
        required: true
    }

    // TODO: add more
})