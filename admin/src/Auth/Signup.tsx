import { Link } from "react-router-dom";

import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import { useEffect, useState } from "react";
import { platform } from "os";
import { PiPlaceholder } from "react-icons/pi";
import { Upload } from "lucide-react";

const StepOne = ({ nextStep, userInfo, setUserInfo }) => (
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

const StepTwo = ({ nextStep, prevStep, userOTP, setUserOTP }) => (
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}
    {/* phone otp- */}
    <div>
      <label>Enter Phone's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.phoneOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, phoneOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.phoneOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, phoneOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.phoneOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, phoneOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.phoneOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, phoneOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
      </div>
    </div>

    {/* email otp- */}
    <div>
      <label>Enter Email's OTP</label>
      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.emailOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, emailOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.emailOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, emailOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.emailOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, emailOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
        <div className="w-16 h-16 ">
          <input
            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
            type="text"
            name=""
            id=""
            value={userOTP.emailOTP}
            onChange={(e) =>
              setUserOTP({ ...userOTP, emailOTP: e.target.value })
            }
            placeholder="0"
          />
        </div>
      </div>
    </div>

    <button onClick={prevStep}>Back</button>
    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);
const StepThree = ({ nextStep, prevStep, userDetails, setUserDetails }) => (
  //images  - Register 3
  <div>
    <h2>Step 3</h2>
    {/* Form fields for step 2 */}

    <div>
      {/* full Name */}
      <label>Full Name</label>
      <input
        type="text"
        value={userDetails.fullName}
        onChange={(e) => {
          setUserDetails({ ...userDetails, fullName: e.target.value });
        }}
        placeholder="Full Name"
      />
      {/* {dob} */}
      <label htmlFor="">DOB</label>
      <input
        type="text"
        value={userDetails.dob}
        onChange={(e) => {
          setUserDetails({ ...userDetails, dob: e.target.value });
        }}
        placeholder="dob"
      />
      {/* {aadhar card} */}
      <label htmlFor="">Aadhar Card</label>
      <input
        type="text"
        value={userDetails.aadharCard}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setUserDetails({
            ...userDetails,
            aadharCard: e.target.value,
          });
        }}
        placeholder="Aadhar Card"
      />
      {/* upload aadhar */}
      <div className="">
        <input
          type="file"
          value={userDetails.uploadAadharCard}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              setUserDetails({
                ...userDetails,
                uploadAadharCard: file,
              });
            }
          }}
          placeholder="file"
        />
        <h1>selectFile</h1>
      </div>
      {/* {pan card} */}
      <label htmlFor="">Pan Card</label>
      <input
        type="text"
        value={userDetails.panCard}
        onChange={(e) => {
          setUserDetails({ ...userDetails, panCard: e.target.value });
        }}
        placeholder="Pan Card"
      />
      {/* upload Pan Card*/}
      <div className="">
        <input
          type="file"
          value={userDetails.uploadPanCard}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (file) {
              setUserDetails({
                ...userDetails,
                uploadPanCard: file,
              });
            }
          }}
          placeholder="file"
        />
        <h1>selectFile</h1>
      </div>
      {/* addresses */}
      <label>Address</label>
      {/* line 1 */}
      <input
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
      <input
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
      <input
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

    <button onClick={prevStep}>Back</button>
    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);
const StepFour = ({
  nextStep,
  prevStep,
  libraryDetails,
  setLibraryDetails,
}) => (
  //images  - Register 4
  <div>
    <h2>Step 4</h2>
    {/* Form fields for step 2 */}

    <div>
      {/* librray name */}
      <label>Library Name</label>
      <input
        type="text"
        placeholder="Library Name"
        value={libraryDetails.libraryName}
        onChange={(e) => {
          setLibraryDetails({ ...libraryDetails, libraryName: e.target.value });
        }}
      />
      {/* App name */}
      <label>App</label>
      {/* short des */}
      <input
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
      {/* long des  */}
      <input
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
      {/* library address */}
      <label>Library Address</label>
      {/* line 1 */}
      <input
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
      {/* line 2 */}
      <input
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
      {/* city */}
      <input
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
      {/* state */}
      <input
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
      {/* pinCode */}
      <input
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
      {/* legal */}
      <label>Legal</label>
      {/* registration */}
      <input
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
      {/* gst */}
      <div>
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
      {/* upload gst */}
      <div>
        <input
          type="file"
          placeholder="gst certificate"
          value={libraryDetails.libraryLegal.uploadGst}
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
        <h1>select files</h1>
      </div>
      {/* cin */}
      <div>
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
      <div className="">
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
        />
      </div>
      {/* upload cin */}
      <div>
        <input
          type="file"
          placeholder="gst certificate"
          value={libraryDetails.libraryLegal.uploadGst}
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
        <h1>select files</h1>
      </div>
      {/* tan */}
      <div>
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
            name="cin"
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
      {/* upload tan */}
      <div>
        <input
          type="file"
          placeholder="gst certificate"
          value={libraryDetails.libraryLegal.uploadGst}
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
        <h1>select files</h1>
      </div>
      {/* tan */}
      <div>
        <label>Misme</label>
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
            name="cin"
            value="false"
            checked={libraryDetails.libraryLegal.tan === false}
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
      {/* upload misme */}
      <div>
        <input
          type="file"
          placeholder="misce certificate"
          value={libraryDetails.libraryLegal.uploadGst}
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
        <h1>select files</h1>
      </div>
      {/* library details */}
      <label>Library Details</label>
    </div>

    <button onClick={prevStep}>Back</button>
    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);
const StepFive = ({ nextStep, prevStep }) => (
  //images  - Register 5
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}

    <div></div>

    <button onClick={prevStep}>Back</button>
    <button
      className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
      onClick={nextStep}
    >
      Next
    </button>
  </div>
);

// Add similar components for StepThree, StepFour, and StepFive

const FinalStep = ({ prevStep }) => (
  <div>
    <h2>Final Step</h2>
    {/* Summary or confirmation */}
    <button onClick={prevStep}>Back</button>
    <button onClick={() => alert("Form Submitted")}>Submit</button>
  </div>
);

function Signup() {
  //parent compoenent

  const [userInfo, setUserInfo] = useState({
    phone: 0,
    email: "",
    password: "",
  });
  const [userOTP, setUserOTP] = useState({
    phoneOTP: 0,
    emailOTP: "",
  });
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    dob: "",
    aadharCard: "",
    uploadAadharCard: [],
    panCard: "",
    uploadPanCard: [],
    address: {
      line1: "",
      line2: "",
      city: "",
      pincode: "",
    },
  });

  const [libraryDetails, setLibraryDetails] = useState({
    libraryName: "",
    libraryApp: {
      shortDescription: "",
      longDescription: "",
    },
    libraryAddress: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      pincode: "",
    },
    libraryLegal: {
      registration: "",
      gst: null,
      uploadGst: null,
      cin: "",
      uploadCin: null,
      tan: null,
      uploadTan: null,
      misme: null,
      uploadMisme: null,
    },
    librayDetails: {
      images: [],
      uploadImages: null,
    },
    librarySliders: {
      sliders: [],
      uploadSliders: null,
    },
    halls: "",
    amentities: {
      coldWater: false,
      wifi: false,
      ac: false,
      locker: false,
      separateWashroom: false,
      News: false,
      discussionArea: false,
      LunchArea: false,
      MovingChair: false,
      FloorMat: false,
      SeparateParking: false,
      CommonParking: false,
    },
  });

  useEffect(() => {
    console.log(userInfo);
    console.log(userOTP);
  }, [userInfo, userOTP]);

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      case 2:
        return (
          <StepTwo
            nextStep={nextStep}
            userOTP={userOTP}
            setUserOTP={setUserOTP}
            prevStep={prevStep}
          />
        );
      // Add cases for additional steps
      case 3:
        return (
          <StepThree
            nextStep={nextStep}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <StepFour
            nextStep={nextStep}
            libraryDetails={libraryDetails}
            setLibraryDetails={setLibraryDetails}
            prevStep={prevStep}
          />
        ); //library ->
      case 5:
        return <StepFive nextStep={nextStep} prevStep={prevStep} />;
      default:
        return <h2>Final Step</h2>;
    }
  };

  return (
    <div className="flex  flex-1 h-screen    flex-1  w-screen ">
      {/* pic  */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-sky-400 to-sky-700 w-[40%]">
        <div className="flex justify-center items-center gap-10">
          <img src={studyMain} alt="pic" width={100} height={100} />
          <p className=" h-30 font-semibold text-7xl text-white">EKAANT</p>
        </div>

        <div className="flex justify-center items-center">
          <img src={reading} alt="pic" width={400} height={400} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-3xl">
            Welcome to Ekaant Admin Panel
          </p>
          <p className="font-normal text-base">
            Lorem ipsum dolor sit amet, conscs <br /> ectetur adipiscing elit
            velit.
          </p>
        </div>
      </div>

      <div className="flex flex-1  flex-start justify-start items-center flex-col border w-[60%] p-5 ">
        <div className="self-end mb-5">
          <Link
            to="/signin"
            className="absolute top-10 right-10 mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-8 rounded-full"
          >
            Login
          </Link>
        </div>

        <h1 className="text-5xl font-bold mb-2 mt-32">Register</h1>

        <div className="w-full  bg-blue-100 flex flex-1  justify-center items-center">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Signup;