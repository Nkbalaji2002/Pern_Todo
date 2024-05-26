const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/tasks.controller.js");

router.get("/", taskController.getTasks);
router.post("/", taskController.addTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
