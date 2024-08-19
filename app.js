//END OF BASIC SETUP

//import the express module
const express = require("express");

//import the model
const Todo = require("./models/todo");

//create an express application
const app = express();

//use the express middleware for parsing json data
app.use(express.json());

//Define route handler
//Avoiding this would result in "Cannot GET /" error
app.get("/", (request, response) => {
  response.send("Hello using experss JS");
});

//import todoRouter
const todoRouter = require("./routes/todoRoutes");
//To use router from todoRoutes.js
app.use("/api/v1/todos", todoRouter);

//sample post request which sends the request body as response
// app.post("/api/v1/todos", async (req, res) => {
//   try {
//     console.log(req.body);
//     res.send(req.body);
//   } catch {
//     res.status(500).send({ message: error.message });
//   }
// });

//Moved to todoRoutes.js
// app.post("/api/v1/todos", async (req, res) => {
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

module.exports = app;
