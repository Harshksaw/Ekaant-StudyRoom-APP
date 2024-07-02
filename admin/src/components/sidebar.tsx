// import React from "react";
import {
  FaRegSun,
  // FaTachometerAlt,
  // FaChevronRight,
  // FaWrench,
  FaStickyNote,
  FaRegChartBar,
  // FaRegCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";
import dashboard from "../assets/images/chart-pie.png";
import ManageUsers from "./ManageUsers";
// import Booking from "./ManageLibrary";
import { Link } from "react-router-dom";
import ManageLibrary from "./LibraryAccordion";
const Sidebar = () => {
  return (
    <div
      className="
     
     h-full px-[25px] 
     flex
      flex-col
      justify-between
      items-center
     "
    >
      <div>
        <div className="flex items-center gap-4 py-5  ">
          {/* <FaTachometerAlt color="white" /> */}
          <img
            src={dashboard}
            alt=""
            className="w-4
        h-4 cursor-pointer"
          />
          <p className="text-base  font-bold text-green-600">Dashboard</p>
        </div>
        <div className="">
          {/* <p className="text-[10px] font-extrabold leading-4 text-white/[0.4]">
          INTERFACE
        </p> */}
          <div className="flex items-center justify-between   cursor-pointer">
            <div className="flex items-center gap-2 ">
              <FaRegSun color="black" />
              <ManageLibrary />
            </div>

            {/* <FaChevronRight color="white" /> */}
          </div>
          {/* todo-- */}
          {/* manage user styling theek krne hai */}
          <div className="flex items-center justify-between   cursor-pointer">
            
            <div className="flex items-center gap-2 ">
              <FaRegSun color="black" />
              <ManageUsers />
            </div>

            {/* <FaChevronRight color="white" /> */}
          </div>

          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
            <div className="flex items-center  gap-2 px-1">
              <FaRegChartBar color="black" />

              <p className="text-[16px] leading-5 font-normal text-black">
                <Link to="/manage-seats">Manage Seats</Link>
              </p>
            </div>
            {/* <FaChevronRight color="white" /> */}
          </div>
          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
            <div className="flex items-center  gap-2 px-1">
              <FaRegChartBar color="black" />
              <p className="text-[16px] leading-5 font-normal text-black">
                Reports
              </p>
              <FaChevronDown
                color="black"
                fontSize="
            11px"
              />
            </div>
          </div>
        </div>
        <div className="pt-4 border-b  border-black pb-4 gap-5">
          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
            <div className="flex items-center gap-[10px]">
              <FaStickyNote color="black" />
              <p className="text-[14px] leading-5 font-normal text-black">
                Documents
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
            <div className="flex items-center gap-[10px]">
              <FaRegSun color="black" />
              <p className="text-[14px] leading-5 font-normal text-black">
                Settings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[10px] py-[15px]">
            <FaRegSun color="black" />
            <p className="text-[14px] leading-5 font-normal text-black">Help</p>
          </div>
        </div>
      </div>

      {/* todo-- yeh bhi theek krna hai */}
      <div className="">
        <div className=" flex-end flex items-end justify-center gap-4 ">
          <FaRegSun color="black" />

          <FaRegSun color="black" />

          <FaRegSun color="black" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
