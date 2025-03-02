import firstPic from "../assets/images/Group 1000004651.png";
// import Avatar from "../assets/images/Avatar.png";
import SearchInput from "./SearchInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import user from "../assets/images/user1.jpg";
import { useEffect, useState } from "react";
import { getLibraryDataById } from "@/hooks/libraryData";
import { IoIosSearch } from "react-icons/io";
const Navbar = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/signin");
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await getLibraryDataById();
        const firstname = response.data.data[0].name.split(" ")[0];
        setName(firstname);
      } catch (error) {
        console.error("Error fetching library:", error);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <div className="relative flex justify-between items-center px-8 py-4 border-b-2 border-gray-300 bg-white rounded-lg">
      {/* Left Section: Logo & Search */}
      <div className="flex items-center gap-4">
        <img src={firstPic} alt="Logo" className="w-16 h-16 object-contain" />
        <div className="w-full mt-3 relative flex items-center">
          {/* Search Icon */}
          <IoIosSearch className="absolute left-3  text-gray-400 text-[22px]" />

          {/* Input Field */}
          <input
            type="search"
            placeholder="Search"
            className="pl-9 w-96 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 "
          />
        </div>
      </div>

      {/* Right Section: Avatar and Logout */}
      <div className="flex items-center gap-4">
        <div className="relative">{/* Avatar section */}</div>

        <div className="flex items-center gap-10">
          <div className="flex items-center ">
            <img src={user} alt="" className="h-12 rounded-full" />
            <h1 className="font-bold">Hi, {name} </h1>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={logout}
            className="px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
