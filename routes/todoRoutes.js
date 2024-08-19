// create a router
const express = require('express');
const todoRouter = express.Router();
const Todo = require('../models/todo');

// add routes to the router
todoRouter.post('/', async (req, res) => {
    try {
        // get the description from the request body
        const { description } = req.body;

        // create a new todo
        const newTodo = new Todo({
            description
        });

        // save the todo to the database
        const savedTodo = await newTodo.save();

        // send the saved todo as a response
        res.send({ message: 'Todo created successfully', todo: savedTodo });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// export the router
module.exports = todoRouter;