import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const router = express.Router();

// TODO: Set up the asynchronous CRUD requests
// Getting all
router.get('/', (req, res) => {

});

// Getting One
router.get('/', (req, res) => {

});

// Creating One
router.post('/', (req, res) => {

});

// Updating One
router.patch('/', (req, res) => {

});

// Deleting One
router.delete('/', (req, res) => {

});

export default router;