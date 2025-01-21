import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-day-picker/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs"; // Import dayjs
import { TextField } from "@mui/material";
import StateDropdown from "@/components/StateSelector";

const currentDate = dayjs(); // Use dayjs to get the current date

export const StepThree = ({
  nextStep,
  prevStep,
  userDetails,
  setUserDetails,
}: any) => {
  const [aadharPreview, setAadharPreview] = useState<string | null>(null);
  const [panPreview, setPanPreview] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [preview, setPreview] = useState(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<any>({});
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      // Update user details and show success toast
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        passportPhoto: file,
      }));
      setPreview(URL.createObjectURL(file));
      toast.success("Passport photo uploaded successfully!");
    } else {
      toast.error("Failed to upload passport photo. Please try again.");
    }
  };

  console.log("u", userDetails);
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

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderColor: "black",

            "& .MuiOutlinedInput-root": {
              borderRadius: "2px",
              padding: "0px 20px",
              display: "flex",
              justifyContent: "center",
              gap: "77px",
              alignItems: "center",
              width: "100%",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "black",
                borderRadius: "14px",
              },
            },
            "& .MuiInputBase-input": {
              padding: "8px 0px",
            },
          },
        },
      },
    },
  });

  const validateForm = () => {
    const newErrors: any = {};

    // Validate full name
    if (!userDetails.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    // Validate date of birth
    if (!userDetails.dob) {
      newErrors.dob = "Date of birth is required";
    }

    // Validate Aadhar card
    if (!userDetails.aadharCard) {
      newErrors.aadharCard = "Aadhar Card is required";
    }

    // Validate PAN card
    if (!userDetails.panCard) {
      newErrors.panCard = "PAN Card is required";
    }

    // Validate address
    if (!userDetails.address.line1 ) {
      newErrors.address = "Address is required";
    } else {
      const { line1, city, pincode } = userDetails.address;

      if (!line1) {
        newErrors.addressLine1 = "Address Line 1 is required";
      }
      if (!city) {
        newErrors.addressCity = "City is required";
      }
      if (!pincode) {
        newErrors.addressPincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(pincode)) {
        newErrors.addressPincode = "Pincode must be a 6-digit number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      nextStep();
    }
  };
  return (
    <div className="flex flex-1 overflow-y-auto px-10 py-6 bg-white rounded-lg">
      <div className="flex-col w-full mb-100 gap-25">
        {/* Full Name */}
        <div className="flex-col items-center justify-start">
          <label
            htmlFor="adminFullName"
            className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
          >
            Full Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            className="w-full  px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminFullName"
            name="adminFullName"
            value={userDetails.fullName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, fullName: e.target.value })
            }
            placeholder="Full Name"
          />
          {errors.fullName && (
            <p className="text-red-500 ml-2">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="flex-col items-center justify-start mt-2">
          <label htmlFor="" className="font-semibold">
            Date of Birth:
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex mb-4 relative mt-2">
            <div>
              <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={userDetails.dob ? dayjs(userDetails.dob) : null}
                    onChange={handleDateChange}
                    minDate={dayjs("1950-01-01")}
                    maxDate={dayjs().subtract(18, "years")}
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onClick={() => setShowDatePicker(!showDatePicker)}
                        placeholder="MM/DD/YYYY"
                        fullWidth
                        value={
                          userDetails.dob
                            ? dayjs(userDetails.dob).format("MM/DD/YYYY")
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </div>
          </div>
          {errors.dob && (
            <p className="text-red-500 ml-2 -mt-3">{errors.dob}</p>
          )}
        </div>

        <div className="flex flex-col items-start justify-start mt-4">
          <label
            htmlFor="adminPassportPhoto"
            className="w-full text-gray-700 font-mulish font-bold text-md mb-2"
          >
            Passport Photo
            <span className="text-red-500 ml-1">*</span>
          </label>

          <label className="cursor-pointer">
            <div className="bg-white py-2 h-[4rem] text-black text-center flex justify-between items-center px-3">
              <div className=" w-full md:w-64  text-center flex justify-center items-center h-full border-2 border-solid border-black">
                Upload Passport Photo
              </div>
              <div className="w-[30%] bg-[#0077B6] h-full flex justify-center items-center text-white">
                Select File
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
            />
          </label>

          {preview && (
            <div className="mt-3">
              <p className="text-gray-600 text-sm mb-2">Preview:</p>
              <img
                src={preview}
                alt="Passport Preview"
                className="w-full h-64 max-h-64 border border-gray-300 rounded-md object-cover shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          )}
        </div>

        {/* Aadhar Card */}
        <div className="flex-col items-center justify-start">
          <label
            htmlFor="adminAadharCard"
            className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
          >
            Aadhar Card
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            required
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAadharCard"
            name="adminAadharCard"
            value={userDetails.aadharCard}
            onBlur={() => {
              if (userDetails.aadharCard.length !== 12) {
                // Show toast error when Aadhaar card is not 12 digits
                toast.error("Aadhaar Card number must be 12 digits long!");
              }
            }}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length <= 12) {
                setUserDetails({ ...userDetails, aadharCard: value });
              }
            }}
            maxLength={12}
            minLength={12}
            placeholder="Aadhar Card Number"
          />
          {errors.aadharCard && (
            <p className="text-red-500 ml-2">{errors.aadharCard}</p>
          )}
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
            <div className="bg-white py-2 h-[4rem] text-black text-center flex justify-between items-center px-3">
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

        {/* PAN Card */}
        <div className="flex-col items-center justify-start mt-2">
          <label
            htmlFor="adminPanCard"
            className="w-1/3 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
          >
            PAN Card
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            required
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            maxLength={10}
            minLength={10}
            id="adminPanCard"
            name="adminPanCard"
            value={userDetails.panCard}
            onBlur={() => {
              if (userDetails.panCard.length !== 10) {
                // Show toast error when PAN card is not 10 characters
                toast.error("PAN Card number must be exactly 10 characters!");
              }
            }}
            onChange={(e) => {
              const value = e.target.value
                .toUpperCase()
                .replace(/[^A-Za-z0-9]/g, "");
              if (value.length <= 10) {
                setUserDetails({ ...userDetails, panCard: value });
              }
            }}
            placeholder="Pan Card Number"
          />
          {errors.panCard && (
            <p className="text-red-500 ml-2">{errors.panCard}</p>
          )}
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
            <div className="bg-white py-2 h-[4rem] text-black text-center flex justify-between items-center px-3">
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

        {/* Address Fields */}
        <div className="flex flex-col gap-2">
          <label className="text-xl mt-5">
            Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          {/* line 1 */}
          <input
            required
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
        
          {errors.address.line1 && (
            <p className="text-red-500 ml-2">{errors.address.line1}</p>
          )}
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
            <label className="font-bold">
              City:
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              required
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
            {errors.address?.city && (
              <p className="text-red-500 ml-2">{errors.address.city}</p>
            )}
          </div>
          {/* pinCode */}
          <div className="w-1/2">
            <label className="font-bold">
              Pincode:
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              required
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
              {errors.pincode?.city && (
              <p className="text-red-500 ml-2">{errors.address.pincode}</p>
            )}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-row gap-30   -col items-center justify-between">
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
    </div>
  );
};
