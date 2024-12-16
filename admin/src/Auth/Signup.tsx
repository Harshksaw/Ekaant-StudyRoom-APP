import { Link } from "react-router-dom";

import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";

import { useEffect, useState } from "react";

import { StepTwo } from "./Signup/Step2";
import { StepThree } from "./Signup/Step3";
import { StepFour } from "./Signup/Step4";
import { StepOne } from "./Signup/Step1";
import { StepFive } from "./Signup/Step5";


import "react-datepicker/dist/react-datepicker.css";
import { BASEURL } from "@/lib/utils";
import axios from "axios";
// @ts-ignore
import { ToastContainer, toast } from 'react-toastify';
import Loader from "@/components/Loader";
import tick from "@/assets/images/tick.png"
interface LibraryDetails {
  name: string;
  librarySliders: string
  // Add other properties as needed
}
const FinalStep = () => {
  return (
    <div className="w-full h-full mt-6 flex justify-start items-center flex-col">
      <img
        src={tick}
        alt="Registartion Complete"
        className="object-cover object-center w-[150px] h-[150px]"
      />
      <h2 className="text-[45px] font-bold text-green-600">Success</h2>
      <div className="text-left mt-[2rem] text-[20px] px-[10rem] font-normal">
        Welcome to <span className="font-bold text-sky-600">Ekaant</span>:Your
        Registration is Complete and Onboarding is Under Review for Approval
        <br />
        <br />
        Kindly create a room with login to be eligible for verification
      </div>
    </div>
  );
};


function Signup() {

  //parent compoenent
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // @ts-ignore
  const [token, setToken] = useState("");

  const [userOTP, setOtpInputs] = useState("");
  const [verfiedOtp, setVerifiedOtp] = useState({ one: false, two: false });
  const [userInfo, setUserInfo] = useState({
    phone: 0,
    email: "",
    password: "",
  });
  
  const [emailOtpInputs, setEmailOtpInputs] = useState("");
  const [adminId, setAdminId] = useState(null); // State to store admin ID
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

  const [libraryDetails, setLibraryDetails] = useState<any>({
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



  useEffect(() => {
    // Clear OTP state on component mount
    setOtpInputs("");
    setEmailOtpInputs("");

    // Clear OTP state on unmount or when navigating away
    return () => {
      setOtpInputs("");
      setEmailOtpInputs("");
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = localStorage.getItem("userId")
    if (token !== "" && admin !== "") {
      setCurrentStep(4);
      setToken(token || "");
    }


    if (!token) {
      console.log(token, "token");
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
      Admin: true,
    });
    if (res.status === 200) {
      console.log("OTP sent successfully");
    }
  };
  const verifyOTP = async () => {
    console.log("verfication start user OTP");
    const otp = userOTP;
    if (Number(otp) < 1000) {
      return;
    }
    console.log("verfication start");

 
    try {

      const res = await axios.post(`${BASEURL}/api/v1/auth/verifyOtp`, {
        phoneNumber: userInfo.phone,
        otp
      });
    if (res.status === 200 || res.status === 201) {
      console.log(res.data, "res.data");
      setVerifiedOtp(
        (prev) => ({ ...prev, one: true })
      )
      toast('Verified Phone  OTP', {
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

    } catch (error) {
      toast.error('Phone Otp Not Verified ', {
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



  const sendEmailOtp = async () => {

    const { email } = userInfo;
    const res = await axios.post(`${BASEURL}/api/v1/auth/emailotp`, { email });
    if (res.status === 200) {

      console.log("OTP sent successfully");
    }
    if (res.status === 201) {
      setLoading(false);
      setVerifiedOtp({
        ...verfiedOtp,
        one: true,
        two: true
      })





      localStorage.setItem("role", "ADMIN");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.data._id);
      setAdminId(res.data.data._id);


      setCurrentStep(4);
    }

  };


  const verifyEmailOTP = async () => {

    const otp = emailOtpInputs;
    if (Number(otp) < 1000) {
      return;
    }
try{
    const res = await axios.post(`${BASEURL}/api/v1/auth/verifyEmailOtp`, {
      email: userInfo.email,
      otp,
    });


    if (res.status === 200 || res.status === 201) {
      // console.log(res.data, "res.data");
      setVerifiedOtp(
        (prev) => ({ ...prev, two: true })
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
    }
    } catch (error) {
      toast('Email Otp not verified', {
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


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const files = Array.from(event.target.files);
      if (files.length > 0) {
        setLibraryDetails((prevLibraryDetails: LibraryDetails) => ({
          ...prevLibraryDetails,
          librarySliders: [...prevLibraryDetails.librarySliders, ...files],
        }));
      }
    }
  };


  useEffect(() => {
    if (Number(userOTP) >= 1000 && currentStep === 2 && !verfiedOtp.one) {
      verifyOTP();
    }

    if (Number(emailOtpInputs) >= 1000 && currentStep === 2 && !verfiedOtp.two) {
      verifyEmailOTP();
    }

    console.log(libraryDetails, "---");
  }, [userOTP, emailOtpInputs, libraryDetails, currentStep]);

  const createUser = async () => {
    setLoading(true);

    console.log(userDetails?.uploadAadharCard, userDetails?.uploadPanCard);

    const createUserName = `${userDetails.fullName
      .split(" ")
      .join("")
      .toLowerCase()}${userDetails.dob
      }${Math.floor(Math.random() * 1000)
      }`;

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


    if (userDetails.uploadAadharCard) {
      formData.append("aadhar", userDetails.uploadAadharCard);
    }

    if (userDetails.uploadPanCard) {
      formData.append("pancard", userDetails.uploadPanCard);
    }

    try {

      const response = await axios.post(
        `${BASEURL}/api/v1/admin/registerAdmin`,
        formData
      );
      console.log("Success:", response.data);

      if (response.status === 201 || response.status === 200) {
        setLoading(false);

        console.log(response.data, "response.data");

        localStorage.setItem("role", "ADMIN");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.data.id);
        setAdminId(response.data.data.id);

      }
      if (response.status !== 201) {

        toast(`${response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        });
        return;
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
    if (!libraryDetails.libraryName) {
      toast.error("Library name is required");
      return;
    }
    if (!libraryDetails.libraryApp.shortDescription) {
      toast.error("Short description is required");
      return;
    }
    if (!libraryDetails.libraryApp.longDescription) {
      toast.error("Long description is required");
      return;
    }
    if (!libraryDetails.libraryAddress) {
      toast.error("Library address is required");
      return;
    }



    // console.log(libraryDetails, "libraryDetails-----------------d------");

    const amenitiesArray = Object.entries(libraryDetails.amentities)
      .filter(([value]) => value)
      .map(([key]) => key);

    const AdminIdE = localStorage.getItem("userId");
    console.log(AdminIdE)

    const LibraryDataOBJ = {
      libraryOwner: AdminIdE || adminId,
      name: libraryDetails.libraryName,
      shortDescription: libraryDetails.libraryApp.shortDescription,
      longDescription: libraryDetails.libraryApp.longDescription,
      rawLocation: libraryDetails.libraryApp.longDescription,
      halls: libraryDetails.halls,
      amenities: amenitiesArray,
      address: libraryDetails.libraryAddress,
      legal: libraryDetails.libraryLegal.registration,

      gstNumber: libraryDetails.libraryLegal.gst,

      cinNumber: libraryDetails.libraryLegal.cin,

      tanNumber: libraryDetails.libraryLegal.tan,

      msmeNumber: libraryDetails.libraryLegal.msme,
    };


    const formData = new FormData();

    for (let i = 0; i < libraryDetails.librarySliders.length; i++) {
      formData.append("images", libraryDetails.librarySliders[i]);
    }

    if (libraryDetails?.librayCardImage) {
      formData.append("card", libraryDetails.librayCardImage);
    }
    if (libraryDetails.libraryLegal.uploadGst) {
      formData.append("gst", libraryDetails.libraryLegal.uploadGst);
    }
    if (libraryDetails.libraryLegal.uploadCin) {
      formData.append("cin", libraryDetails.libraryLegal.uploadCin);
    }
    if (libraryDetails.libraryLegal.uploadTan) {
      formData.append("tan", libraryDetails.libraryLegal.uploadTan);
    }
    if (libraryDetails.libraryLegal.uploadmsme) {
      formData.append("msme", libraryDetails.libraryLegal.uploadmsme);
    }
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
      // console.log("Success:", response.data);

      if (response.status === 201) {

        localStorage.clear();
        toast(`${response.data.message}`, {
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

      if (response.data) {
        setLoading(false);


        // setCurrentStep(0);

        // setImages([]);
      }

      return response.status;

    } catch (error) {
      setLoading(false);
      console.error("Error:");
    }
  };

  const nextStep = async () => {



    if (currentStep === 3) {
      if(userDetails.aadharCard.length !== 12 || 
        userDetails.panCard.length !== 10 || userDetails.fullName === "" ||
         userDetails.dob === "" || userDetails.address.line1 === "" || 
         userDetails.address.line2 === "" || userDetails.address.city === "" ||
          userDetails.address.pincode === "" || !userDetails.uploadAadharCard ||
           !userDetails.uploadPanCard || userDetails.uploadAadharCard === null || 
           userDetails.uploadPanCard === null){
        toast.error("Please fill all the fields",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      )
           }
      createUser();
    }
    if (currentStep === 5) {
      const AdminId = localStorage.getItem("userId");
      if (!AdminId) {
        toast('Please login again')
        return

      }
     const res =  await createInitialLib();
     if(res == 500){
      toast.error("Please fill all the fields",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;

     }
    }
    if (currentStep === 1) {
      if(userInfo.phone.toString().length !== 10 || userInfo.email === "" || userInfo.password === ""){
        toast.error("Please fill all the fields",{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      sendOtp();
      sendEmailOtp();
      
    }

    setCurrentStep(currentStep + 1);
  };
  const prevStep = () =>  setCurrentStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            nextStep={nextStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          // sendOTP={sendOtp}
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
          // createUser={createUser}
          />
        );
      case 4:
        if (!adminId) {
          // Redirect to Step 3 or show an error message
          return (
            <div className="flex flex-col gap-20 bg-blue-100">
              <button
                className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-full h-20 rounded-sm"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}>Restart everything</button>
              <p>Error: Admin ID is required to proceed to this step.</p>
              <button className="
              mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-full h-20 rounded-sm
              " onClick={prevStep}>Go Back</button>
            </div>
          );
        }
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
            handleFileChange={handleFileChange}
          />
        );
      case 6:
        return (
          <FinalStep

          // prevStep={prevStep}


          />
        );
      default:
        return <h2 className="text-2xl text-center m-5 p-2 text-green-500
        ">Final Step</h2>;
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
          {!loading && renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Signup;
