// ProtectedLayout.tsx

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./sidebar";
type ProtectedLayoutProps = {
  children: ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
    <main className="h-screen w-full overflow-hidden">
    <div className="h-[8%] w-full border-b">
        <Navbar />
      </div>
      <div className="flex  h-[92%]">
        <div className=" w-72 rounded-2xl m-2 bg-slate-100 ">
          <Sidebar />
        </div>
        <main className=" overflow-scroll w-full p-4">{children}</main>
      </div>
    </main>

    </>
  );
};

export default ProtectedLayout;
