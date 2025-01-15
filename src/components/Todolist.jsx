import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Function to fetch todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos`
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching to-dos:", error);
    }
  };

  // Fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new to-do
  const addTodo = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/todos`,
        {
          task: newTask,
          completed: false,
          priority: "medium",
        }
      );
      setTodos([...todos, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding to-do:", error);
    }
  };

  // Delete a to-do
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting to-do:", error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
