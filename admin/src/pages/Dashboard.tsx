import React from "react";
import { Sidebar, Navbar } from "../components/index";
import SeatLayout from "@/components/seatinglayout/SeatLayout";
import Seats from "@/components/seatinglayout/SeatLayout";
import { TableDemo } from "@/components/table/Table";

const Dashboard = () => {
  return (
    <div>
  
          Seating Plan
          <TableDemo />
          {/* <Seats /> */}



    </div>
  );
};

export default Dashboard;
