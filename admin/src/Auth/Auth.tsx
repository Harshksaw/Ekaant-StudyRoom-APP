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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-red-500 flex-1  w-screen ">
      {/* pic  */}
      <div className="flex justify-center bg-blue-400 flex-col w-1/2">
        <div className="flex ">
          <img src={studyMain} alt="pic" width={158} height={138} />
          <p className="w-[548px] h-40 font-semibold text-9xl text-white">
            EKAANT
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={reading} alt="pic" width={411} height={411} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-3xl">
            Lorem Ipsum <br />
            Lore Gispum sipsu
          </p>
          <p className="font-normal text-base">
            Lorem ipsum dolor sit amet, conscs <br /> ectetur adipiscing elit
            velit.
          </p>
        </div>
      </div>
      {/* main inputs  */}
      <div className="flex justify-center flex-col border w-1/2 ">
        {/* button on top */}
        <div className="border bg-blue-400 self-center absolute right-5 top-5">
          {type === "signup" ? (
            <Link to="/signin">LOGIN</Link>
          ) : (
            <Link to="/signup">REGISTER</Link>
          )}
        </div>
        <div className="block"></div>
        <div className="flex justify-center">
          <div>
            <div className="px-5">
              <h1 className="text-5xl font-bold">
                {type === "signin" ? "Login" : "Register"}
              </h1>
              <h6 className="text-base font-normal">Hello!Lets get Started</h6>
              <div className="pt-1">
                {type === "signup" ? (
                  <LabelledInput
                    label="Enter Name"
                    placeholder="Name"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, name: e.target.value })
                    }
                  />
                ) : (
                  ""
                )}
                {type === "signup" ? (
                  <div className="flex justify-start gap-2 items-center">
                    <p className="p-2 border rounded-[8px]">+91</p>
                    <input
                      type="number"
                      className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
                      value={userInfo?.phone.toString()} // Convert phone number to string for the value prop
                      placeholder="phone"
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          phone: e.target.value
                            ? parseInt(e.target.value, 10)
                            : 0, // Convert input value to number; use 0 as fallback
                        })
                      }
                    />
                    <Send
                      onClick={() => sendOtp()}
                      className="border rounded-[8px] p-3 h-10 w-12"
                    />
                  </div>
                ) : (
                  " "
                )}
                {showOtp && userInfo.phone >= 1000000 && (
                  <div className="flex justify-between items-center gap-2 ">
                    <input
                      className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
                      type="number"
                      value={otp} // Uncomment to use
                      placeholder="Otp"
                      onChange={(e) => setOtp(e.target.valueAsNumber)}
                    />
                    <button
                      className="  border rounded-[8px]  p-2 bg-transparent m"
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
                <LabelledInput
                  type="password"
                  label="Enter Password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <button className="pt-1 " type="button" onClick={sendRequest}>
                  {" "}
                  {type === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
