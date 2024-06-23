import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [required, setRequired] = useState(false);

  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      return "Password should be at least 8 characters";
    }
    // Add more checks as needed
    // For example, check if password contains at least one number
    if (!/\d/.test(password)) {
      return "Password should contain at least one number";
    }

    // If all checks pass, return null
    return null;
  };

  // send otp
  const sendOtp = async () => {
    try {
      // send otp
      console.log(userInfo.phone);
      setShowOtp(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/otp",
        {
          phoneNumber: userInfo.phone,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // verfiy otp
  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auth/verifyOtp`,
        {
          otp: otp,
        }
      );
      if (response.data.success) {
        setVerified(true);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // signup--
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          password: userInfo.password,
          accountType: "user",
        }
      );
      if (response.data.success) {
        console.log("signup success");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center flex-col items-start ml-40">
      {/* header */}
      <div className="w-3/5 h-[300px]  justify-center items-center  mt-12">
        <h1 className="max-w-xs text-center text-3xl ml-[40px] mt-[100px]">
          Create an {""} Account
        </h1>
        {/*TODO- image add */}
      </div>
      {/* Input container */}
      <div className="mx-4 space-y-7.5">
        {/* name-- */}
        <div className="">
          <input
            className="h-14 mx-4 rounded-md  text-base bg-white text-gray-400"
            value={userInfo.name}
            onChange={(e) => {
              setUserInfo({ ...userInfo, name: e.target.value });
            }}
            placeholder="Enter your name"
          />
        </div>
        {/* email */}
        <div className="">
          <input
            className="h-14 mx-4 rounded-md  text-base bg-white text-gray-400"
            value={userInfo.email}
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
            placeholder="Enter your email"
          />
        </div>
        {/* phone */}
        <div className="flex-col justify-center gap-2">
          <div className="flex justify-start items-center">
            <p>+91</p>
            <input
              className=""
              value={userInfo.phone.toString()} // Convert phone number to string for the value prop
              placeholder="phone"
              onChange={
                (e) =>
                  setUserInfo({
                    ...userInfo,
                    phone: parseInt(e.target.value, 10) || 0,
                  }) // Convert input value to number; use 0 as fallback
              }
            />
            <button onClick={() => sendOtp}>sendOtp</button>
          </div>
          {showOtp && userInfo.phone >= 1000000 && (
            <div className="flex justify-between items-center  ">
              <input
                className="pl-2.5"
                type="tel"
                value={otp} // Uncomment to use
                placeholder="Otp"
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="  border-none bg-transparent m"
                onClick={verifyOtp}
              >
                Verify
              </button>
            </div>
          )}
          {/* password */}
          <div className="">
            <input
              className="h-14 mx-4 rounded-md pl-9 text-base bg-white text-gray-400"
              value={userInfo.password}
              placeholder="password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
          </div>
          {/*  */}
          <div className="flex flex-col justify-center">
            <button
              className="py-5 px-20 rounded-lg mx-4 mt-4"
              onClick={() => handleSignUp()}
            >
              <span className="text-center text-lg font-bold">Sign Up</span>
            </button>

            <button
              className="py-4 px-16 rounded-lg mx-4 mb-25"
              onClick={() => navigate(-1)}
            >
              <span className="text-center text-lg font-bold">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
