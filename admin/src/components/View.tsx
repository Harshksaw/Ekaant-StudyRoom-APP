import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
// import Sidebar from "./Sidebar";

const View = () => {
  return (
    <div>
      <div className="h-[60px] w-full border-b">
        <Navbar />
      </div>
      <div className="flex">
        <div className="basis-[15%] h-100vh">
          <Sidebar />
        </div>
        <div className="basis-[80%]">view</div>
      </div>
    </div>
  );
};

export default View;
