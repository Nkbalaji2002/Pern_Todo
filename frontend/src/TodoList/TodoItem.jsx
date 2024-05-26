import React, { useEffect, useState } from "react";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedCompleted, setEditedCompleted] = useState(task.completed);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editedTitle.length > 1 || editedDescription.length > 1) {
      setError("");
    }
  }, [editedTitle, editedDescription]);

  const handleUpdate = () => {
    if (
      editedTitle.trim().length === 0 ||
      editedDescription.trim().length === 0
    ) {
      setError("Title and description cannot be empty");
      return;
    }
    updateTask(task.task_id, {
      title: editedTitle,
      description: editedDescription,
      completed: editedCompleted,
    });
    setEditing(false);
  };

  const handleCancelEdit = () => {
    // Reset input fields
    setEditedTitle(task.title);
    setEditedDescription(task.description);
    setEditedCompleted(task.completed);
    setEditing(false);
    setError("");
  };

  return (
    <li className="border-b border-gray-200 py-4">
      <div className="flex items-center space-x-4">
        {editing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={editedCompleted}
                onChange={(e) => setEditedCompleted(e.target.checked)}
                className="form-checkbox border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
              <span>Completed</span>
            </label>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{task.title}</span>
            <span>{task.description}</span>
            <span>{task.completed ? "Completed" : "Pending"}</span>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.task_id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </li>
  );
};

export default TaskItem;
