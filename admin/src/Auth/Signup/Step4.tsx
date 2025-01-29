// import { InfoIcon } from "lucide-react";

import StateDropdown from "@/components/StateSelector";
import { fetchCities } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StepFour = ({
  nextStep,
  prevStep,
  libraryDetails,
  setLibraryDetails,
}: any) => {
  const [errors, setErrors] = useState<any>({});
  const [electricityBill , setElecityBil] = useState(false)
  const [leaseAgrement, setLeaseAgreement] = useState(false)
  const [gstUpload , setGstUpload] = useState(false)
  const [cities, setCities] = useState<
    {
      id: number;
      location: string;
      locationImage: string;
      coords: string;
      appId: string;
    }[]
  >([]);
  console.log("🚀 ~ cities:", cities);
  const [selectedCity, setSelectedCity] = useState<string>("");
  useEffect(() => {
    fetchCities().then((data) => {
      console.log("🚀 ~ fetchCities ~ data:", data);
      setCities(data.data.locations);
    });
  }, []);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = event.target.value;
    // console.log("🚀 ~ handleCityChange ~ selectedCity:", selectedCity)
    setSelectedCity(selectedCity);
    setLibraryDetails((prevLibraryDetails: any) => ({
      ...prevLibraryDetails,
      libraryAddress: {
        ...prevLibraryDetails.libraryAddress,
        city: event.target.value,
      },
    }));
  };

  const validateFields = () => {
    const newErrors: any = {};

    if (!libraryDetails.libraryLegal.propertyType) {
      newErrors.propertyType = "Please select a property type.";
    }

    // Validate library name
    if (!libraryDetails.libraryName) {
      newErrors.libraryName = "Library Name is required";
    }

    // Validate library app fields
    if (!libraryDetails.libraryApp.shortDescription) {
      newErrors.shortDescription = "Short Description is required";
    }
    if (!libraryDetails.libraryApp.longDescription) {
      newErrors.longDescription = "Long Description is required";
    }

    // Validate library address fields
    if (!libraryDetails.libraryAddress.line1) {
      newErrors.line1 = "Address Line 1 is required";
    }
    if (!libraryDetails.libraryAddress.city) {
      newErrors.city = "City is required";
    }
    if (!libraryDetails.libraryAddress.state) {
      newErrors.state = "State is required";
    }
    if (!libraryDetails.libraryAddress.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(libraryDetails.libraryAddress.pincode)) {
      newErrors.pincode = "Pincode must be a 6-digit number";
    }

    // Validate library legal fields
    if (!libraryDetails.libraryLegal.registration) {
      newErrors.registration = "Registration is required";
    }

    // Validate GST number if `showGst` is "yes"
    if (libraryDetails.libraryLegal.showGst === null) {
      newErrors.showGst = "GST is required.";
    }

    if (
      libraryDetails.libraryLegal.showGst === true &&
      !libraryDetails.libraryLegal.gst
    ) {
      newErrors.gst = "GST number is required.";
    }
    if (
      libraryDetails.libraryLegal.showGst &&
      !libraryDetails.libraryLegal.uploadGst
    ) {
      newErrors.uploadGst = "GST document upload is required";
    }
    if (libraryDetails.libraryLegal.showCin === null) {
      newErrors.showCin = "Cin is required.";
    }
    if (
      libraryDetails.libraryLegal.showCin &&
      !libraryDetails.libraryLegal.cin
    ) {
      newErrors.cin = "CIN is required";
    }
    if (
      libraryDetails.libraryLegal.showCin &&
      !libraryDetails.libraryLegal.uploadCin
    ) {
      newErrors.uploadCin = "CIN document upload is required";
    }
    if (libraryDetails.libraryLegal.showTan === null) {
      newErrors.showTan = "TAN is required.";
    }
    if (
      libraryDetails.libraryLegal.showTan &&
      !libraryDetails.libraryLegal.tan
    ) {
      newErrors.tan = "TAN is required";
    }
    if (
      libraryDetails.libraryLegal.showTan &&
      !libraryDetails.libraryLegal.uploadTan
    ) {
      newErrors.uploadTan = "TAN document upload is required";
    }
    if (libraryDetails.libraryLegal.showmsme === null) {
      newErrors.showmsme = "MSME is required.";
    }
    if (
      libraryDetails.libraryLegal.showmsme &&
      !libraryDetails.libraryLegal.msme
    ) {
      newErrors.msme = "MSME is required";
    }
    if (
      libraryDetails.libraryLegal.showmsme &&
      !libraryDetails.libraryLegal.uploadmsme
    ) {
      newErrors.uploadmsme = "MSME document upload is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [error, setError] = useState({
    gstNumber: "",
  });

  const validateGST = (gstNumber) => {
    const alphanumericRegex = /^[a-zA-Z0-9]{15}$/;
    if (!gstNumber) {
      return "GST number is required.";
    }
    if (!alphanumericRegex.test(gstNumber)) {
      return "GST number must be exactly 15 alphanumeric characters.";
    }
    return "";
  };

  const handleGSTBlur = (e) => {
    const gstNumber = e.target.value;
    const error = validateGST(gstNumber);

    setErrors({
      ...errors,
      gstNumber: error,
    });

    if (!error) {
      setLibraryDetails({
        ...libraryDetails,
        libraryLegal: {
          ...libraryDetails.libraryLegal,
          gstNumber,
        },
      });
    }
  };

  const validateCIN = (cin) => {
    const alphanumericRegex = /^[a-zA-Z0-9]{15}$/;
    if (!cin) {
      return "CIN is required.";
    }
    if (!alphanumericRegex.test(cin)) {
      return "CIN must be exactly 15 alphanumeric characters.";
    }
    return "";
  };

  // Event handler for CIN blur
  const handleCINBlur = (e) => {
    const cin = e.target.value;
    const error = validateCIN(cin);

    setErrors({
      ...errors,
      cin: error,
    });

    if (!error) {
      setLibraryDetails({
        ...libraryDetails,
        libraryLegal: {
          ...libraryDetails.libraryLegal,
          cin,
        },
      });
    }
  };

  // Function to validate TAN
  const validateTAN = (tan) => {
    const alphanumericRegex = /^[a-zA-Z0-9]{10}$/; // TAN must be 10 alphanumeric characters
    if (!tan) {
      return "TAN is required.";
    }
    if (!alphanumericRegex.test(tan)) {
      return "TAN must be exactly 10 alphanumeric characters.";
    }
    return "";
  };

  // Event handler for TAN blur
  const handleTANBlur = (e) => {
    const tan = e.target.value;
    const error = validateTAN(tan);

    setErrors({
      ...errors,
      tan: error,
    });

    if (!error) {
      setLibraryDetails({
        ...libraryDetails,
        libraryLegal: {
          ...libraryDetails.libraryLegal,
          tan,
        },
      });
    }
  };

  const validateMSME = (msme) => {
    const alphanumericRegex = /^[a-zA-Z0-9]{12}$/;
    if (!msme) {
      return "MSME number is required.";
    }
    if (!alphanumericRegex.test(msme)) {
      return "MSME number must be exactly 12 alphanumeric characters.";
    }
    return "";
  };
  // Event handler for MSME blur
  const handleMSMEBlur = (e) => {
    const msme = e.target.value;
    const error = validateMSME(msme);

    setErrors({
      ...errors,
      msme: error,
    });

    if (!error) {
      setLibraryDetails({
        ...libraryDetails,
        libraryLegal: {
          ...libraryDetails.libraryLegal,
          msme,
        },
      });
    }
  };

  const handleNextStep = () => {
    if (validateFields()) {
      nextStep();
    }
  };
  return (
    //images  - Register 4

    <div className="flex  flex-1 flex-col  overflow-y-auto px-10 py-6 bg-white rounded-lg">
      {/* Form fields for step 2 */}

      <div className=" flex-col w-full  mb-100 gap-20">
        <h1>Enter Below </h1>
        {/* Library name */}

        <label>Library Name  
        <span className="text-red-500 ml-1">*</span>
        </label>
       
        <input
          className="w-full px-3 h-[50px] rounded-xl py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        {errors.libraryName && (
          <p className="text-red-500">{errors.libraryName}</p>
        )}
        {/* App name */}
        <label>App
        <span className="text-red-500 ml-1">*</span>
        </label>
        {/* Short description */}
        <div className="relative ">
          <input
            className="w-full pl-3 h-[50px] rounded-xl py-2 pr-40  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppShortDescription"
            placeholder="Short Description"
            maxLength={85}
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
                Information from Will be displayed on Library Card
              </span>
            </div>
          </section>
        </div>
        {errors.shortDescription && (
          <p className="text-red-500">{errors.shortDescription}</p>
        )}

        <div className="flex flex-col gap-6 py-6 px-1  bg-white  rounded-lg max-w-md ">
          {/* Title */}
          <p className="text-xl font-semibold text-gray-800">
            Select Property Type
            <span className="text-red-500 ml-1">*</span>
          </p>

          {/* Options */}
          <div className="flex items-center gap-4">
            {/* Owned Option */}
            <label
              htmlFor="propertyOwned"
              className={`flex items-center rounded-xl justify-center gap-2 px-6 py-3 cursor-pointer  border transition-all duration-300 
      ${
        libraryDetails?.libraryLegal?.propertyType === "Owned"
          ? "bg-blue-600 text-white border-blue-600 shadow-md"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
      }`}
              role="radio"
              aria-checked={
                libraryDetails?.libraryLegal?.propertyType === "Owned"
                  ? "true"
                  : "false"
              }
            >
              <input
                type="radio"
                name="propertyType"
                id="propertyOwned"
                value="Owned"
                className="hidden"
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      propertyType: "Owned",
                    },
                  });
                }}
              />
              <span >Owned</span>
            </label>
            {/* Rented Option */}
            <label
              htmlFor="propertyRented"
              className={`flex items-center rounded-xl justify-center gap-2 px-6 py-3 cursor-pointer  border transition-all duration-300 
      ${
        libraryDetails?.libraryLegal?.propertyType === "Rented"
          ? "bg-blue-600 text-white border-blue-600 shadow-md"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
      }`}
              role="radio"
              aria-checked={
                libraryDetails?.libraryLegal?.propertyType === "Rented"
                  ? "true"
                  : "false"
              }
            >
              <input
                type="radio"
                name="propertyType"
                id="propertyRented"
                value="Rented"
                className="hidden "
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      propertyType: "Rented",
                    },
                  });
                }}
              />
              <span>Rented</span>
            </label>
          </div>
          {errors.propertyType && (
            <p className="text-red-500 text-sm">{errors.propertyType}</p>
          )}
        </div>

        {libraryDetails.libraryLegal.propertyType === "Owned" && (
          <div className="flex-col items-center justify-start mt-2">
            {/* Label for Uploading Electricity Bill */}
            <label
              htmlFor="uploadElectricityBill"
              className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
            >
              Upload Electricity Bill
            </label>

            {/* File Input Container */}
            <div className="flex mt-2 justify-start items-center border-black">
              {/* Label for Input */}
              <label
                htmlFor="uploadElectricityBill"
                className={` cursor-pointer  flex justify-center items-center h-[50px] ${electricityBill ? "w-96 rounded-xl  text-white bg-[#0077B6]" : "w-60"} rounded-l-xl text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border`}
              >
                {electricityBill ? "Update " : "Select File"}   
              </label>

              {/* File Input Button */}
            {
              !electricityBill && (
                <label className="block w-32 bg-[#0077B6] rounded-r-xl py-2 text-white h-[50px] justify-center items-center text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                Choose File
              <input
                type="file"
                id="uploadElectricityBill"
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    // Preview the image if it's an image file
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setLibraryDetails({
                        ...libraryDetails,
                        libraryLegal: {
                          ...libraryDetails.libraryLegal,
                          uploadElectricityBill: file,
                          electricityBillPreview: reader.result, // Store image preview URL
                       
                        },
                    
                      });
                    };
                    setElecityBil(true)
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ display: "none" }} // Hide the actual input
              />
            </label>
              )
            }
            </div>

            {/* Image Preview */}
            {libraryDetails.libraryLegal.electricityBillPreview && (
              <div className="mt-3">
                  <p className="text-gray-600 text-sm mb-2">Preview:</p>
                <img
                  src={
                    libraryDetails.libraryLegal.electricityBillPreview as string
                  }
                  alt="Electricity Bill Preview"
                  className="mt-2 mx-auto h-32 object-cover shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"  
                />
              </div>
            )}

            {/* Error message for upload */}
            {errors.uploadElectricityBill && (
              <p className="text-red-500 text-sm">
                {errors.uploadElectricityBill}
              </p>
            )}
          </div>
        )}

        {libraryDetails.libraryLegal.propertyType === "Rented" && (
        
          <div className="flex-col items-center justify-start mt-2">
            {/* Label for Uploading Lease Agreement */}
            <label
              htmlFor="uploadLeaseAgreement"
              className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
            >
              Upload Lease Agreement
            </label>
        
            {/* File Input Container */}
            <div className="flex mt-2 justify-start items-center border-black">
              {/* Label for Input */}
              <label
                htmlFor="uploadLeaseAgreement"
                className={`cursor-pointer flex justify-center items-center h-[50px] ${leaseAgrement ? "w-96 rounded-xl text-white bg-[#0077B6]" : "w-60"} rounded-l-xl text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border`}
              >
                {leaseAgrement ? "Update " : "Select File"}
              </label>
        
              {/* File Input Button */}
              {
                !leaseAgrement && (
                  <label className="block w-32 bg-[#0077B6] rounded-r-xl py-2 text-white h-[50px] justify-center items-center text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
                    Choose File
                    <input
                      type="file"
                      id="uploadLeaseAgreement"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          // Preview the image if it's an image file
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setLibraryDetails({
                              ...libraryDetails,
                              libraryLegal: {
                                ...libraryDetails.libraryLegal,
                                uploadLeaseAgreement: file,
                                leaseAgreementPreview: reader.result, // Store image preview URL
                              },
                            });
                          };
                          setLeaseAgreement(true); // Set leaseAgrement to true after file upload
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ display: "none" }} // Hide the actual input
                    />
                  </label>
                )
              }
            </div>
        
            {/* Image Preview */}
            {libraryDetails.libraryLegal.leaseAgreementPreview && (
              <div className="mt-3">
                <p className="text-gray-600 text-sm mb-2">Preview:</p>
                <img
                  src={libraryDetails.libraryLegal.leaseAgreementPreview}
                  alt="Lease Agreement Preview"
                  className="mt-2 mx-auto h-32 object-cover shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            )}
        
            {/* Error message for upload */}
            {errors.uploadLeaseAgreement && (
              <p className="text-red-500 text-sm">
                {errors.uploadLeaseAgreement}
              </p>
            )}
          </div>
      
        
        )}
        {/* Long description */}
        <div className="relative  mt-5">
          <input
            className="w-full h-[50px] rounded-xl px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppLongDescription"
            placeholder="Long Description"
            maxLength={85}
            value={libraryDetails.libraryApp.longDescription}
            onChange={(e) => {
              setLibraryDetails({
                ...libraryDetails,
                libraryApp: {
                  ...libraryDetails.libraryApp,
                  longDescription: e.target.value,
                },
              });
            }}
          />
          {errors.longDescription && (
            <p className="text-red-500">{errors.longDescription}</p>
          )}
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
        <div className="mt-2 space-y-2">
          <label className=" ml-1"> Address
          <span className="text-red-500 ml-1">*</span>
          </label>
          {/* Line 1 */}
          <input
            className="w-full px-3 h-[50px] rounded-xl py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

          {errors.line1 && (
            <p className="text-red-500 text-sm">{errors.line1}</p>
          )}

          {/* Line 2 */}
          <input
            className="w-full px-3 h-[50px] rounded-xl mt-1 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        </div>
        {/* City */}
        <div className="flex mt-2 w-full justify-between gap-2 rounded-2xl">
          <div className="w-2/4 flex flex-col gap-2 border-md rounded-2xl">
            <label htmlFor="city">City:       <span className="text-red-500 ">*</span></label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => handleCityChange(e)}
              className="w-full px-3 h-[50px] rounded-xl py-2 border  border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-2xl"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.location}>
                  {city.location}
                </option>
              ))}
            </select>
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          {/* State */}
          <div className="w-2/5 ">
          
            <StateDropdown
              value={libraryDetails.libraryAddress.state}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setLibraryDetails({
                  ...libraryDetails,
                  libraryAddress: {
                    ...libraryDetails.libraryAddress,
                    state: e.target.value,
                  },
                });
              }}
            />
            {errors.state && (
              <p className="text-red-500 text-sm -mt-2">{errors.state}</p>
            )}
            <input />
          </div>
        </div>
        {/* Pincode */}

        <div className="w-1/3">
          <label>Pincode:
          <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className="w-full h-[50px] rounded-xl px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminLibraryAddressPincode"
            maxLength={6}
            minLength={6}
            placeholder="pincode"
            value={libraryDetails.libraryAddress.pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              setLibraryDetails({
                ...libraryDetails,
                libraryAddress: {
                  ...libraryDetails.libraryAddress,
                  pincode: value,
                },
              });
            }}
          />

          {errors.pincode && (
            <p className="text-red-500 text-sm ">{errors.pincode}</p>
          )}
        </div>
        <div className="flex justify-center items-start my-3 gap-3 flex-col">
          <label>Legal
          <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            className="w-full h-[50px] rounded-xl px-3 py-2 border border-gray-800  rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="adminLibraryLegalRegistration"
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
          >
            {errors.pincode && (
              <p className="text-red-500 text-sm ">{errors.pincode}</p>
            )}
            <option value="" disabled>
              Select Registration Type
            </option>
            <option value="Sole Proprietorship">Sole Proprietorship</option>
            <option value="Partnership Firm">Partnership Firm</option>
            <option value="Limited Liability Partnership (LLP)">
              Limited Liability Partnership (LLP)
            </option>
            <option value="One Person Company (OPC)">
              One Person Company (OPC)
            </option>
            <option value="Private Limited Company">
              Private Limited Company
            </option>
            <option value="Public Limited Company">
              Public Limited Company
            </option>
            <option value="Section 8 Company (Non-Profit)">
              Section 8 Company (Non-Profit)
            </option>
            <option value="Hindu Undivided Family (HUF)">
              Hindu Undivided Family (HUF)
            </option>
            <option value="Cooperative Society">Cooperative Society</option>
          </select>
          {errors.registration && (
            <p className="text-red-500 text-sm">{errors.registration}</p>
          )}
        </div>
        {/* GST */}
        <div className="flex flex-col gap-5  my-2">
          <div className="flex flex-col gap-4 px-2 py-2">
            <label className="text-lg font-semibold">
              Do you have a GST Number?
              <span className="text-red-500 ml-1">*</span>
            </label>

            <fieldset className="flex gap-4">
              <legend className="sr-only">GST Information</legend>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showGst"
                  value="true"
                  id="gst-true"
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showGst: true,
                      },
                    });
                    setErrors((prev) => {
                      const updatedErrors = { ...prev };
                      delete updatedErrors.showGst;
                      return updatedErrors;
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="gst-true"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showGst === true
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showGst"
                  value="false"
                  id="gst-false"
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showGst: false, // Set to true when Yes is selected
                      },
                    });
                    // Remove error if present
                    setErrors((prev) => {
                      const updatedErrors = { ...prev };
                      delete updatedErrors.showGst;
                      return updatedErrors;
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="gst-false"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showGst === false
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  No
                </label>
              </div>
            </fieldset>
            {errors.showGst && (
              <p className="text-red-500 text-sm mt-1">{errors.showGst}</p>
            )}
          </div>

          {libraryDetails.libraryLegal.showGst && (
            <div className="">
              {/* gst input */}
              <div className="">
                <input
                  type="text"
                  placeholder="Gst Number"
                  id="adminLibraryLegalGst"
                  value={libraryDetails.libraryLegal.gst}
                  maxLength={15}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        gst: e.target.value,
                      },
                    });
                  }}
                  onBlur={handleGSTBlur}
                />
                {errors.gstNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gstNumber}
                  </p>
                )}
                {errors.gst && (
                  <p className="text-red-500 text-sm">{errors.gst}</p>
                )}
              </div>
              {/* UPLOAD GST  */}
              <div className="flex mt-2 justify-start  border-black items-center">
                <label
                  htmlFor="uploadAadharCard"
                  className="w-60 h-[50px] rounded-l-xl text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  Upload Gst Certificate
                </label>

                <label
                  className="block w-32 bg-[#0077B6] rounded-r-xl  py-2  text-white  h-[50px] justify-center items-center
                text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="GST certificate"
                    id="adminLegalUploadGst"
                    onChange={(e) => {
                      toast.loading("Uploading Image...");
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
                      toast.dismiss();
                      toast.success("Image Uploaded Successfully!");
                    }}
                    style={{ display: "none", justifyContent: "center" }} // Hide the actual input
                  />
                </label>
              </div>
              {errors.uploadGst && (
                <p className="text-red-500 text-sm">{errors.uploadGst}</p>
              )}
            </div>
          )}
        </div>
        <div>
          {/* CIN */}
          <div className="flex flex-col gap-4 px-2 py-2">
            <label className="text-lg font-semibold">Do you have a CIN? 
            <span className="text-red-500 ml-1">*</span>
            </label>

            <fieldset className="flex gap-4">
              <legend className="sr-only">CIN Information</legend>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showCin"
                  value="true"
                  id="cin-true"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showCin: true,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="cin-true"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showCin === true
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showCin"
                  value="false"
                  id="cin-false"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showCin: false,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="cin-false"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showCin === false
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  No
                </label>
              </div>
            
            </fieldset>

            {errors.showCin && (
              <p className="text-red-500 text-sm mt-1">{errors.showCin}</p>
            )}
          </div>

          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showCin && (
            <div className="mx-4">
              <div>
                {/* {cin oinput} */}

                <input
                  type="text"
                  id="adminLibraryLegalCin"
                  maxLength={21}
                  value={libraryDetails.libraryLegal.cin}
                  onChange={(e) => {
                    const value = e.target.value.toUpperCase(); // Convert input to uppercase for consistency
                    const alphanumericRegex = /^[A-Z0-9]*$/; // Alphanumeric validation (uppercase letters and numbers)

                    if (alphanumericRegex.test(value) && value.length <= 15) {
                      setLibraryDetails({
                        ...libraryDetails,
                        libraryLegal: {
                          ...libraryDetails.libraryLegal,
                          cin: e.target.value, // Update only if valid
                        },
                      });
                    }
                  }}
                  onBlur={handleCINBlur}
                  placeholder="CIN"
                  className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.cin && (
                  <p className="text-red-500 text-sm">{errors.cin}</p>
                )}
              </div>

              {/* Upload CIN */}
              <div className="flex justify-start mt-3 border-black items-center">
                <label
                  htmlFor="uploadCinCard"
                  className="w-60 h-[50px] rounded-l-xl text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  CIN Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] rounded-r-xl py-2  text-white  h-[50px] justify-center items-center
              text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="CIN certificate"
                    id="adminLegalUploadCin"
                    // name="uploadCinCard"
                    onChange={(e) => {
                      toast.loading("Uploading Images...");
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
                      toast.dismiss();
                      toast.success("Image Uploaded Successfully!");
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
              {errors.uploadCin && (
                <p className="text-red-500 text-sm mt-1">{errors.uploadCin}</p>
              )}
            </div>
          )}

          {/* TAN */}
          <div className="flex flex-col gap-4 px-2 py-2">
            <label className="text-lg font-semibold">Do you have a TAN?
            <span className="text-red-500 ml-1">*</span>
            </label>

            <fieldset className="flex gap-4">
              <legend className="sr-only">TAN Information</legend>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showTan"
                  value="true"
                  id="tan-true"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showTan: true,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="tan-true"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showTan === true
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showTan"
                  value="false"
                  id="tan-false"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showTan: false,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="tan-false"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showTan === false
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  No
                </label>
              </div>
            </fieldset>
            {errors.showTan && (
              <p className="text-red-500 text-sm mt-1">{errors.showTan}</p>
            )}
          
          </div>

          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showTan && (
            <div className="mx-3">
              {/* TAN input */}
              <div className=" ">
                <input
                  type="text"
                  placeholder="Tan Number"
                  id="adminLibraryLegalTan"
                  maxLength={10}
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
                  onBlur={handleTANBlur}
                />
                {errors.tan && (
                  <p className="text-red-500 text-sm mt-1">{errors.tan}</p>
                )}
              </div>

              {/* Upload TAN */}
              <div className="flex justify-start mt-3 border-black items-center">
                <label
                  htmlFor="uploadTAN"
                  className="w-60 h-[50px] text-gray-700 rounded-l-xl pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  TAN Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
              text-center border border-gray-800  rounded-r-xl focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="Tan certificate"
                    id="adminLegalUploadTan"
                    onChange={(e) => {
                      toast.loading("Uploading Image...");
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
                      toast.dismiss();
                      toast.success("Image Uploaded Successfully!");
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
              {errors.uploadTan && (
                <p className="text-red-500 text-sm mt-1">{errors.uploadTan}</p>
              )}
            </div>
          )}
          {/* msme */}
          <div className="flex flex-col gap-4 px-2 py-4">
            <label className="text-lg font-semibold"> 
              Do you have an MSME? <span className="text-red-500 ml-1">*</span>
            </label>

            <fieldset className="flex gap-4">
              <legend className="sr-only">MSME Information</legend>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showMsme"
                  value="true"
                  id="msme-true"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showmsme: true,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="msme-true"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showmsme === true
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  Yes
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="showMsme"
                  value="false"
                  id="msme-false"
                  onChange={() => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        showmsme: false,
                      },
                    });
                  }}
                  className="hidden"
                />
                <label
                  htmlFor="msme-false"
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span
                    className={`w-5 h-5 rounded-full border-2 ${
                      libraryDetails.libraryLegal.showmsme === false
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    }`}
                  ></span>
                  No
                </label>
              </div>
            </fieldset>
            {errors.showCin && (
              <p className="text-red-500 text-sm mt-1">{errors.showCin}</p>
            )}
          </div>

          {/* conditional rendering */}
          {libraryDetails.libraryLegal.showmsme && (
            <div>
              {/* msme input */}
              <div className=" ">
                <input
                  type="text"
                  id="adminLibraryLegalmsme"
                  placeholder="msme Number"
                  value={libraryDetails.libraryLegal.msme}
                  onChange={(e) => {
                    setLibraryDetails({
                      ...libraryDetails,
                      libraryLegal: {
                        ...libraryDetails.libraryLegal,
                        msme: e.target.value,
                      },
                    });
                  }}
                  onBlur={handleMSMEBlur}
                />
                {errors.msme && (
                  <p className="text-red-500 text-sm mt-1">{errors.msme}</p>
                )}
              </div>

              {/* Upload msme */}
              <div className="flex justify-start mt-3 border-black items-center">
                <label
                  htmlFor="uploadCinCard"
                  className="w-60 h-[50px] rounded-l-xl text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  msme Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2 rounded-r-xl  text-white  h-[50px] justify-center items-center
        text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  Select file
                  <input
                    type="file"
                    placeholder="msme certificate"
                    id="adminLegalUploadmsme"
                    onChange={(e) => {
                      toast.loading("Uploading Image...");
                      const file = e.target.files ? e.target.files[0] : null;
                      if (file) {
                        setLibraryDetails({
                          ...libraryDetails,
                          libraryLegal: {
                            ...libraryDetails.libraryLegal,
                            uploadmsme: file,
                          },
                        });
                      }
                      toast.dismiss();
                      toast.success("Image Uploaded Successfully!");
                    }}
                    style={{ display: "none", justifyContent: "center" }}
                  />
                </label>
              </div>
              {errors.uploadmsme && (
                <p className="text-red-500 text-sm mt-1">{errors.uploadmsme}</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-40  mt-20   items-center justify-between">
        <button
          className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-xl"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-16 rounded-xl"
          onClick={() => {
            handleNextStep();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
