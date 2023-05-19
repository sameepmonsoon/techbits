import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
function App() {
  const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);
  return <RouterProvider router={router} />;
}

export default App;
