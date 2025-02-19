import React from "react";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import { questionSchema } from "./schemas/question.schema";
import "./index.css";

// Usage Example
const App = () => {
  return <DynamicForm schema={questionSchema} />;
};

export default App;
