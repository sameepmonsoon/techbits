import { useEffect, useState } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import WriteBlogPage from "./Pages/WriteBlogPage";
import ProfilePage from "./Pages/ProfilePage";
import ReadFullBlogPage from "./Pages/ReadFullBlogPage";
import Home from "./PageComponents/Home/Home";
import Bookmarks from "./PageComponents/Bookmarks/Bookmarks";
import About from "./PageComponents/About/About";
import UpdateProfile from "./Pages/UpdateProfile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [currentUser, setCurrentUser] = useState();
  const [allBlogList, setAllBlogList] = useState([]);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage?.getItem("user")));
    setAllBlogList(JSON.parse(localStorage?.getItem("currentBlogPost")));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "bookmarks",
          element: <Bookmarks />,
        },
        { path: "about", element: <About /> },
      ],
    },
    { path: "/signup", element: <SignUpPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/forgetPassword", element: <ForgetPasswordPage /> },
    { path: "/writeBlog", element: <WriteBlogPage /> },
    { path: "/read/:cardId", element: <ReadFullBlogPage /> },
    { path: "/update", element: <UpdateProfile /> },
  ]);
  return (
    <RouterProvider router={router}>
      {" "}
      <ToastContainer />
    </RouterProvider>
  );
}

export default App;
