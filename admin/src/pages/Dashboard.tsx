import React from "react";
import { Sidebar, Navbar } from "../components/index";
const Dashboard = () => {
  return (
    <div>
      <div className="h-[60px] w-full border-b">
        <Navbar />
      </div>
      <div className="flex">
        <div className="basis-[15%] h-100vh">
          <Sidebar />
        </div>
        <div className="basis-[80%]">d</div>
      </div>
    </div>
  );
};

export default Dashboard;
