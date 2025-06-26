const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

// http://localhost:3000/todos
router.post("/", todoController.createTodo);
router.get("/", todoController.findAllTodos);
router.get("/:id", todoController.findTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;