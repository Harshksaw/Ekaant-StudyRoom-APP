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
/////
import CreateRoom from "./components/ManageLibrary/CreateRoom";
import ViewBookings from "./components/ManageBookings/ViewBookings";
import Signup from "./Auth/Signup";

import EditLibrary from "./components/ManageLibrary/EditLibrary";
import LocationForm from "./components/Owner/AppConfig";
import LibraryPage from "./components/Owner/DummyLib";
import PhoneOtpForm from "./components/forgot-password";
import LibraryBookings from "./components/ManageBookings/ViewLibraryBookings";
import Report from "./pages/Report";
import { useEffect, useState } from "react";
import AdminOfflinePayments from "./components/ManageBookings/OffllineBooking";

function App() {
  // const [count, setCount] = useState(0);
  // const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  // useEffect(() => {

  //   const getUserType = async () => {
  //     const response = await User
  //   }
  // }, []);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Restricted Access</h1>
          <p className="mt-4 text-lg">Please open the admin panel on a laptop or desktop.</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter basename="/">
      <Routes>
    {/* ----------------- Public Routes ----------------- */}
    <Route path="/" element={<Auth type="signin" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Auth type="signin" />} />
        <Route path="/forgot-password" element={<PhoneOtpForm />} />

        {/* ----------------- Protected Routes for Admin ----------------- */}
        {role === "Admin" && (
          <Route element={<ProtectedRoute />}>
            {/* Create Operations */}
            <Route
              path="/manage-library/create-room"
              element={<CreateRoom />}
            />
            <Route
              path="/manage-library/create-library"
              element={<CreateLibrary />}
            />
            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Bookings */}
            <Route path="/manage-booking/view" element={<ViewBookings />} />
            <Route
              path="/manage-booking/adminbookings"
              element={<LibraryBookings />}
            />
            <Route
              path="/manage-booking/OfflineBooking"
              element={<AdminOfflinePayments />}
            />

            {/* Library Details */}
            <Route
              path="/manage-library/view-library/:library_id"
              element={<ViewLibrary />}
            />
            <Route
              path="/manage-library/my-library"
              element={<MyLibrary />}
            />
            <Route
              path="/manage-library/edit-library/:id"
              element={<EditLibrary />}
            />
            {/* Manage Seats & Reports */}
            <Route path="/manage-seats" element={<ManageSeats />} />
            <Route path="/report" element={<Report />} />

            <Route path="/manage-booking/adminbookings" element={<LibraryBookings />} />
          </Route>
        )}

        {/* ----------------- Protected Routes for Owner ----------------- */}
        {role === "Owner" && (
          <Route element={<OwnerRoute />}>
            <Route path="/admin" element={<OwnerHome />} />
            <Route
              path="/admin/manage-rooms/:lib_id"
              element={<ManageRooms />}
            />
            <Route path="/admin/manage-admin" element={<ManageAdmin />} />
            <Route path="/admin/app-config" element={<LocationForm />} />
            <Route path="/admin/dummy" element={<LibraryPage />} />
          </Route>
        )}

        {/* ----------------- Fallback Route ----------------- */}
        <Route
          path="*"
          element={
            <div className="bg-black text-white flex items-center justify-center">
              <h1 className="text-3xl">404</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
