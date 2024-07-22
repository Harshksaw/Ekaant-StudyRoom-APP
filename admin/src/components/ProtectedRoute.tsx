
import { Navigate, Outlet } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage
  useEffect(() => {
    if (!userToken) {

      return <Navigate to="/signin" />;
    }
  }, [userToken]);
  return userToken ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/signin" />
  );
};
export default ProtectedRoute;
