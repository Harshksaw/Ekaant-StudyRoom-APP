// ProtectedLayout.tsx
import React from "react";
import Navbar from "../Navbar";
import OwnerSidebar from "./OwnerSidebar";


const OwnerLayout: React.FC = ({ children }) => {
  return (
    <>
      <div className="h-[60px] w-full border-b">
        <Navbar />
      </div>
      <div className="flex">
        <div className="basis-[15%] h-100vh">
          <OwnerSidebar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default OwnerLayout;
