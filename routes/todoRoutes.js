// create a router
const express = require("express");
const todoController = require("../controllers/todoController");
const todoRouter = express.Router();
const auth = require("../utils/auth");

// add routes to the router
todoRouter.post("/", auth.verifyToken, todoController.createTodo);
todoRouter.get("/", auth.verifyToken, todoController.getTodos);
todoRouter.get("/:id", todoController.getTodo);
todoRouter.put("/:id", todoController.updateTodo);
todoRouter.delete("/:id", todoController.deleteTodo);

// export the router
module.exports = todoRouter;
