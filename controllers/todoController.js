const { default: mongoose } = require("mongoose");
const Todo = require("../models/todo");

const todoController = {
  createTodo: async (req, res) => {
    try {
      // get the description from the request body
      const { description, status } = req.body;

      // get the user id from the request object
      const userId = req.userId;

      // create a new todo
      const newTodo = new Todo({
        description,
        status,
        user: userId,
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
      // get the user id from the request object
      const userId = req.userId;

      // get all the todos added by the user
      const todos = await Todo.find({ user: userId }, { __v: 0 });

      res.status(200).send({ message: "Todos fetched successfully", todos });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getTodo: async (req, res) => {
    try {
      const { id } = req.params;

      // const todo = await Todo.find({ _id: id}, { __v: 0 });
      const todo = await Todo.findById(id, { __v: 0 });

      if (!todo) {
        return res.status(404).send({ message: "Todo not found" });
      }

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
      if (status != undefined) todo.status = status;

      // save the updated todo
      const updatedTodo = await todo.save();

      res.send({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const { id } = req.params;

      // find the todo by id and delete it
      const deletedTodo = await Todo.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).send({ message: "Todo not found" });
      }

      res.send({ message: "Todo deleted successfully", todo: deletedTodo });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = todoController;
