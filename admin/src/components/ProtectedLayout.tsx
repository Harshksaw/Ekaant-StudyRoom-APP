// ProtectedLayout.tsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ProtectedLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-[60px] w-full border-b">
        <Navbar />
      </div>
      <div className="flex">
        <div className="basis-[15%] h-100vh">
          <Sidebar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default ProtectedLayout;
