// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import { Permission, Search, View } from "./components";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";

import ManageSeats from "./pages/ManageSeats";
import CreateLibrary from "./components/ManageLibrary/CreateLibrary";
import ViewLibrary from "./components/ManageLibrary/ViewLibrary";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/manage-user/view" element={<View />} />
            <Route path="manage-user/permission" element={<Permission />} />
            <Route path="manage-user/search" element={<Search />} />
            <Route
              path="manage-library/create-library"
              element={<CreateLibrary />}
            />
            <Route
              path="manage-library/view-library/:library_id"
              element={<ViewLibrary />}
            />
            <Route path="/manage-seats" element={<ManageSeats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
