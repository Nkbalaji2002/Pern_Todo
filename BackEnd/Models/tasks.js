const pool = require("../DBconfig");

// GET method
const getTasks = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM TASKS`);
    const tasks = result.rows;
    client.release();
    return tasks;
  } catch (error) {
    console.error(error);
  }
};

// POST method
const addTasks = async (title, description) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *`,
      [title, description]
    );
    client.release();
    return result;
  } catch (error) {
    console.error("Error Getting Users", error);
    throw error;
  }
};

// Update method
const updateTask = async (id, title, description, completed) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE task_id = $4 RETURNING *`,
      [title, description, completed, id]
    );
    client.release();
    return result.rows[0]; // Return the updated task
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete method
const deleteTask = async (id) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      `DELETE FROM tasks WHERE task_id = $1 RETURNING *`,
      [id]
    );
    client.release();
    return result.rows[0]; // Return the deleted task
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

module.exports = {
  getTasks,
  addTasks,
  updateTask,
  deleteTask,
};
