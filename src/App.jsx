import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/forgetPassword", element: <ForgetPasswordPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
