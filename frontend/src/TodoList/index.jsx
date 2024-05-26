import React, { useState, useEffect } from "react";
import {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} from "./Services/Task.service";
import TaskItem from "./TodoItem";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const tasksData = await getTasks();
      const reversedTasksData = tasksData.reverse();
      setTasks(reversedTasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Error fetching tasks");
    }
  };

  const handleAddTask = async () => {
    try {
      if (title.trim().length === 0 || description.trim().length === 0) {
        setError("Title and description cannot be empty");
        return;
      }
      setLoading(true);
      const response = await addTask({ title, description, completed });
      if (response) {
        fetchTasks();
      }
      setTitle("");
      setDescription("");
      setCompleted(false);
      setLoading(false);
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Error adding task");
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      setLoading(true);
      const response = await updateTask(taskId, updatedData);
      if (response) {
        fetchTasks();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Error updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      setLoading(true);
      await deleteTask(taskId);
      fetchTasks();
      setLoading(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task");
    }
  };

  const handleTitleChange = (e) => {
    if (title.trim().length > 1) {
      setError("");
    } else {
      setError("Title must be at least 2 characters long");
    }
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    if (description.trim().length > 1) {
      setError("");
    } else {
      setError("Description must be at least 2 characters long");
    }
    setDescription(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold my-3">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
        className="border border-gray-300 px-4 py-2 mb-4 mr-3 rounded-md focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        className="border border-gray-300 px-4 py-2 mb-4 mr-3 rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Task
      </button>
      <>
        <h2 className="text-xl font-semibold my-2">Task List</h2>
        {loading && <p>Loading tasks...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.task_id}
              task={task}
              updateTask={handleUpdateTask}
              deleteTask={handleDeleteTask}
            />
          ))}
        </ul>
      </>
    </div>
  );
};

export default TaskList;
