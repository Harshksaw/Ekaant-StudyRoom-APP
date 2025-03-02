import OtpInput from "react-otp-input";

import { FaCheck } from "react-icons/fa6";
export const StepTwo = ({
  nextStep,
  prevStep,
  userOTP,
  userEmailOTP,
  setOtpInputs,
  setOtpEmailInputs,
  verified,
}: any) => (
  <div>
    {/* Phone OTP Section */}
    <div className="w-full max-w-sm mb-6">
      <label
        htmlFor="phoneOTP"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Enter Phone OTP
      </label>
      <div className="flex items-center gap-4">
        <OtpInput
          value={userOTP}
          numInputs={4}
          onChange={setOtpInputs}
          inputType="number"
          placeholder="0000"
          
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "10px",
          }}
          renderInput={(props) => (
            <input
            disabled={verified.one} 
              {...props}
              id="phoneOTP"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
        />

        {verified.one && (
          <FaCheck className="text-green-500 text-2xl font-bold" />
        )}
      </div>
    </div>

    {/* Email OTP Section */}
    <div className="w-full max-w-sm mb-8">
      <label
        htmlFor="emailOTP"
        className="block text-sm font-semibold text-gray-700 mb-2 b"
      >
        Enter Email OTP
      </label>
      <div className="flex items-center gap-4">
        <OtpInput
          value={userEmailOTP}
          numInputs={4}
          onChange={setOtpEmailInputs}
          inputType="number"
          placeholder="0000"
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            padding: "10px",
          }}
          renderInput={(props) => (
            <input
              {...props}
              disabled={verified.two} 
              id="emailOTP"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
        />

        {verified.two && (
          <FaCheck className="text-green-500 text-2xl font-bold" />
        )}
      </div>
    </div>

    <div className="flex flex-row gap-40  absolute bottom-10 right-6  items-center justify-between">
      <button
        className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-6 rounded-full"
        onClick={prevStep}
      >
        Back
      </button>

      {verified.one && verified.two && (
        <button
          className=" center  mt-1 bg-gradient-to-r from-sky-600 to-sky-300 text-white py-2 px-20 rounded-full"
          onClick={nextStep}
        >
          Next
        </button>
      )}
    </div>
  </div>
);
