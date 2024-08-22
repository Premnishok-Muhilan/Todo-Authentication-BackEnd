//importing the Todo model from todo.js inside models
const Todo = require("../models/todo");

//todoController object
const todoController = {
  createTodo: async (req, res) => {
    try {
      // get the description from the request body
      const { description } = req.body;

      // create a new todo
      const newTodo = new Todo({
        description,
      });

      // save the todo to the database
      const savedTodo = await newTodo.save();

      // send the saved todo as a response
      res.send({ message: "Todo created successfully", todo: savedTodo });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getTodos: async (req, res) => {
    try {
      //moved to logger.js inside the utils directory
      // console.log(req.query);
      // console.log(req.method);
      // console.log(req.url);
      // console.log(req.params);
      // console.log(req.body);

      //dummy send to req
      //res.send({ message: "All Todos" });
      //Todo: model name
      const todos = await Todo.find({}, { __v: 0 });
      res.status(200).send({ message: "Todos fetched successfully!", todos });
      //   res.send(todos);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getTodo: async (req, res) => {
    try {
      const { id } = req.params;

      // const todo = await Todo.find({ _id: id}, { __v: 0 });
      const todo = await Todo.findById(id, { __v: 0 });

      res.send({ message: "Todo fetched successfully", todo });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  updateTodo: async (req, res) => {
    try {
      const { id } = req.params;

      const { description, status } = req.body;

      // get the todo from the database matching the id
      const todo = await Todo.findById(id, { __v: 0 });

      if (!todo) {
        return res.status(404).send({ message: "Todo not found" });
      }

      // update the todo with the new data
      if (description) todo.description = description;
      if (status) todo.status = status;

      // save the updated todo
      const updatedTodo = await todo.save();

      res.send({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

//export the todoController object
module.exports = todoController;
