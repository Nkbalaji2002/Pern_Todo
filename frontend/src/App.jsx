import React from "react";
import TaskList from "./TodoList";
import { MainToasts } from "./TodoList/Services/Toast.Service";

const App = () => {
  return (
    <>
      <TaskList />
      <MainToasts />
    </>
  );
};

export default App;
