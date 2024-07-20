
import { useState } from "react";
import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "@/lib/utils";
import { Send } from "lucide-react";

const Auth = ({ type }: { type: "signin" }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: 0,
    password: "",
  });

  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const [authMethod, setAuthMethod] = useState("password");
  const navigate = useNavigate();

  const handleAuthMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthMethod(e.target.value);
  };

  // send otp--
  

  // verfiy otp
  const verifyOtp = async () => {
    try {
      const response = await axios.post(`${BASEURL}/api/v1/auth/verifyOtp`, {
        otp: otp,
      });
      if (response.data.success) {
        setVerified(true);
        console.log(verified);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function sendRequest() {
    if (type === "signin") {
      try {
        const response = await axios.post(`${BASEURL}/api/v1/admin/loginAdmin`, {
          email: userInfo.email,
          password: userInfo.password,
        });
      
        if (response.data.success) {
          console.log(response);
          const token = response.data.token;

          const accountType = response.data.data.accountType;
          const accountId = response.data.data._id;

          
          localStorage.setItem("token", token);
          
          localStorage.setItem("userId", accountId);



          localStorage.setItem("role", accountType);

          const role = localStorage.getItem("role");
          console.log("----65");
          if(!response?.hasRooms){
            navigate("/manage-library/create-room", { replace: true });
          }else{

            
            role === "Admin"
            ? navigate("/dashboard", { replace: true })
            : navigate("/admin", { replace: true });
          }
        } else {
          // Handle unsuccessful login attempt
          alert("Login failed. Please check your credentials.");
        }
      } catch (e) {
        console.error("Error during login:", e);
        alert("Error while signing up. Please check the console for more details.");
      }
    }
  }

  return (
    <div className="flex h-screen   flex-1  w-screen ">
      {/* pic  */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 to-sky-700 w-1/2">
        <div className="flex justify-center items-center gap-10">
          <img src={studyMain} alt="pic" width={100} height={100} />
          <p className=" h-30 font-semibold text-7xl text-white">EKAANT</p>
        </div>

        <div className="flex justify-center items-center">
          <img src={reading} alt="pic" width={400} height={400} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-3xl">
            Welcome to Ekaant Admin Panel
          </p>
          <p className="font-normal text-base">
            Lorem ipsum dolor sit amet, conscs <br /> ectetur adipiscing elit
            velit.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col border w-1/2 p-5">
        <div className="self-end mb-5">
          {type === "signin" ? (
            <Link
              to="/signup"
              className="absolute top-0 right-0 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-full"
            >
              REGISTER
            </Link>
          ) : (
            <Link
              to="/signin"
              className="absolute top-0 right-0 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-full"
            >
              LOGIN
            </Link>
          )}
        </div>
        <div className="w-full max-w-md ">
          <h1 className="text-5xl font-bold mb-2 text-center">
            {type === "signin" ? "Login" : "Register"}
          </h1>
          <h6 className="text-base font-normal mb-4 text-center">
            Hello! Let's get started
          </h6>
          <div className="px-20">
    
            {showOtp && userInfo.phone >= 1000000 && (
              <div className="flex justify-between items-center gap-2 mb-4">
                <input
                  className="px-4 py-2 w-full rounded-lg border text-base bg-white text-gray-400"
                  type="number"
                  value={otp}
                  placeholder="Otp"
                  onChange={(e) => setOtp(e.target.valueAsNumber)}
                />
                <button
                  className="border rounded-full p-2 bg-blue-500 text-white"
                  onClick={verifyOtp}
                >
                  Verify
                </button>
              </div>
            )}
            <LabelledInput
              label="Enter Email Id"
              placeholder="Email"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={userInfo.password}
              className=" text-gray-900 text-sm  block w-full p-2.5"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
            <button
              className="w-full bg-gradient-to-r from-sky-500 to-blue-300 text-white py-2 px-4 rounded-full mt-1 hover:bg-blue-600"
              type="button"
              onClick={sendRequest}
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
