import React, { useState, useEffect } from "react";
import { getTodos, addTodo, deleteTodo } from "../services/todoService";

const TodoList = ({ onBack }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

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
          <li key={todo._id}>
            {todo.task}
            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
