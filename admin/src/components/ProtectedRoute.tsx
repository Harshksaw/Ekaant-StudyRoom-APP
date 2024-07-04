
import { Navigate, Outlet } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";

const ProtectedRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage

  return userToken ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/login" />
  );
};
export default ProtectedRoute;
