import React from "react";
import { FaRegSun, FaStickyNote } from "react-icons/fa";
import dashboard from "../../assets/images/chart-pie.png";

import ManageAdmin from "@/pages/Owner/ManageAdmin";
import ManageRooms from "@/pages/Owner/ManageRooms";
import { Link } from "react-router-dom";

const OwnerSidebar = () => {
  return (
    <div className="h-full px-[25px] flex flex-col justify-between items-center">
      <div>
        <div className="flex items-center gap-4 py-5">
          <img src={dashboard} alt="" className="w-4 h-4 cursor-pointer" />
          <p className="text-base font-bold text-green-600">Dashboard</p>
        </div>
        <div className="">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 ">
              <FaRegSun color="black" />

              <p className="text-[16px] leading-5 font-normal text-black">
                <Link to="admin/manage-rooms">Manage Room</Link>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2 ">
              <FaRegSun color="black" />
              <p className="text-[16px] leading-5 font-normal text-black">
                <Link to="/manage-seats">Manage Admins</Link>
              </p>
            </div>
          </div>

          
        </div>
        <div className="pt-4 border-b border-black pb-4 gap-5">
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
      <div className="">
        <div className="flex-end flex items-end justify-center gap-4">
          <FaRegSun color="black" />
        </div>
      </div>
    </div>
  );
};

export default OwnerSidebar;
