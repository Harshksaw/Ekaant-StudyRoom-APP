import exp from "constants";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage

  return !userToken ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
