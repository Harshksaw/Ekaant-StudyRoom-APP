

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


  const [cities, setCities] = useState<{ id: number; location: string; locationImage: string; coords: string; appId: string }[]>([]);
  console.log("🚀 ~ cities:", cities)
  const [selectedCity, setSelectedCity] = useState<string>('');
  useEffect(() => {
    fetchCities().then((data) => {
      console.log("🚀 ~ fetchCities ~ data:", data)
      setCities(data.data.locations);
    });
  },[])

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
    if (!libraryDetails.libraryName)
      newErrors.libraryName = "Library Name is required";
    if (!libraryDetails.libraryApp.shortDescription)
      newErrors.shortDescription = "Short Description is required";
    // Add more validation checks as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        {errors.libraryName && (
          <p className="text-red-500">{errors.libraryName}</p>
        )}
        {/* App name */}
        <label>App</label>
        {/* Short description */}
        <div className="relative ">
          <input
            className="w-full pl-3 py-2 pr-40  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppShortDescription"
            placeholder="shortDescription"
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


<div className="flex gap-5 mx-5 my-5">
  <label>Property Type</label>
  <div>
    <label>
      <input
        type="radio"
        name="propertyType"
        value="Owned"
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
      Owned
    </label>
  </div>
  <div>
    <label>
      <input
        type="radio"
        name="propertyType"
        value="Rented"
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
      Rented
    </label>
  </div>
</div>

{libraryDetails.libraryLegal.propertyType === "Owned" && (
  <div className="flex-col items-center justify-start mt-2">
    <label
      htmlFor="uploadElectricityBill"
      className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
    >
      Upload Electricity Bill
    </label>
    <input
      className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
      type="file"
      id="uploadElectricityBill"
      name="uploadElectricityBill"
      onChange={(e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setLibraryDetails({
          ...libraryDetails,
          libraryLegal: {
            ...libraryDetails.libraryLegal,
            uploadElectricityBill: file,
          },
        });
      }}
    />
  </div>
)}

{libraryDetails.libraryLegal.propertyType === "Rented" && (
  <div className="flex-col items-center justify-start mt-2">
    <label
      htmlFor="uploadLeaseAgreement"
      className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
    >
      Upload Lease Agreement
    </label>
    <input
      className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
      type="file"
      id="uploadLeaseAgreement"
      name="uploadLeaseAgreement"
      onChange={(e) => {
        const file = e.target.files ? e.target.files[0] : null;
        setLibraryDetails({
          ...libraryDetails,
          libraryLegal: {
            ...libraryDetails.libraryLegal,
            uploadLeaseAgreement: file,
          },
        });
      }}
    />
  </div>
)}
        {/* Long description */}
        <div className="relative ">
          <input
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAppLongDescription"
            placeholder="LongDescription"
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
        <div className="flex w-full justify-between gap-2 rounded-2xl">
          <div className="w-2/4 flex flex-col gap-2 border-md rounded-2xl">
          <label htmlFor="city">City:</label>
          <select id="city" value={selectedCity} onChange={(e) => handleCityChange(e)}
          className="w-full px-3 py-2 border  border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-2xl"
          >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.location}>
              {city.location}
            </option>
          ))}
        </select>
          </div>
          {/* State */}
          <div className="w-2/5">
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
            <input />
          </div>
        </div>
        {/* Pincode */}
        
        <div className="w-1/3">
        <label >Pincode:</label>
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
        <div className="flex justify-center items-start my-3 gap-3 flex-col">
          <label>Legal</label>
          <select
            className="w-full px-3 py-2 border border-gray-800  rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        </div>
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
                  // @ts-ignore
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
            </div>
          )}
          {/* msme */}
          <div className="flex gap-5 mx-5 my-5">
            <label>msme</label>
            <div>
              <input
                type="radio"
                name="msme"
                value="true"
                id="msme-true"
                // checked={true}
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showmsme: true,
                    },
                  });
                }}
              />
              <label>Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="msme"
                value="false"
                id="msme-false"
                // checked={libraryDetails.libraryLegal.msme === false}
                onChange={() => {
                  setLibraryDetails({
                    ...libraryDetails,
                    libraryLegal: {
                      ...libraryDetails.libraryLegal,
                      showmsme: false,
                    },
                  });
                }}
              />
              <label>No</label>
            </div>
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
                />
              </div>

              {/* Upload msme */}
              <div className="flex justify-start mt-1 border-black items-center">
                <label
                  htmlFor="uploadCinCard"
                  className="w-60 h-[50px] text-gray-700 pl-5 border-black flex items-center py-2 text-left font-normal text-md leading-tight border "
                >
                  msme Certificate
                </label>
                <label
                  className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
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