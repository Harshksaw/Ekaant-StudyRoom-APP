import firstPic from "../assets/images/Group 1000004651.png";
// import Avatar from "../assets/images/Avatar.png";
import SearchInput from "./SearchInput";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import user from "../assets/images/user.jpeg"
const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4  border-b-2 border-gray-300 bg-white  rounded-lg">
      {/* Left Section: Logo & Search */}
      <div className="flex items-center gap-4">
        <img src={firstPic} alt="Logo" className="w-16 h-16 object-contain" />
        <div className="w-96 mt-3">
          <SearchInput />
        </div>
      </div>

      {/* Right Section: Avatar and Logout */}
      <div className="flex items-center gap-4">
        <div className="relative">
          {/* Avatar section (you can uncomment and use it when you have the image) */}
          {/* <img className="w-10 h-10 rounded-full object-cover" src={Avatar} alt="User Avatar" /> */}
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <img src={user} alt="" className="h-12 w-12 rounded-full" />
            <h1 className="font-bold">Hi, Ashwin </h1>
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
