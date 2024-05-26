import axios from "axios";
import { apiUrl } from "../environments/URL";
import { ShowErrorMessage, ShowSuccessMessage } from "./Toast.Service";

const api = axios.create({
  baseURL: apiUrl,
});

const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Fetch Error Tasks");
    throw error;
  }
};

const addTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    ShowSuccessMessage("Tasks Added Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed Add Task");
    throw error;
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    ShowSuccessMessage("Task Updated Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed Update Task");
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    ShowSuccessMessage("Task Deleted Successfully");
    return response.data;
  } catch (error) {
    ShowErrorMessage("Failed Delete Task");
    throw error;
  }
};

export { addTask, updateTask, deleteTask, getTasks };
