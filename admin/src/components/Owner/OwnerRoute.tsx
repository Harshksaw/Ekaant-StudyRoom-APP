

import { Navigate, Outlet } from "react-router-dom";
import OwnerLayout from "./OwnerLayout";


const OwnerRoute = () => {
  const userToken = localStorage.getItem("token"); // Retrieve the user token from local storage
    if (!userToken) {

      return <Navigate to="/signin"  replace={true} />;
    }
  return userToken ? (
    <OwnerLayout>
      <Outlet />
    </OwnerLayout>
  ) : (
    <Navigate to="/signin" />
  );
};
export default OwnerRoute;
