import { useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import WriteBlogPage from "./Pages/WriteBlogPage";
import ProfilePage from "./Pages/ProfilePage";
import ReadFullBlogPage from "./Pages/ReadFullBlogPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/forgetPassword", element: <ForgetPasswordPage /> },
    { path: "/writeBlog", element: <WriteBlogPage /> },
    { path: "/read/:cardId", element: <ReadFullBlogPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
