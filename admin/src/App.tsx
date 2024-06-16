// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import { Permission, Search, View } from "./components";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/view" element={<View />} />
          <Route path="/permission" element={<Permission />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
