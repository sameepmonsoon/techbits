import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import "react-toastify/dist/ReactToastify.css";
import AllBlogs from "./Pages/AllBlogs";
import ReducerPage from "./Pages/reducerPage";
import ProtectedRoute from "./Services/Protected Route/ProtectedRoute";
import { createContext, useReducer } from "react";
import {
  localBlogInitialState,
  localBlogReducer,
} from "./Hooks/useReducerCustom";
export const LocalBlogContext = createContext(localBlogInitialState);
function App() {
  const [state, dispatch] = useReducer(localBlogReducer, localBlogInitialState);
  return (
    <LocalBlogContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id?" element={<HomePage name="hello" />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }>
            <Route path="" element={<Home />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
          <Route
            path="/writeBlog/:cardId"
            element={
              <ProtectedRoute>
                <WriteBlogPage />
              </ProtectedRoute>
            }
          />
          <Route path="/read/:cardId?" element={<ReadFullBlogPage />} />
          <Route
            path="/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs" element={<AllBlogs />} />
          {/* <Route path="/useReducer" element={<ReducerPage />} /> */}
        </Routes>
      </BrowserRouter>
    </LocalBlogContext.Provider>
  );
}
export default App;
