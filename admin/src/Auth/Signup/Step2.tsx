export const StepTwo = ({
  nextStep,
  prevStep,
  userOTP,
  userEmailOTP,
  handleInputChange,
  handleEmailInputChange,
}) => (
  <div>
    <div>
      <label>Enter Phone's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="w-16 h-16 mr-1 mt-2">
            <input
              type="number"
              name={`otp${index}`}
              className="w-full h-full text-center outline-none border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              maxLength={1}
              value={userOTP[`otp${index}`]}
              onChange={handleInputChange}
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Email OTP */}
    <div className="mt-2">
      <label>Enter Email's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="w-16 h-16 mr-1 mt-2">
            <input
              type="number"
              name={`emailOtp${index}`}
              className="w-full h-full text-center outline-none rounded-xl  border border-gray-200 bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              maxLength={1}
              value={userEmailOTP[`emailOtp${index}`]}
              onChange={handleEmailInputChange}
              placeholder="0"
            />
          </div>
        ))}
      </div>
    </div>

    <div className="flex flex-row gap-40  absolute bottom-10 right-6  items-center justify-between">
      <button
        className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-6 rounded-full"
        onClick={prevStep}
      >
        Back
      </button>
      <button
        className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
        onClick={nextStep}
      >
        Next
      </button>
    </div>
  </div>
);
