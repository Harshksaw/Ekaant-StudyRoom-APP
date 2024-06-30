import exp from "constants";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import OwnerLayout from "./OwnerLayout";

const OwnerRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage

  return userToken ? (
    <OwnerLayout>
      <Outlet />
    </OwnerLayout>
  ) : (
    <Navigate to="/login" />
  );
};
export default OwnerRoute;
