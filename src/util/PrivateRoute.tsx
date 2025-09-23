import { JSX } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import LoadingPage from "../pages/Loading/Loading";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("access_token");

  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
