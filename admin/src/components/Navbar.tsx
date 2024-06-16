import React from "react";
import firstPic from "../assets/images/Group 1000004651.png";
import Avatar from "../assets/images/Avatar.png";
import SearchInput from "./SearchInput";
import { IoIosNotifications } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="flex">
      <div className="flex w-full h-17 gap-1">
        <img src={firstPic} alt="" className="w-10" />
        <div className="items-center ml-2">
          <SearchInput />
        </div>
      </div>
      <div className="flex items-center justify justify-between gap-2 mr-2">
        <div className="">
          <IoIosNotifications size={30} />
        </div>
        <div className="">
          <img
            className="w-10 h-10 rounded-full"
            src={Avatar}
            alt="Rounded avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
