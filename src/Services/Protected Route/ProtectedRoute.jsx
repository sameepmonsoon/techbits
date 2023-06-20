import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user?._id) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
