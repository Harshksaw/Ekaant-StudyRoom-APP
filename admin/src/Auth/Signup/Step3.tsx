export const StepThree = ({
  nextStep,
  prevStep,
  userDetails,
  setUserDetails,
}) => (
  //images  - Register 3
  <div className="flex  flex-1 overflow-y-auto px-10 py-6 bg-white rounded-lg">
    {/* Form fields for step 2 */}

    <div className=" flex-col w-full  mb-100 gap-25 ">
      <div className="flex-col items-center justify-start">
        <label
          htmlFor="fullName"
          className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
        >
          Full Name
        </label>
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="fullName"
          value={userDetails.fullName}
          onChange={(e) =>
            setUserDetails({ ...userDetails, fullName: e.target.value })
          }
          placeholder="Full Name"

        />
      </div>
      {/* DOB */}
      <div className="flex-col items-center justify-start">
        <label
          htmlFor="dob"
          className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
        >
          DOB
        </label>
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="dob"
          value={userDetails.dob}
          onChange={(e) =>
            setUserDetails({ ...userDetails, dob: e.target.value })
          }
          placeholder="DOB"

        />
      </div>
      {/* Aadhar Card */}

      <div className="flex-col items-center justify-start">
        <label
          htmlFor="aadharCard"
          className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
        >
          Aadhar Card
        </label>
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="aadharCard"
          value={userDetails.aadharCard}
          onChange={(e) =>
            setUserDetails({ ...userDetails, aadharCard: e.target.value })
          }
          placeholder="Aadhar Card"

        />
      </div>
      {/* Upload Aadhar */}

      <div className="flex justify-start   border-black items-center ">
        <label
          htmlFor="uploadPanCard"
          className="w-60 h-[50px] text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight border border-2"
        >
          Addhar Card
        </label>

        <label htmlFor="uploadAadharCard" className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
        text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
          Select File 
          <input
            type="file"
            id="uploadAadharCard"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                setUserDetails({
                  ...userDetails,
                  uploadAadharCard: file,
                });
              }
            }}
            style={{ display: 'none' , justifyContent:'center' }} // Hide the actual input
          />
        </label>
      </div>

      <div className="flex-col items-center justify-start">
        <label
          htmlFor="PanCard"
          className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
        >
          PAN Card
        </label>
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="PanCard"
          value={userDetails.aadharCard}
          onChange={(e) =>
            setUserDetails({ ...userDetails, aadharCard: e.target.value })
          }
          placeholder="Aadhar Card"

        />
      </div>

      <div className="flex flex-row   items-center justify-start">
      <label
          htmlFor="uploadPanCard"
          className="w-60 h-[50px] text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight border border-2"
        >
          Upload Pan Card
        </label>

      
        <label htmlFor="uploadAadharCard" className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
        text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
          Select File 
          <input
            type="file"
            id="uploadAadharCard"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              if (file) {
                setUserDetails({
                  ...userDetails,
                  uploadAadharCard: file,
                });
              }
            }}
            style={{ display: 'none' , justifyContent:'center' }} // Hide the actual input
          />
        </label>
      </div>

      {/* addresses */}

      <div className="flex flex-col gap-6 ">
        <label className="text-xl">Address</label>
        {/* line 1 */}
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"

          value={userDetails.address.line1}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address: {
                ...userDetails.address,
                line1: e.target.value,
              },
            });
          }}
          placeholder="Address Line 1"
        />
        {/* line 2 */}
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={userDetails.address.line2}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address: {
                ...userDetails.address,
                line2: e.target.value,
              },
            });
          }}
          placeholder="Address Line 2"
        />

        {/* city */}
        <input className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={userDetails.address.city}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address: {
                ...userDetails.address,
                city: e.target.value,
              },
            });
          }}
          placeholder="City"
        />
        {/* pinCode */}
        <input 
        className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500" className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={userDetails.address.pincode}
          onChange={(e) => {
            setUserDetails({
              ...userDetails,
              address: {
                ...userDetails.address,
                pincode: e.target.value,
              },
            });
          }}
          placeholder="pincode"
        />
      </div>
      <div className="flex flex-row gap-40   -col items-center justify-between">
        <button
          className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-full"
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
  </div>
);
