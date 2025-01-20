import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

export const StepOne = ({ nextStep, userInfo, setUserInfo }: any) => {
  const [loading, setLoading] = useState(false); // Add loading state
 
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
     
    if(phone.length == 0){
      toast.error("Add phone no.");
      return;
    }
    else if (phone.length !== 10) {
      toast.error("Invalid phone number. It must be 10 digits.");
      return;
    }

    // Set loading to true while sending OTP
    setLoading(true);

    // Proceed to the next step if phone number is valid
    nextStep();
  };

  return (
    <div>
      {/* Left-Side Overlay */}
      {loading && (
        <div className="fixed top-0 right-0 w-1/2 h-full bg-gray-500 opacity-50 z-50 flex justify-center items-center">
          <div className="relative block max-w-sm p-6 ">
    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" className="w-8 h-8 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
        </div>
      )}

      <h2>Step 1</h2>
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
        <div>
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
