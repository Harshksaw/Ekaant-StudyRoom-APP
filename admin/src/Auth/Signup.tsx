import { Link } from "react-router-dom";

import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import { useEffect, useState } from "react";
import { platform } from "os";
import { PiPlaceholder } from "react-icons/pi";
import { Upload } from "lucide-react";
import { StepTwo } from "./Signup/Step2";
import { StepThree } from "./Signup/Step3";
import { StepFour } from "./Signup/Step4";
import { StepOne } from "./Signup/Step1";
import { StepFive } from "./Signup/Step5";

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

  const [userOTP, setOtpInputs] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  const verifyOTP = () => {
    const { otp1, otp2, otp3, otp4 } = userOTP;
    // Assuming verifyUserOTP is the function you want to call
    verifyUserOTP(otp1 + otp2 + otp3 + otp4);
  };

  // Handle OTP input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const updatedOtpInputs = {
      ...userOTP,
      [name]: value,
    };
    setOtpInputs(updatedOtpInputs);

    // Check if all inputs are filled after the state update
    const allFilled = Object.values(updatedOtpInputs).every(
      (input) => input.trim() !== ""
    );
    if (allFilled) {
      console.log("All inputs are filled phone otp");
      // verifyOTP(); // Call verifyOTP function if all inputs are filled
    }
  };

  const [emailOtpInputs, setEmailOtpInputs] = useState({
    emailOtp1: "",
    emailOtp2: "",
    emailOtp3: "",
    emailOtp4: "",
  });

  const handleEmailOtpInputChange = (e) => {
    const { name, value } = e.target;
    const updatedEmailOtpInputs = {
      ...emailOtpInputs,
      [name]: value,
    };
    setEmailOtpInputs(updatedEmailOtpInputs);

    // Check if all email OTP inputs are filled after the state update
    const allFilled = Object.values(updatedEmailOtpInputs).every(
      (input) => input.trim() !== ""
    );
    if (allFilled) {
      console.log("All inputs are filled email otp");
      // verifyEmailOTP(); // Call verifyEmailOTP function if all inputs are filled
    }
  };

  // Function to call after all OTP inputs are filled

  // Check if all OTP inputs are filled

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
    halls: 0,
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
    console.log(libraryDetails);
  }, [userInfo, userOTP, libraryDetails, userDetails]);

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
            userOTP={userOTP}
            userEmailOTP={emailOtpInputs}
            handleInputChange={handleInputChange}
            handleEmailInputChange={handleEmailOtpInputChange}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

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
        return (
          <StepFive
            nextStep={nextStep}
            prevStep={prevStep}
            libraryDetails={libraryDetails}
            setLibraryDetails={setLibraryDetails}
          />
        );
      default:
        return <h2>Final Step</h2>;
    }
  };

  return (
    <div className="flex h-screen w-screen ">
      {/* pic  */}
      <div className="flex flex-col   items-center justify-center bg-gradient-to-r from-sky-400 to-sky-700 w-[50%]">
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

      <div className="flex flex-1 h-screen overflow-auto justify-start items-center flex-col border w-[60%] p-5 ">
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
