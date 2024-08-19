// Import the Express library
const express = require("express");

/*
Creating a new instance of an Express router in a Node.js
application using the Express framework.
Routers are used to handle HTTP requests in a modular way.
You would use this router to define routes related to a specific
part of your application, like a set of routes for managing to-do items.
For example, 
    You might set up routes to create, read, update, and
    delete to-do items using this todoRouter
*/
const todoRouter = express.Router();

const Todo = require("../models/todo");

const todoController = require("../controllers/todoController");
todoRouter.post("/", todoController.createTodo);

// add routes to the router
// todoRouter.post("/", async (req, res) => {
//   try {
//     // get the description from the request body
//     const { description } = req.body;

//     // create a new todo
//     const newTodo = new Todo({
//       description,
//     });

//     // save the todo to the database
//     const savedTodo = await newTodo.save();

//     // send the saved todo as a response
//     res.send({ message: "Todo created successfully", todo: savedTodo });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// export the router
module.exports = todoRouter;
