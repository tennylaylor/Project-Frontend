import React, { useState, useEffect } from "react";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../services/todoService";

const TodoList = ({ onBack }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [editTodoId, setEditTodoId] = useState(null); // Track the todo being edited
  const [updatedTask, setUpdatedTask] = useState(""); // Track the updated task

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
      setError("");
    } catch (error) {
      setError("Failed to fetch todos");
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTask.trim()) {
      setError("Please enter a task");
      return;
    }

    try {
      const response = await addTodo({
        task: newTask.trim(),
        completed: false,
        priority: "medium",
      });
      setTodos([...todos, response.data]);
      setNewTask("");
      setError("");
    } catch (error) {
      setError("Failed to add todo");
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError("");
    } catch (error) {
      setError("Failed to delete todo");
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditClick = (id, currentTask) => {
    setEditTodoId(id);
    setUpdatedTask(currentTask);
  };

  const handleSaveEdit = async (id) => {
    if (!updatedTask.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      const response = await updateTodo(id, { task: updatedTask.trim() });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, task: response.data.task } : todo
        )
      );
      setEditTodoId(null);
      setUpdatedTask("");
      setError("");
    } catch (error) {
      setError("Failed to update todo");
      console.error("Error updating todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setUpdatedTask("");
  };

  return (
    <div className="notepad">
      <h2>To-Do List</h2>
      <button onClick={onBack} className="mb-4">
        Back to Home
      </button>
      {error && <div className="error-message">{error}</div>}

      <div className="add-todo">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            {editTodoId === todo._id ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  style={{
                    marginRight: "5px",
                    padding: "5px",
                    borderRadius: "3px",
                  }}
                />
                <button
                  onClick={() => handleSaveEdit(todo._id)}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "10px",
                    padding: "5px",
                    marginRight: "5px",
                    borderRadius: "3px",
                    width: "60px", // Narrower width
                  }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: "10px",
                    padding: "5px",
                    borderRadius: "3px",
                    width: "60px", // Narrower width
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{todo.task}</span>
                <div>
                  <button
                    onClick={() => handleEditClick(todo._id, todo.task)}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      fontSize: "10px",
                      padding: "5px",
                      borderRadius: "3px",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo._id)}
                    style={{
                      backgroundColor: "gray",
                      color: "white",
                      fontSize: "10px",
                      padding: "5px",
                      borderRadius: "3px",
                    }}
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
