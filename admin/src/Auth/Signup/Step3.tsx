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
        </div>

        {/* Date of Birth */}
        <div className="flex-col items-center justify-start mt-2">
          <label htmlFor="" className="font-semibold">
            Date of Birth:
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
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            id="adminAadharCard"
            name="adminAadharCard"
            value={userDetails.aadharCard}
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
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            type="text"
            maxLength={10}
            minLength={10}
            id="adminPanCard"
            name="adminPanCard"
            value={userDetails.panCard}
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
            <label className="font-bold">City:</label>
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
            <label className="font-bold">Pincode:</label>
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
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
