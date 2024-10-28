import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const router = express.Router();

//Importing the models to the controller 
const Model = require("../models/subscribers");

// TODO: Set up the asynchronous CRUD requests

// Getting all
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

// Getting One
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

// Creating One
router.post('/post', async (req, res) => {
    // insert data code
    const newUser = new Model({email: req.body.email, password: req.body.password, name: req.body.name});
    // const result = await db.insertMany(newUser);

    try {
        const dataToSave = await newUser.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

});

// Updating One
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// Deleting One
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

export default router;
