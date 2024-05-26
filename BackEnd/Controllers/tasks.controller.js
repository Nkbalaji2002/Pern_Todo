const taskModel = require("../Models/tasks.js");

// get the tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// post the tasks
const addTasks = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required fields",
      });
    }

    const newTask = await taskModel.addTasks(title, description);

    if (!newTask) {
      return res.status(500).json({
        message: "Failed to add task",
      });
    } else {
      return res.status(201).json({
        message: "Task Created Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (
      title === undefined ||
      description === undefined ||
      completed === undefined
    ) {
      return res.status(400).json({
        message:
          "title, description, and completed are required fields for updating a task",
      });
    }

    const updatedTask = await taskModel.updateTask(
      id,
      title,
      description,
      completed
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    } else {
      return res.status(200).json({
        message: "Task updated successfully",
      });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await taskModel.deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    } else {
      return res.status(200).json({
        message: "Task Deleted successfully",
      });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getTasks,
  addTasks,
  updateTask,
  deleteTask,
};
