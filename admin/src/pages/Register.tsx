import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
const Register = () => {
  const [verified, setVerified] = useState(false);
  const [otp, setOtp] = useState(0);
  const [showOtp, setShowOtp] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: 0,
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

  console.log(typeof userInfo.phone, " ========================");
  // signup--
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          username: userInfo.name,
          email: userInfo.email,
          phoneNumber: parseInt(userInfo?.phone),
          password: userInfo.password,
          accountType: "Admin",
        }
      );
      if (response.data.success) {
        console.log("signup success");
        const token = response.data.token;
        sessionStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex justify-center w-full h-screen items-center">
      <div className="flex gap-8 flex-col  w-full rounded-xl  bg-white shadow-md border max-w-sm p-8">
        {/* header */}
        <div className="space-y-6">
          <h1 className="max-w-xs text-3xl text-center font-semibold">
            Create an {""} Account
          </h1>
          {/*TODO- image add */}
        </div>
        {/* Input container */}
        <div className="space-y-4 ">
          {/* name-- */}
          <div className="">
            <input
              className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
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
              className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
              placeholder="Enter your email"
            />
          </div>
          {/* phone */}
          <div className=" flex flex-col justify-center gap-6 ">
            <div className="flex justify-start gap-2 items-center">
              <p className="p-2 border rounded-[8px]">+91</p>
              <input
                type="number"
                className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
                value={userInfo?.phone.toString()} // Convert phone number to string for the value prop
                placeholder="phone"
                onChange={
                  (e) =>
                    setUserInfo({
                      ...userInfo,
                      phone: e.target.value || 0,
                    }) // Convert input value to number; use 0 as fallback
                }
              />
              <Send
                onClick={() => sendOtp()}
                className="border rounded-[8px] p-3 h-10 w-12"
              />
            </div>
            {showOtp && userInfo.phone >= 1000000 && (
              <div className="flex justify-between items-center gap-2 ">
                <input
                  className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
                  type="tel"
                  value={otp} // Uncomment to use
                  placeholder="Otp"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="  border rounded-[8px]  p-2 bg-transparent m"
                  onClick={verifyOtp}
                >
                  Verify
                </button>
              </div>
            )}
            {/* password */}
            <div className="">
              <input
                className="px-4 py-2 w-full rounded-[8px] border text-base bg-white text-gray-400"
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
              <button
                className="py-4 px-16 rounded-lg mx-4 mb-25 w-full  "
                onClick={() => navigate("/login")}
              >
                Already have an account?
                <span className="text-center text-base mr-6 font-bold text-slate-300 underline">
                  signup
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
