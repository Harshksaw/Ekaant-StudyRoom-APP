// ProtectedLayout.tsx
import React from "react";
import Navbar from "../Navbar";
import OwnerSidebar from "./OwnerSidebar";


const OwnerLayout: React.FC = ({ children }) => {
  return (
    <>
    <main className="h-screen w-full">
    <div className="h-[8%] w-full border-b">
        <Navbar />
      </div>
      <div className="flex h-[92%] ">
        <div className="w-60 rounded-2xl m-2 bg-slate-100 ">
          <OwnerSidebar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </main>
     
    </>
  );
};

export default OwnerLayout;
