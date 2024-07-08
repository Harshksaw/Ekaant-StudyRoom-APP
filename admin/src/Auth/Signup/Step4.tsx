import { InfoIcon } from "lucide-react";

export const StepFour = ({
  nextStep,
  prevStep,
  libraryDetails,
  setLibraryDetails,
}: any) => (
  //images  - Register 4
  <div className="flex  flex-1 flex-col  overflow-y-auto px-10 py-6 bg-white rounded-lg">
    {/* Form fields for step 2 */}

    <div className=" flex-col w-full  mb-100 gap-20">
      {/* Library name */}
      <label>Library Name</label>
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
        placeholder="Library Name"
        value={libraryDetails.libraryName}
        onChange={(e) => {
          setLibraryDetails({ ...libraryDetails, libraryName: e.target.value });
        }}
      />
      {/* App name */}
      <label>App</label>
      {/* Short description */}
      <div className="relative bg-blue-500">
        <input
          className="w-full pl-3 py-2 pr-40  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
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
            <span className="absolute bg-blue-400 w-40 h-12  -top-8 text-white rounded-xl  p-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-7 duration-700 text-xs">
              Information from thids buicdiocd
            </span>
          </div>
        </section>
      </div>
      {/* Long description */}
      <div className="relative bg-blue-500">
        <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
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
      <label>Library Address</label>
      {/* Line 1 */}
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
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
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
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
      {/* State */}
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
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
      {/* Pincode */}
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
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
      {/* Legal */}
      <label>Legal</label>
      {/* Registration */}
      <input
        className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        type="text"
        placeholder="Registration"
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
          <input
            type="radio"
            name="gst"
            value="true"
            checked={libraryDetails.libraryLegal.gst === true}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryLegal: {
                  ...libraryDetails.libraryLegal,
                  gst: e.target.value === "true",
                },
              });
            }}
          />
          <label>Yes</label>
        </div>
        <div>
          <input
            type="radio"
            name="gst"
            value="false"
            checked={libraryDetails.libraryLegal.gst === false}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryLegal: {
                  ...libraryDetails.libraryLegal,
                  gst: e.target.value === "false",
                },
              });
            }}
          />
          <label>No</label>
        </div>
      </div>

      <div>
        <div>
          <input
            type="file"
            placeholder="GST certificate"
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
          />
          <h1>Select files</h1>
        </div>

        {/* CIN */}
        <div className="flex gap-5 mx-5 my-5">
          <label>CIN</label>
          <div>
            <input
              type="radio"
              name="cin"
              value="true"
              checked={libraryDetails.libraryLegal.cin === true}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    cin: e.target.value === "true",
                  },
                });
              }}
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="cin"
              value="false"
              checked={libraryDetails.libraryLegal.cin === false}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    cin: e.target.value === "false",
                  },
                });
              }}
            />
            <label>No</label>
          </div>
        </div>
        <input
          type="text"
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

        {/* Upload CIN */}
        <div>
          <input
            type="file"
            placeholder="CIN certificate"
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
          />
          <h1>Select files</h1>
        </div>

        {/* TAN */}
        <div className="flex gap-5 mx-5 my-5">
          <label>TAN</label>
          <div>
            <input
              type="radio"
              name="tan"
              value="true"
              checked={libraryDetails.libraryLegal.tan === true}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    tan: e.target.value === "true",
                  },
                });
              }}
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="tan"
              value="false"
              checked={libraryDetails.libraryLegal.tan === false}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    tan: e.target.value === "false",
                  },
                });
              }}
            />
            <label>No</label>
          </div>
        </div>

        {/* Upload TAN */}
        <div>
          <input
            type="file"
            placeholder="TAN certificate"
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
          />
          <h1>Select files</h1>
        </div>

        {/* Misme */}
        <div className="flex gap-5 mx-5 my-5">
          <label>Misme</label>
          <div>
            <input
              type="radio"
              name="misme"
              value="true"
              checked={libraryDetails.libraryLegal.misme === true}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    misme: e.target.value === "true",
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
              checked={libraryDetails.libraryLegal.misme === false}
              onChange={(e) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryLegal: {
                    ...libraryDetails.libraryLegal,
                    misme: e.target.value === "false",
                  },
                });
              }}
            />
            <label>No</label>
          </div>
        </div>

        {/* Upload Misme */}
        <div>
          <input
            type="file"
            placeholder="Misme certificate"
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
          />
          <h1>Select files</h1>
        </div>
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
