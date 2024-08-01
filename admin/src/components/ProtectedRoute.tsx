
import { Navigate, Outlet } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage
    if (!userToken) {

      return <Navigate to="/signin" />;
    }
  return userToken ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/signin" />
  );
};
export default ProtectedRoute;
