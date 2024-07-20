import { Link, useNavigate, useNavigation } from "react-router-dom";

import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";

import { useEffect, useState } from "react";

import { StepTwo } from "./Signup/Step2";
import { StepThree } from "./Signup/Step3";
import { StepFour } from "./Signup/Step4";
import { StepOne } from "./Signup/Step1";
import { StepFive } from "./Signup/Step5";

import { BASEURL } from "@/lib/utils";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import Loader from "@/components/Loader";
// Add similar components for StepThree, StepFour, and StepFive

const FinalStep = ({ prevStep }) => {
  const navigate = useNavigate();
  return(
  
  <div>
    <h2>Final Step</h2>
    {/* Summary or confirmation */}
    <button onClick={()=> navigate("/signin", {
                replace: true,
              }) }>Back</button>
    <button onClick={() => alert("Form Submitted")}>Submit</button>
  </div>
)}

function Signup() {

  //parent compoenent
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [token, setToken] = useState("");

  const [userOTP, setOtpInputs] = useState("");
  const [verfiedOtp, setVerifiedOtp] = useState({one:false,two:false});
  const [userInfo, setUserInfo] = useState({
    phone: 0,
    email: "",
    password: "",
  });

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    dob: "",
    aadharCard: "",
    uploadAadharCard: null,
    panCard: "",
    uploadPanCard: null,
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
      showGst: false,
      gst: "",
      uploadGst: null,
      showCin: false,
      cin: "",
      uploadCin: null,
      showTan: false,
      tan: "",
      uploadTan: null,
      showmsme: false,
      msme: "",
      uploadmsme: null,
    },
    librayCardImage: null,
    librarySliders: [],
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



  console.log(userOTP, "userotp");

    useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("userId")
    if (token !== ""  && admin !== "") {
      setCurrentStep(4);
      setToken(token);
    }
    console.log(token, "token");
    console.log(currentStep, "currentstep");

    if(!token){
      console.log(token , "token");
      setCurrentStep(1);
    }
    }, []);

  const sendOtp = async () => {
    const { phone } = userInfo;
    //@GourishMarkan - Add toast ike this and replace the older method
    toast('Sent OTP', { 
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",

      });

    const res = await axios.post(`${BASEURL}/api/v1/auth/otp`, {
      phoneNumber: phone,
    });
    if (res.status === 200) {
      console.log("OTP sent successfully");
    }
  };
  const verifyOTP = async () => {
    console.log("verfication start user OTP");
    // const { otp1, otp2, otp3, otp4 } = userOTP;
    // Assuming verifyUserOTP is the function you want to call
    // const otp = `${otp1}${otp2}${otp3}${otp4}`;
    const otp = userOTP;
    if (Number(otp) < 1000) {
      return;
    }
    console.log("verfication start");

    const res = await axios.post(`${BASEURL}/api/v1/auth/verifyOTP`, { otp });
    console.log(res, "res");

    if (res.status === 200 || res.status === 201) {
      console.log(res.data, "res.data");
      setVerifiedOtp(
        (prev) => ({ ...prev, one: true })
      )


      toast('Verified  OTP', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
  
        });
      console.log("OTP verified successfully");
    } else {
      toast('Sent OTP', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
  
        });
    }
  };

  const [emailOtpInputs, setEmailOtpInputs] = useState("");

  const sendEmailOtp = async () => {
   
    const { email } = userInfo;
    const res = await axios.post(`${BASEURL}/api/v1/auth/emailotp`, { email });
    if (res.status === 200) {
    
      console.log("OTP sent successfully");
    }
  };


  const verifyEmailOTP = async () => {
    const notify = () => toast("Verified Email OTP");
    const otp = emailOtpInputs;
    if (Number(otp) < 1000) {
      return;
    }

    const res = await axios.post(`${BASEURL}/api/v1/auth/verifyEmailOtp`, {
      otp,
    });
    console.log(res, "res");

    if (res.status === 200 || res.status === 201) {
      console.log(res.data, "res.data");
      setVerifiedOtp(
        (prev) => ({ ...prev, two: true })
      )

      notify();
    } else {
      // toast({
      //   description: "Your Email Otp has not been verified.",
      // });
    }
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      setLibraryDetails(prevLibraryDetails => ({
        ...prevLibraryDetails,
        librarySliders: [...prevLibraryDetails.librarySliders, ...Array.from(event.target.files)],
      }));
    }
  };

  useEffect(() => {


    if (Number(userOTP) > 1000) {
      {
        currentStep ===2 && verifyOTP();
      }
    }

    if (Number(emailOtpInputs) > 1000) {
      {
        currentStep ===2 &&  verifyEmailOTP();;
      }
     
    }

    // console.log(userDetails,"---");
    console.log(libraryDetails,"---");
  }, [userOTP, emailOtpInputs, libraryDetails]);

  const createUser = async () => {
    setLoading(true);

    console.log(userDetails?.uploadAadharCard, userDetails?.uploadPanCard);

    const createUserName = `${userDetails.fullName
      .split(" ")
      .join("")
      .toLowerCase()}${userDetails.dob}`;

    const formData = new FormData();

    formData.append("phoneNumber", userInfo.phone.toString());
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("fullName", userDetails.fullName);
    formData.append("Dob", userDetails.dob);
    formData.append("AddharNumber", userDetails.aadharCard); // If AddharNumber is a text field
    formData.append("PanNumber", userDetails.panCard); // If PanNumber is a text field
    formData.append("Address", JSON.stringify(userDetails.address)); // Assuming Address is an object and needs to be stringified
    formData.append("username", createUserName);

    formData.append("aadhar", userDetails.uploadAadharCard);
    formData.append("pancard", userDetails.uploadPanCard);

    try {
    
      const response = await axios.post(
        `${BASEURL}/api/v1/admin/registerAdmin`,
        formData
      );
      console.log("Success:", response.data);

      if (response.data) {
        setLoading(false);

        console.log(response.data, "response.data");

        localStorage.setItem("role", "ADMIN");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.data._id);

      
      }

      setUserDetails({
        fullName: "",
        dob: "",
        aadharCard: "",
        uploadAadharCard: null,
        panCard: "",
        uploadPanCard: null,
        address: {
          line1: "",
          line2: "",
          city: "",
          pincode: "",
        },
      });
      setUserInfo({
        phone: 0,
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      setCurrentStep(1);
      console.error("Error:");
    
    }
  };

  const createInitialLib = async () => {

    console.log(libraryDetails, "libraryDetails-----------------d------");

    const amenitiesArray = Object.entries(libraryDetails.amentities)
  .filter(([key, value]) => value)
  .map(([key]) => key);

    const AdminId = localStorage.getItem("userId");
    console.log(AdminId)

    const LibraryDataOBJ = {
      libraryOwner: AdminId,
      name: libraryDetails.libraryName,
      shortDescription: libraryDetails.libraryApp.shortDescription,
      longDescription: libraryDetails.libraryApp.longDescription,
      rawLocation: libraryDetails.libraryApp.longDescription,
      halls: libraryDetails.halls,
      amenities: amenitiesArray,
      address:libraryDetails.libraryAddress,
      legal : libraryDetails.libraryLegal.registration,

      gstNumber:libraryDetails.libraryLegal.gst,

      cinNumber:libraryDetails.libraryLegal.cin,

      tanNumber:libraryDetails.libraryLegal.tan,

      msmeNumber : libraryDetails.libraryLegal.msme,
    };

    console.log(LibraryDataOBJ, "LibraryDataOBJ");

    const formData = new FormData();

    for (let i = 0; i < libraryDetails.librarySliders.length; i++) {
      formData.append("images", libraryDetails.librarySliders[i]);
    }


    formData.append("card", libraryDetails.librayCardImage );
    formData.append("gst", libraryDetails.libraryLegal.uploadGst );
    formData.append("cin", libraryDetails.libraryLegal.uploadCin );
    formData.append("tan", libraryDetails.libraryLegal.uploadTan );
    formData.append("msme", libraryDetails.libraryLegal.uploadmsme );

    // console.log(
    //   LibraryDataOBJ,
    //   typeof LibraryDataOBJ.seatLayout,
    //   LibraryDataOBJ.seatLayout
    // );

    formData.append("jsonData", JSON.stringify(LibraryDataOBJ));

    console.log(JSON.stringify(formData), "349");
    console.log(formData);

    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createLibrary`,
        formData
      );
      console.log("Success:", response.data);

      if (response.data) {
        setLoading(false);
       
        
        setCurrentStep(0);

        // setImages([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:");
    }
  };

  const nextStep = async () => {
  


    if (currentStep === 3) {
      createUser();
    }
    if (currentStep === 5) {
      await createInitialLib();
    }
    if (currentStep === 1) {
      sendOtp();
      sendEmailOtp();
    }

    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            sendOTP={sendOtp}
          />
        );
      case 2:
        return (
          <StepTwo
            userOTP={userOTP}
            setOtpInputs={setOtpInputs}
            userEmailOTP={emailOtpInputs}
            setOtpEmailInputs={setEmailOtpInputs}
            // handleInputChange={handleInputChange}
            // handleEmailInputChange={handleEmailOtpInputChange}
            verified={verfiedOtp}


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
            createUser={createUser}
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
            handleFileChange = {handleFileChange}
          />
        );
      case 6:
        return (
          <FinalStep

            prevStep={prevStep}


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
          {loading && <Loader />}
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Signup;
