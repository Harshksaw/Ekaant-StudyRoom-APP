import { InfoIcon } from "lucide-react";

export const StepFour = ({
  nextStep,
  prevStep,
  libraryDetails,
  setLibraryDetails,
}: any) => {
  console.log(libraryDetails.libraryLegal.showGst);
  return (
    //images  - Register 4

    <div className="flex  flex-1 flex-col  overflow-y-auto px-10 py-6 bg-white rounded-lg">
      {/* Form fields for step 2 */}

      <div className=" flex-col w-full  mb-100 gap-20">
        {/* Library name */}
        <label>Library Name</label>
        <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminLibraryName"
          placeholder="Library Name"
          value={libraryDetails.libraryName}
          onChange={(e) => {
            setLibraryDetails({
              ...libraryDetails,
              libraryName: e.target.value,
            });
          }}
        />
        {/* App name */}
        <label>App</label>
        {/* Short description */}
        <div className="relative ">
          <input
            className="w-full pl-3 py-2 pr-40  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppShortDescription"
            placeholder="shortDescription"
            value={libraryDetails.libraryApp.shortDescription}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryApp: {
                  ...libraryDetails.libraryApp,
                  shortDescription: e.target.value,
                },
              });
            }}
          />
          <section className="absolute right-2 top-1/4 flex justify-center items-center">
            <div className="group flex justify-center transition-all rounded-full bg-gray-200 p-1">
              <svg viewBox="0 0 320 512" className="w-4 h-4">
                <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
              </svg>
              <span className="absolute  w-40 h-12  -top-8 text-white rounded-xl  p-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-xs">
                Information from thids buicdiocd
              </span>
            </div>
          </section>
        </div>
        {/* Long description */}
        <div className="relative ">
          <input
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppLongDescription"
            placeholder="LongDescription"
            value={libraryDetails.libraryApp.LongDescription}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryApp: {
                  ...libraryDetails.libraryApp,
                  LongDescription: e.target.value,
                },
              });
            }}
          />
          <section className="absolute right-2 top-1/4 flex justify-center items-center">
            <div className="group flex justify-center transition-all rounded-full bg-gray-200 p-1">
              <svg viewBox="0 0 320 512" className="w-4 h-4">
                <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"></path>
              </svg>
              <span className="absolute bg-blue-400 w-40 h-12  -top-8 text-white rounded-xl  p-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-xs">
                Information from thids buicdiocd
              </span>
            </div>
          </section>
        </div>
        {/* Library address */}
        <label> Address</label>
        {/* Line 1 */}
        <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminLibraryAddressLine1"
          placeholder="Address Line 1"
          value={libraryDetails.libraryAddress.line1}
          onChange={(e) => {
            setLibraryDetails({
              ...libraryDetails,
              libraryAddress: {
                ...libraryDetails.libraryAddress,
                line1: e.target.value,
              },
            });
          }}
        />
        {/* Line 2 */}
        <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminLibraryAddressLine2"
          placeholder="Address Line 2"
          value={libraryDetails.libraryAddress.line2}
          onChange={(e) => {
            setLibraryDetails({
              ...libraryDetails,
              libraryAddress: {
                ...libraryDetails.libraryAddress,
                line2: e.target.value,
              },
            });
          }}
        />
        {/* City */}
        <div className="flex w-full justify-between gap-2">
          <div className="w-2/4">
            <input
              className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              id="adminLibraryAddressCity"
              placeholder="City"
              value={libraryDetails.libraryAddress.city}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryAddress: {
                    ...libraryDetails.libraryAddress,
                    city: e.target.value,
                  },
                });
              }}
            />
          </div>
          {/* State */}
          <div className="w-2/5">
            <input
              className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              id="adminLibraryAddressState"
              placeholder="State"
              value={libraryDetails.libraryAddress.state}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryAddress: {
                    ...libraryDetails.libraryAddress,
                    state: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        {/* Pincode */}
        <div className="w-1/3">
          <input
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminLibraryAddressPincode"
            placeholder="pincode"
            value={libraryDetails.libraryAddress.pincode}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryAddress: {
                  ...libraryDetails.libraryAddress,
                  pincode: e.target.value,
                },
              });
            }}
          />
        </div>
        {/* Legal */}
        <label>Legal</label>
        {/* Registration */}
        <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminLibraryLegalRegistration"
          placeholder="Registration Type"
          value={libraryDetails.libraryLegal.registration}
          onChange={(e) => {
            setLibraryDetails({
              ...libraryDetails,
              libraryLegal: {
                ...libraryDetails.libraryLegal,
                registration: e.target.value,
              },
            });
          }}
        />
        {/* GST */}
        <div className="flex gap-5 mx-5 my-5">
          <label>GST</label>
          <div>
            <label>
              <input
                type="radio"
                name="showGst"
                value="true"
                id="gst-true"
                // checked={true}
                //  TODO:DISCUSS WITH TEAM
                onChange={(e) => {
                  console.log(e.target.value);
                  // if (libraryDetails.libraryLegal.showGst === false) {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showGst: true,
                    },
                  });
                  console.log(libraryDetails.libraryLegal.showGst);
                  // }
                }}
              />
              Yes
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="showGst"
                value="false"
                id="gst-false"
                onChange={() => {
                  // handleLibraryLegalChange("showGst", false);

                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showGst: false,
                    },
                  });

                  console.log(libraryDetails.libraryLegal.showGst);
                }}
              />
              No
            </label>
          </div>
        </div>
        <div>
          {libraryDetails.libraryLegal.showGst && (
            <div className="">
              {/* gst input */}
              <div className="">
                <input
                  type="text"
                  placeholder="Gst Number"
                  id="adminLibraryLegalGst"
                  value={libraryDetails.libraryLegal.gst}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        gst: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              {/* UPLOAD GST  */}
              <div className="flex justify-start mt-1 border-black items-center">
                <label
                  htmlFor="uploadAadharCard"
                  className="w-60 h-[50px] text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  Upload Gst Certificate
                </label>

                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
        text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="GST certificate"
                    id="adminLegalUploadGst"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setLibraryDetails({
                          ...libraryDetails,
                          libraryLegal: {
                            ...libraryDetails.libraryLegal,
                            uploadGst: file,
                          },
                        });
                      }
                    }}
                    style={{ display: "none", justifyContent: "center" }} // Hide the actual input
                  />
                </label>
              </div>
            </div>
          )}

          {/* CIN */}
          <div className="flex gap-5 mx-5 my-5">
            <label>CIN</label>
            <div>
              <input
                type="radio"
                name="cin"
                value="true"
                id="cin-true"
                // checked={true}
                onChange={() => {
                  // handleLibraryLegalChange("cin", true);

                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showCin: true,
                    },
                  });
                  console.log(libraryDetails.libraryLegal.showCin);
                }}
              />
              <label>Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="cin"
                value="false"
                id="cin-false"
                // checked={libraryDetails.libraryLegal.showCin === false}
                onChange={() => {
                  // handleLibraryLegalChange("cin", false);

                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showCin: false,
                    },
                  });
                  console.log(libraryDetails.libraryLegal.showCin);
                }}
              />
              <label>No</label>
            </div>
          </div>
          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showCin && (
            <div>
              <div>
                {/* {cin oinput} */}

                <input
                  type="text"
                  id="adminLibraryLegalCin"
                  value={libraryDetails.libraryLegal.cin}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        cin: e.target.value,
                      },
                    });
                  }}
                  placeholder="CIN"
                  className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Upload CIN */}
              <div className="flex justify-start mt-1 border-black items-center">
                <label
                  htmlFor="uploadCinCard"
                  className="w-60 h-[50px] text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  CIN Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
              text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="CIN certificate"
                    id="adminLegalUploadCin"
                    // name="uploadCinCard"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setLibraryDetails({
                          ...libraryDetails,
                          libraryLegal: {
                            ...libraryDetails.libraryLegal,
                            uploadCin: file,
                          },
                        });
                      }
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAN */}
          <div className="flex gap-5 mx-5 my-5">
            <label>TAN</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="tan"
                  id="tan-true"
                  value={true}
                  // checked={true}
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showTan: true,
                      },
                    });
                  }}
                />
                Yes
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="tan"
                  value="false"
                  id="tan-false"
                  // checked={libraryDetails.libraryLegal.tan === false}
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showTan: false,
                      },
                    });
                  }}
                />
                No
              </label>
            </div>
          </div>
          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showTan && (
            <div>
              {/* TAN input */}
              <div className=" ">
                <input
                  type="text"
                  placeholder="Tan Number"
                  id="adminLibraryLegalTan"
                  value={libraryDetails.libraryLegal.tan}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        tan: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              {/* Upload TAN */}
              <div className="flex justify-start mt-1 border-black items-center">
                <label
                  htmlFor="uploadTAN"
                  className="w-60 h-[50px] text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  TAN Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
              text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="Tan certificate"
                    id="adminLegalUploadTan"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setLibraryDetails({
                          ...libraryDetails,
                          libraryLegal: {
                            ...libraryDetails.libraryLegal,
                            uploadTan: file,
                          },
                        });
                      }
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
            </div>
          )}
          {/* Misme */}
          <div className="flex gap-5 mx-5 my-5">
            <label>Misme</label>
            <div>
              <input
                type="radio"
                name="misme"
                value="true"
                id="misme-true"
                // checked={true}
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showMisme: true,
                    },
                  });
                }}
              />
              <label>Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="misme"
                value="false"
                id="misme-false"
                // checked={libraryDetails.libraryLegal.misme === false}
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showMisme: false,
                    },
                  });
                }}
              />
              <label>No</label>
            </div>
          </div>
          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showMisme && (
            <div>
              {/* Misme input */}
              <div className=" ">
                <input
                  type="text"
                  id="adminLibraryLegalMisme"
                  placeholder="Misme Number"
                  value={libraryDetails.libraryLegal.misme}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        misme: e.target.value,
                      },
                    });
                  }}
                />
              </div>

              {/* Upload Misme */}
              <div className="flex justify-start mt-1 border-black items-center">
                <label
                  htmlFor="uploadCinCard"
                  className="w-60 h-[50px] text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  Misme Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
        text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="Misme certificate"
                    id="adminLegalUploadMisme"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setLibraryDetails({
                          ...libraryDetails,
                          libraryLegal: {
                            ...libraryDetails.libraryLegal,
                            uploadMisme: file,
                          },
                        });
                      }
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-40  mt-20   items-center justify-between">
        <button
          className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-full"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-20 rounded-full"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </div>
  );
};
