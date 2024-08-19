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

//importing the Todo model from todo.js inside models
const Todo = require("../models/todo");

//importing todoController object from todoController.js

const todoController = require("../controllers/todoController");

/*Using the createTodo method of the todoController object for the post request
.post("/", ...): This is a method provided by the Express router to define a route that
 handles HTTP POST requests. The .post method takes two main arguments:
    1.Path ("/"): The first argument is the path for the route. In this case, "/" represents
     the root path for the router. This means that the route will match POST requests sent 
     to the base URL of this router.
    2.Handler Function (todoController.createTodo): The second argument is a callback function
     that will be executed when a POST request is made to this route. This function is 
     responsible for handling the request and generating a response.
*/

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
