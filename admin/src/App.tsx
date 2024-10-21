import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import ManageSeats from "./pages/ManageSeats";
import CreateLibrary from "./components/ManageLibrary/CreateLibrary";
import ViewLibrary from "./components/ManageLibrary/ViewLibrary";
import ManageAdmin from "./pages/Owner/ManageAdmin";
import ManageRooms from "./pages/Owner/ManageRooms";
import OwnerRoute from "./components/Owner/OwnerRoute";

import OwnerHome from "./components/Owner/OwnerHome";
import MyLibrary from "./components/ManageLibrary/MyLibrary";
import Auth from "./Auth/Auth";

import CreateRoom from "./components/ManageLibrary/CreateRoom";
import ViewBookings from "./components/ManageBookings/ViewBookings";
import Signup from "./Auth/Signup";
import AdminBookings from "./components/Search";
import EditLibrary from "./components/ManageLibrary/EditLibrary";

function App() {
  // const [count, setCount] = useState(0);
  // const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  // useEffect(() => {

  //   const getUserType = async () => {
  //     const response = await User
  //   }
  // }, []);
  console.log(role);
  return (
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Auth type="signin" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Auth type="signin" />} />
      {role === "Admin" && (
        <Route element={<ProtectedRoute />}>
          <Route
            path="/manage-library/create-room"
            element={<CreateRoom />}
          />
          <Route
            path="/manage-library/create-library"
            element={<CreateLibrary />}
          />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/manage-booking/view" element={<ViewBookings />} />

          <Route path="/manage-booking/adminbookings" element={<AdminBookings />} />

          <Route
            path="/manage-library/view-library/:library_id"
            element={<ViewLibrary />}
          />
          <Route path="/manage-library/my-library" element={<MyLibrary />} />
          <Route path="/manage-library/edit-library/:id" element={<EditLibrary />} />

          <Route path="/manage-seats" element={<ManageSeats />} />
        </Route>
      )}
      {role === "Owner" && (
        <Route element={<OwnerRoute />}>
          <Route path="/admin" element={<OwnerHome />} />
          <Route
            path="/admin/manage-rooms/:lib_id"
            element={<ManageRooms />}
          />
          <Route path="/admin/manage-admin" element={<ManageAdmin />} />
          {/* <Route path="/admin/reports" element={<Reports />} /> */}
        </Route>
      )}
      <Route
        path="*"
        element={
          <div className=" bg-black text-white flex items-center justify-center">
            <h1 className="text-3xl">404</h1>
          </div>
        }
      />
    </Routes>
    {/* Fallback route */}
  </BrowserRouter>
  );
}

export default App;
