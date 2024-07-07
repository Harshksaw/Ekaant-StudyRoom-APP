import { Link } from "react-router-dom"

import studyMain from "../assets/images/studyMain.png";
import reading from "../assets/images/reading 1.png";
import { LabelledInput } from "./LabelledInput";
import { useEffect, useState } from "react";


const StepOne = ({ nextStep , userInfo, setUserInfo}) => (
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




       
            </div>

    <button  className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"  onClick={nextStep}>Next</button>
  </div>
);

const StepTwo = ({ nextStep, prevStep }) => (
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}

    <div>


 

    </div>

    <button onClick={prevStep}>Back</button>
    <button  className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"  onClick={nextStep}>Next</button>
  </div>
);
const StepThree = ({ nextStep, prevStep }) => (
   //images  - Register 3
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}

    <div>

    </div>

    <button onClick={prevStep}>Back</button>
    <button  className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"  onClick={nextStep}>Next</button>
  </div>
);
const StepFour = ({ nextStep, prevStep }) => (
   //images  - Register 4
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}

    <div>

    </div>


    <button onClick={prevStep}>Back</button>
    <button  className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"  onClick={nextStep}>Next</button>
  </div>
);
const StepFive = ({ nextStep, prevStep }) => (

  //images  - Register 5
  <div>
    <h2>Step 2</h2>
    {/* Form fields for step 2 */}

    <div>

    </div>

    <button onClick={prevStep}>Back</button>
    <button  className="absolute bottom-10 center mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"  onClick={nextStep}>Next</button>
  </div>
);

// Add similar components for StepThree, StepFour, and StepFive

const FinalStep = ({ prevStep }) => (
  <div>
    <h2>Final Step</h2>
    {/* Summary or confirmation */}
    <button onClick={prevStep}>Back</button>
    <button onClick={() => alert('Form Submitted')}>Submit</button>
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
        return <StepOne nextStep={nextStep} userInfo={userInfo} setUserInfo={setUserInfo} />; 
      case 2:
        return <StepTwo nextStep={nextStep} prevStep={prevStep} />;
      // Add cases for additional steps
      case 3:
        return <StepThree nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <StepFour nextStep={nextStep} prevStep={prevStep} />; //library -> 
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

            <div className="w-full  bg-blue-100 flex flex-1 w-full justify-center items-center">

            {renderStep()}
            </div>






        </div>



      
    </div>
  )
}

export default Signup
