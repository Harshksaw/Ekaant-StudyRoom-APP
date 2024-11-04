
import StateDropdown from "@/components/StateSelector";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
export const StepThree = ({
  nextStep,
  prevStep,
  userDetails,
  setUserDetails,
}: // createUser,
any) => {
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "aadhar" | "pan"
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      toast.loading("Uploading image...");
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "aadhar") {
          setAadharPreview(reader.result as string);
          setUserDetails({ ...userDetails, uploadAadharCard: file });
          toast.dismiss();
          toast.success("Aadhar card uploaded successfully");
        } else if (type === "pan") {
          setPanPreview(reader.result as string);
          setUserDetails({ ...userDetails, uploadPanCard: file });
          toast.dismiss();
          toast.success("PAN card uploaded successfully");
        }
      };
      reader.onerror = () => {
        toast.dismiss();
        toast.error("Failed to upload image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setUserDetails({ ...userDetails, dob: date });
      setShowDatePicker(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  return (
    <div className="flex  flex-1 overflow-y-auto px-10 py-6 bg-white rounded-lg">
      {/* Form fields for step 2 */}

      <div className=" flex-col w-full  mb-100 gap-25 ">
        <div className="flex-col items-center justify-start">
          <label
            htmlFor="adminFullName"
            className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
          >
            Full Name
          </label>
          <input
            className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminFullName"
            name="adminFullName"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            placeholder="Full Name"
          />
        </div>
        {/* DOB */}
        <div className="flex-col items-center justify-start">
          <div className="flex-col mb-4 relative" ref={datePickerRef}>
            {showDatePicker && (
              <div className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-2">
                <DayPicker
                  mode="single"
                  selected={userDetails.dob}
                  onSelect={handleDateChange}
                  captionLayout="dropdown"
                />
              </div>
            )}
            <label>Date of Birth:</label>
            <input
              className="w-full px-3 py-2 border border-gray-800 rounded focus:outline-none"
              type="text"
              value={
                userDetails.dob ? userDetails.dob.toLocaleDateString() : ""
              }
              placeholder="Select your DOB"
              readOnly
              onClick={() => setShowDatePicker(!showDatePicker)}
            />
          </div>

          {/* <input
          className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminDob"
          name="adminDob"
          value={userDetails.dob}
          onChange={(e) =>
            setUserDetails({ ...userDetails, dob: e.target.value })
          }
          placeholder="DOB"
        /> */}
        </div>
        {/* Aadhar Card */}

        <div className="flex-col items-center justify-start">
          <label
            htmlFor="adminAadharCard"
            className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
          >
            Aadhar Card
          </label>
          <input
            className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            maxLength={12}
            id="adminAadharCard"
            name="adminAadharCard"
            value={userDetails.aadharCard}
            onChange={(e) =>
              setUserDetails({ ...userDetails, aadharCard: e.target.value })
            }
            placeholder="Aadhar Card Number"
          />
        </div>
        {/* Upload Aadhar */}

        <div className="flex-col mb-4">
          {aadharPreview && (
            <img
              src={aadharPreview}
              alt="Aadhar Preview"
              className="mt-2 mx-auto h-32 object-cover"
            />
          )}
          <label className="cursor-pointer">
            <div className="bg-white py-2 h-[4rem]  text-black text-center flex justify-between items-center px-3">
              <div className="mx-auto w-full text-center flex justify-center items-center h-full border-2 border-solid border-black">
                {userDetails.uploadAadharCard
                  ? userDetails.uploadAadharCard.name
                  : "Upload Aadhar Card"}
              </div>
              <div className="w-[30%] bg-[#0077B6] h-full flex justify-center items-center text-white">
                Select File
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "aadhar")}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="flex-col items-center justify-start mt-2">
          <label
            htmlFor="adminPanCard"
            className="w-1/3 text-gray-700 text-left  font-mulish font-bold text-md leading-tight"
          >
            PAN Card
          </label>
          <input
            className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            maxLength={10}
            id="adminPanCard"
            name="adminPanCard"
            value={userDetails.panCard}
            onChange={(e) =>
              setUserDetails({ ...userDetails, panCard: e.target.value })
            }
            placeholder="Pan Card Number"
          />
        </div>
        <div className="flex-col mb-4">
          {panPreview && (
            <img
              src={panPreview}
              alt="PAN Preview"
              className="mt-2 mx-auto h-32 object-cover"
            />
          )}
          <label className="cursor-pointer">
            <div className="bg-white py-2 h-[4rem]  text-black text-center flex justify-between items-center px-3">
              <div className="mx-auto w-full text-center flex justify-center items-center h-full border-2 border-solid border-black">
                {userDetails.uploadPanCard
                  ? userDetails.uploadPanCard.name
                  : "Upload PAN Card"}
              </div>
              <div className="w-[30%] bg-[#0077B6] h-full flex justify-center items-center text-white">
                Select File
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "pan")}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* addresses */}

        <div className="flex flex-col gap-2">
          <label className="text-xl mt-5">Address</label>
          {/* line 1 */}
          <input
            className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAddressLine1"
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
          <StateDropdown
            label={"Select State"}
            value={userDetails.address.line2}
            onChange={(e: any) =>
              setUserDetails({
                ...userDetails,
                address: {
                  ...userDetails.address,
                  line2: e.target.value,
                },
              })
            }
          />
          {/* line 2 */}
          {/* <input
          className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          id="adminAddressLine2"
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
        /> */}

          {/* city */}
          <div className="w-2/3">
            <input
              className="w-full px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              id="adminAddressCity"
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
          </div>
          {/* pinCode */}
          <div className="w-1/2">
            <input
              className="w-32 px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              id="adminAddressPinCode"
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
        </div>
        <div className="flex flex-row gap-30   -col items-center justify-between">
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
    </div>
  );
};