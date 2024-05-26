import axios from "axios";
import { apiUrl } from "../environments/URL";

const api = axios.create({
  baseURL: apiUrl,
});

const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addTask = async (taskData) => {
  try {
    const response = await api.post("/tasks", taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { addTask, updateTask, deleteTask, getTasks };
