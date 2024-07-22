

import { Navigate, Outlet } from "react-router-dom";
import OwnerLayout from "./OwnerLayout";
import { useEffect } from "react";

const OwnerRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage
  useEffect(() => {
    if (!userToken) {

      return <Navigate to="/signin"  replace={true} />;
    }
  }, [userToken]);
  return userToken ? (
    <OwnerLayout>
      <Outlet />
    </OwnerLayout>
  ) : (
    <Navigate to="/signin" />
  );
};
export default OwnerRoute;
