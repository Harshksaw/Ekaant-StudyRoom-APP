import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StepOne = ({ nextStep, userInfo, setUserInfo }: any) => {
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

  // Handle the validation when the "Next" button is clicked
  const handleNextClick = () => {
    const phone = userInfo?.phone?.toString() || "";

    // Check if the phone number has exactly 10 digits
    if (phone.length !== 10) {
      toast.error("Invalid phone number. It must be 10 digits.");
      return;
    }

    // Proceed to the next step if phone number is valid
    nextStep();
  };

  return (
    <div>
      <h2 className="">Step 1</h2>
      <div className="flex flex-col justify-start gap-2 mb-4">
        <h3 className="font-bold">Enter Phone Number</h3>
        <div className="flex justify-start border border-black bg-white">
          <label
            className="w-24 py-2 text-black h-[50px] justify-center items-center text-center border-r border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            <span className="text-2xl">🇮🇳</span>
          </label>
          <input
            required
            type="number"
            className="focus:ring-0 focus:ring-offset-0 focus:outline-0 focus:outline-offset-0"
            value={userInfo?.phone.toString()}
            id="adminPhoneNumber"
            placeholder="Phone"
            onChange={handlePhoneChange}
            style={{ border: "none", justifyContent: "center" }}
          />
        </div>

        {/* Email */}
        <div className="">
          <label className="font-bold">Enter Email ID</label>
          <input
            required
            type="email"
            value={userInfo.email}
            id="AdminEmail"
            placeholder="Email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>

        {/* Password */}
        <div>
          <label className="font-bold">Enter Password</label>
          <input
            required
            type="password"
            value={userInfo.password}
            placeholder="Password"
            id="adminPassword"
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
        </div>
      </div>

      <button
        className="bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};
