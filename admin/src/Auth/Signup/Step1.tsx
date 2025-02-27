import React, { useState } from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
export const StepOne = ({ nextStep, userInfo, setUserInfo }: any) => {
  const [loading, setLoading] = useState(false); // Add loading state
  const [password, setPassword] = useState(false);
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;

    // Only allow numeric input and restrict to max 10 digits
    if (/^\d{0,10}$/.test(inputVal)) {
      setUserInfo({
        ...userInfo,
        phone: inputVal ? parseInt(inputVal, 10) : "",
      });
    }
  };

  const handleNextClick = () => {
    const phone = userInfo?.phone?.toString() || "";
    const email = userInfo?.email || "";

    // Email regex to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (phone.length === 0) {
      toast.error("Add phone no.");
      return;
    } else if (phone.length !== 10) {
      toast.error("Invalid phone number. It must be 10 digits.");
      return;
    }

    if (email.length === 0) {
      toast.error("Add email ID.");
      return;
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email format. Please enter a valid email address.");
      return;
    }

    setLoading(true);
    nextStep();
  };

  return (
    <div>
      {/* Left-Side Overlay */}

      <h2>Step 1</h2>
      <div className="flex flex-col justify-start gap-2 mb-4">
        <h3 className="font-bold">Enter Phone Number</h3>
        <div className="flex justify-start border border-black rounded-xl bg-[#e8f0fe]">
          <label className="w-24  py-2 text-black h-[50px] justify-center items-center text-center border-r border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
            <span className="text-2xl">🇮🇳</span>
          </label>
          <input
            required
            type="number"
            className="focus:ring-0 focus:ring-offset-0 bg-[#e8f0fe] focus:outline-0 focus:outline-offset-0"
            value={userInfo?.phone.toString()}
            id="adminPhoneNumber"
            placeholder="Phone"
            onChange={handlePhoneChange}
            style={{ border: "none", justifyContent: "center" }}
          />
        </div>

        {/* Email */}
        <div>
          <label className="font-bold">Enter Email ID</label>
          <input
            required
            type="email"
            value={userInfo.email}
            id="AdminEmail"
            placeholder="Email"
                 className="text-gray-900 bg-[#e8f0fe]  h-[50px] rounded-xl border-black text-sm block w-full p-2.5 pr-10"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="font-bold">Enter Password</label>
          <div className="relative">
            <input
              required
              type={password ? "text" : "password"}
              value={userInfo.password}
              placeholder="Password"
              id="adminPassword"
              className="text-gray-900 bg-[#e8f0fe]  h-[50px] rounded-xl border-black text-sm block w-full p-2.5 pr-10"
              
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
            <p
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
              onClick={() => setPassword(!password)}
            >
              {password ? (
                 <IoEyeOutline size={20} />
            
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </p>
          </div>
        </div>
      </div>

      <button
        className="bottom-10 h-[50px]  center mt-1 bg-gradient-to-r
         from-sky-500 to-sky-300 text-white py-2 px-36 rounded-xl"
        onClick={handleNextClick}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-3">
            Sending OTP
          </span>
        ) : (
          
          "Next"
        )}
      </button>
    </div>
  );
};
