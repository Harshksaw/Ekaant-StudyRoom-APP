import { useState } from "react";
import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "@/lib/utils";
import { Send } from "lucide-react";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: 0,
    password: "",
  });

  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const [authMethod,setAuthMethod]=useState("password")
  const navigate = useNavigate();


  const handleAuthMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {



    setAuthMethod(e.target.value);
  }

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
        // const jwt = res.data;

        if (response.data.success) {
          // console.log(response.data.user.accountType)
          console.log(response.data);
          console.log(response.data.token);
          const token = response.data.token;
          const accountType = response.data.data.user.accountType; // Extract accountType

          localStorage.setItem("token", token);
          localStorage.setItem("userId", response.data.data.user._id);
          localStorage.setItem("role", accountType); // Store accountType in localStorage
          const role = await localStorage.getItem("role");

          // role === 'Admin' ?  navigate("manage-library/create-library") : navigate("/admin");
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
    if (type === "signup") {
      try {
        console.log(userInfo);
        const response = await axios.post(`${BASEURL}/api/v1/auth/signup`, {
          username: userInfo.name,
          email: userInfo.email,
          phoneNumber: userInfo?.phone,
          password: userInfo.password,
          accountType: "Admin",
        });
        if (response.data.success) {
          console.log("signup success");
          console.log(response.data);
          // console.log(response.data.token);
          const token = response.data.token;
          // const accountType = response.data.data.user.accountType; // Extract accountType

          localStorage.setItem("token", token);
          navigate("/dashboard");
          // localStorage.setItem("userId", response.data.data.user._id);
          // localStorage.setItem("role", "admin "); // Store accountType in localStorage
          // const role = await localStorage.getItem("role");

          // role === 'Admin' ?  navigate("manage-library/create-library") : navigate("/admin");
          // role === "Admin"
          //   ? navigate("/dashboard", {
          //       replace: true,
          //     })
          //   : navigate("/admin", {
          //       replace: true,
          //     });
        }
      } catch (e) {
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

      {/* main inputs  */}
      <div className="flex justify-center items-center flex-col border w-1/2 p-5">
        <div className="self-end mb-5">
          {type === "signup" ? (
            <Link
              to="/signin"
              className="absolute top-0 right-0 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-full"
            >
              LOGIN
            </Link>
          ) : (
            <Link
              to="/signup"
              className="absolute top-0 right-0 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-4 rounded-full"
            >
              REGISTER
            </Link>
          )}
        </div>
        <div className="w-full max-w-md">
          <h1 className="text-5xl font-bold mb-2">
            {type === "signin" ? "Login" : "Register"}
          </h1>
          <h6 className="text-base font-normal mb-4">
            Hello! Let's get started
          </h6>
          <div className="px-20">


            {type === "signup" && (
              <>
                <LabelledInput
                  label="Enter Name"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                 
                />
                <div className="flex justify-start gap-2 items-center mb-4">
                  <p className="p-2 border rounded-lg">+91</p>
                  <input
                    type="number"
                    className="px-4 py-2 w-full rounded-lg border text-base bg-white text-gray-400"
                    value={userInfo?.phone.toString()}
                    placeholder="Phone"
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        phone: e.target.value
                          ? parseInt(e.target.value, 10)
                          : 0,
                      })
                    }
                  />
                  <Send
                    onClick={() => sendOtp()}
                    className="border rounded-lg p-3 h-10 w-12"
                  />
                </div>
              </>
            )}
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
            {/* for login with otp or password */}
            {type === "signin"?(
               <div>
               <input
                 type="radio"
                 id="password"
                 name="authMethod"
                 value="password"
                 checked={authMethod === 'password'}
                  //  className=" text-gray-900 text-sm  block w-full p-2.5"
                 onChange={handleAuthMethodChange}
               />
               <label htmlFor="password"
                  className=" block mb-2 text-sm font-bold text-black pt-4"
               >Password</label>
       
               <input
                 type="radio"
                 id="otp"
                 name="authMethod"
                 value="otp"
                 checked={authMethod === 'otp'}
                 onChange={handleAuthMethodChange}
                //  className=" text-gray-900 text-sm  block w-full p-2.5"
               />
               <label htmlFor="otp"
                  className=" block mb-2 text-sm font-bold text-black pt-4">OTP</label>
             </div>
            ):("")}
            
                {/* Conditional rendering based on auth method */}
        {authMethod === 'password' ? (
        <input
          type="password"
          placeholder="Password"
          value={userInfo.password}
             className=" text-gray-900 text-sm  block w-full p-2.5"
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
        />
      ) : (
        <input
          type="number"
          placeholder="OTP"
          value={otp}
             className=" text-gray-900 text-sm  block w-full p-2.5"
          onChange={(e) => setOtp(e.target.valueAsNumber)}
        />
      )}

            <LabelledInput
              type="password"
              label="Enter Password"
              placeholder="Password"
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }

            />
            <button
              className="w-full bg-gradient-to-r from-sky-500 to-blue-300 text-white py-2 px-4 rounded-full mt-1 hover:bg-blue-600"
              type="button"
              onClick={sendRequest}
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
