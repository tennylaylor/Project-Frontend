import React from "react";
import TodoList from "./components/TodoList";

import FridgeHome from "./components/FridgeHome";

const App = () => {
  return (
    <div>
      <h1>Interactive Fridge</h1>
      <TodoList />
      <FridgeHome />
    </div>
  );
};

export default App;
