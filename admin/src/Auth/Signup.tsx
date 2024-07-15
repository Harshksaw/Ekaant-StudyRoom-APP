import { Link } from "react-router-dom";

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
import { useToast } from "@/components/ui/use-toast"
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
  const { toast } = useToast()
  //parent compoenent
  const [loading, setLoading] = useState(false);


  const [userInfo, setUserInfo] = useState({
    phone: 0,
    email: "",
    password: "",
  });

 
  const [userOTP,setOtpInputs]=useState("")
console.log(userOTP, "userotp")

  const sendOtp = async () => {
    const { phone } = userInfo;
    toast({
      description: "OTP sent successfully",
    
    })
  
   
    const res = await axios.post(`${BASEURL}/api/v1/auth/otp`, { phoneNumber : phone });
    if(res.status === 200){
      console.log("OTP sent successfully")
    }
  
}
  const verifyOTP = async () => {

    console.log("verfication start user OTP");
    // const { otp1, otp2, otp3, otp4 } = userOTP;
    // Assuming verifyUserOTP is the function you want to call
    // const otp = `${otp1}${otp2}${otp3}${otp4}`;
    const otp=userOTP
    if (Number(otp) < 1000) {
      return;
    }
    console.log("verfication start");

    const res = await axios.post(`${BASEURL}/api/v1/auth/verifyOTP`, {otp});
    console.log(res, "res")

    if(res.status === 200 || res.status === 201){
      console.log(res.data, "res.data")

      toast({
        type:'background',
        style:{
          background:'rgb(45, 218, 88)',


        },
        

        variant:'default',

        color: "green",
        description: "Your Phone Otp has been verified.",
      })
      console.log("OTP verified successfully")
    }else{
      toast({
        description: "Your Phone Otp has not been verified.",
      })
    }



  };

  // Handle OTP input change
  // const handleInputChange = async(e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const updatedOtpInputs = {
  //     ...userOTP,
  //     [name]: value,
  //   };
  //   setOtpInputs(updatedOtpInputs);



  //   // Check if all inputs are filled after the state update
  //   const allFilled = Object.values(updatedOtpInputs).every(
  //     (input) => input.trim() !== ""
  //   );

    
  //   if (allFilled) {
  //     console.log("All inputs are filled phone otp");
  //     await verifyOTP();


  //   }
  // };

  const [emailOtpInputs, setEmailOtpInputs] = useState("");

 


  const sendEmailOtp = async () => {  
    toast({

      description: "Email OTP sent successfully",
    })
    const { email } = userInfo;
    const res = await axios.post(`${BASEURL}/api/v1/auth/emailotp`, { email });
    if(res.status === 200){
      
      toast({
        description: "OTP sent successfully",
      style:{
        background:'rgb(45, 218, 88)',
        color:'white',
        padding:'1rem',
        borderRadius:'1rem',
      },
      
      })
      console.log("OTP sent successfully")
    }
  }
  // Function to call after all OTP inputs are filled

  const verifyEmailOTP = async () => {

    // const { emailOtp1, emailOtp2, emailOtp3, emailOtp4 } = emailOtpInputs;
    // const otp = `${emailOtp1}${emailOtp2}${emailOtp3}${emailOtp4}`;
    const otp = emailOtpInputs;
    if (Number(otp) < 1000) {
      return;
    }
  
    const res = await axios.post(`${BASEURL}/api/v1/auth/verifyEmailOtp`, {
      otp 
    });
    console.log(res, "res")
  
    if(res.status === 200 || res.status === 201){
      console.log(res.data, "res.data")
  
      toast({
        type:'background',
        style:{
          background:'rgb(45, 218, 88)',
        },
        variant:'default',
        color: "green",
        description: "Your Email Otp has been verified.",
      })
      console.log("OTP verified successfully")
    }else{
      toast({
        description: "Your Email Otp has not been verified.",
      })
    }
  }



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
      showGst: false,
      gst: "",
      uploadGst: null,
      showCin: false,
      cin: "",
      uploadCin: null,
      showTan: false,
      tan: "",
      uploadTan: null,
      showMisme: false,
      misme: "",
      uploadMisme: null,
    },
    librayCardImage: [],
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
    console.log(emailOtpInputs,"========>userinfo");


    // console.log(userOTP,"========>userotp");

    if(Number(userOTP) > 1000){
      verifyOTP()

    }

    if(Number(emailOtpInputs) > 1000){
      verifyEmailOTP()
    }
    console.log(libraryDetails, "========================>Librarydetails");
    console.log(userDetails, " ========================> userdetails");

  }, [userInfo, userOTP, libraryDetails, userDetails, emailOtpInputs]);


  const createUser = async () => {
    const AdminId = await localStorage.getItem("userId");

    const createAdminDataOBJ = {
      fullName: userDetails.fullName,
      dob: userDetails.dob,
      aadharCard: userDetails.aadharCard,
      panCard: userDetails.panCard,
      address: userDetails.address,
    };
    console.log(userDetails?.uploadAadharCard, userDetails?.uploadPanCard)
    const formData = new FormData();

    formData.append("aadharImage", userDetails?.uploadAadharCard);
    formData.append("panImage", userDetails?.uploadPanCard);

    formData.append("jsonData", JSON.stringify(createAdminDataOBJ));

    console.log(formData, " > > > ======================>");
    try {
      // setLoading(true);
      // const response = await axios.post(
      //   `${BASEURL}/api/v1/library/createLibrary`,
      //   formData
      // );
      // console.log("Success:", response.data);

      // if (response.data) {
      //   // setLoading(false);
      //   toast.success("Library created successfully");
      //   setUserDetails({
      //     fullName: "",
      //     dob: "",
      //     aadharCard: "",
      //     uploadAadharCard: [],
      //     panCard: "",
      //     uploadPanCard: [],
      //     address: {
      //       line1: "",
      //       line2: "",
      //       city: "",
      //       pincode: "",
      //     },
      //   })

      // }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error:"

      );
    }
  };

  const createInitialLib = async (event: React.FormEvent<HTMLFormElement>) => {


    const AdminId = await localStorage.getItem("userId");
    const LibraryDataOBJ = {
      libraryOwner: AdminId,
      name: libraryDetails.libraryName,
      shortDescription: libraryDetails.libraryApp.shortDescription,
      longDescription: libraryDetails.libraryApp.longDescription,
      rawLocation: libraryDetails.libraryApp.longDescription,
      halls: libraryDetails.halls,
      amenities: libraryDetails?.amentities,
    };

    const formData = new FormData();

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append("images", uploadedFiles[i]);
    }
    console.log(
      LibraryDataOBJ,
      typeof LibraryDataOBJ.seatLayout,
      LibraryDataOBJ.seatLayout
    );
    formData.append("jsonData", JSON.stringify(LibraryDataOBJ));

    console.log(JSON.stringify(formData));
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
        toast.success("Library created successfully");
        setCurrentStep(0);

        // setImages([]);

      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error:"

      );
    }
  };

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = async() => {
    console.log(currentStep, 'currentstep')
    if (currentStep === 3) {
      createUser()
    }
    if(currentStep === 1){
       sendOtp()
       sendEmailOtp()
    }
    setCurrentStep(currentStep + 1)
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
