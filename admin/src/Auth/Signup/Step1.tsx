export const StepOne = ({ nextStep, userInfo, setUserInfo }) => (
    <div>
      <h2>Step 1</h2>
      <div className="flex  flex-col justify-start gap-2 items-center mb-4">
        <h3>Enter Phone Number</h3>
        <div className="flex flex-row">
          <p className="p-2 border rounded-lg">+91</p>
          <input
            type="number"
            className="px-4 py-2 w-full rounded-lg border text-base bg-white text-gray-400"
            value={userInfo?.phone.toString()}
            placeholder="Phone"
            onChange={(e) =>
              setUserInfo({
                ...userInfo,
                phone: e.target.value ? parseInt(e.target.value, 10) : 0,
              })
            }
          />
        </div>
        {/* email */}
        <div className="">
          <label>Enter Email ID</label>
          <input
            type="email"
            value={userInfo.email}
            placeholder="Email"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </div>
        {/* password */}
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={userInfo.password}
            placeholder="Password"
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
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