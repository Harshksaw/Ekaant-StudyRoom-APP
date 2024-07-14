export const StepOne = ({ nextStep, userInfo, setUserInfo, sendOTP }) => (
  <div>
    <h2 className="">Step 1</h2>
    <div className="flex  flex-col justify-start gap-2  mb-4">
      <h3 className="font-bold">Enter Phone Number</h3>
      <div className="flex justify-start border border-black bg-white">
        <label
          className=" w-24  py-2  text-black  h-[50px] justify-center items-center
        text-center border border-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer "
        >
          <span className="text-3xl">🇮🇳</span>
        </label>
        <input
          type="number"
          // className="px-4 py-2 w-[410px] border-2 border-black  text-base bg-white text-gray-400"
          className="focus:ring-0 focus:ring-offset-0 focus:outline-0 focus:outline-offset-0 "
          value={userInfo?.phone.toString()}
          id="adminPhoneNumber"
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
      {/* email */}
      <div className="">
        <label className="font-bold">Enter Email ID</label>

        <input
          type="email"
          value={userInfo.email}
          id="AdminEmail"
          placeholder="Email"
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </div>
      {/* password */}
      <div>
        <label className="font-bold">Enter Password</label>
        <input
          type="password"
          value={userInfo.password}
          placeholder="Password"
          id="adminPassword"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
            console.log(userInfo);
          }}
        />
      </div>
    </div>

    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);
