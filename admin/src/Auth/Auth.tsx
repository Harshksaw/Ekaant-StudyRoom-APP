
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
  const sendOtp = async () => {
    try {
      // send otp
      console.log(userInfo.phone);
      setShowOtp(true);
      const response = await axios.post(`${BASEURL}/api/v1/auth/otp`, {
        phoneNumber: userInfo.phone,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        const response = await axios.post(`${BASEURL}/api/v1/auth/signin`, {
          username: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo?.phone,
          password: userInfo.password,
          accountType: "Admin",
        });

        if (response.data.success) {
          console.log(response.data);
          console.log(response.data.token);
          const token = response.data.token;
          const accountType = response.data.data.user.accountType;

          localStorage.setItem("token", token);
          localStorage.setItem("userId", response.data.data.user._id);
          localStorage.setItem("role", accountType);
          const role = await localStorage.getItem("role");

          role === "Admin"
            ? navigate("/dashboard", {
                replace: true,
              })
            : navigate("/admin", {
                replace: true,
              });
        }
      } catch (e) {
        alert("error while signing up");
        console.log("error is ", e);
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
          {/* <div className="flex justify-start gap-2 items-center mb-4">
              <p className="p-2 border rounded-lg">+91</p>
              <input
                type="number"
                className="px-4 py-2 w-full rounded-lg border text-base bg-white text-gray-400"
                value={userInfo?.phone.toString()}
                placeholder="Phone"
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    phone: e.target.value ? parseInt(e.target.value, 10) : 0,
                  })
                }
              />
              <Send
                onClick={() => sendOtp()}
                className="border rounded-lg p-3 h-10 w-12"
              />
            </div> */}
               <div className="flex justify-start border border-black bg-white">
        <label
          className=" w-24  py-2  text-black  h-[50px] justify-center items-center
        text-center border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer rounded-full "
        >
          <span className="text-3xl">🇮🇳</span>
        </label>
        <input
          type="number"
          // className="px-4 py-2 w-[410px] border-2 border-black  text-base bg-white text-gray-400"
          className="focus:ring-0 focus:ring-offset-0 focus:outline-0 focus:outline-offset-0 "
          value={userInfo?.phone.toString()}
          placeholder="Phone"
          onChange={(e) => {
            const inputVal = e.target.value;
            // Update the userInfo state with the new phone number
            setUserInfo({
              ...userInfo,
              phone: inputVal ? parseInt(inputVal, 10) : 0,
            });
            // Check if the input length is 10 and call a function
            if (inputVal.length === 10) {
              // Call your desired function here

              console.log("Input is 10 digits, calling function...");
              // functionName(); // Replace functionName with the actual function you want to call
            }
          }}
          style={{ border: "none", justifyContent: "center" }}
        />
      </div>
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
