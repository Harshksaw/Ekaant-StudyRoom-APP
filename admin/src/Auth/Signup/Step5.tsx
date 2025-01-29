// import { set } from "react-hook-form";

import { predefinedAmenities } from "@/utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";

export const StepFive = ({
  nextStep,
  prevStep,
  libraryDetails = {
    libraryCardImage: null,
    librarySliders: [],
    halls: 0,
    amenities: {},
  },
  setLibraryDetails,
  handleFileChange,
}: any) => {
  //images  - Register 5
  const [errors, setErrors] = useState<any>({});
  const [preview, setPreview] = useState<string | null>(null);
  const validate = () => {
    const newErrors: any = {};

    // Validate library card image
    if (!libraryDetails.libraryCardImage) {
      newErrors.libraryCardImage = "Please upload a library card image.";
    }

    // Validate library sliders
    if (
      !libraryDetails.librarySliders ||
      libraryDetails.librarySliders.length === 0
    ) {
      newErrors.librarySliders =
        "Please upload at least one library slider image.";
    }

    // Validate number of halls
    if (!libraryDetails.halls || libraryDetails.halls <= 0) {
      newErrors.halls = "Please provide a valid number of halls (at least 1).";
    }

    // Validate amenities
    const amenitiesValues = Object.values(libraryDetails.amenities || {});
    if (amenitiesValues.length === 0 || !amenitiesValues.includes(true)) {
      newErrors.amenities = "Please select at least one amenity.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleImgChange = (e: any) => {
    toast.loading("Uploading File...");
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Update libraryDetails and preview
      setLibraryDetails({
        ...libraryDetails,
        libraryCardImage: file,
      });

      // Create a preview of the image
      const fileURL = URL.createObjectURL(file);
      setPreview(fileURL);
    }
    toast.dismiss();
    toast.success("File Uploaded Successfully!");
  };

  const handleAmenityChange = (amenityKey: any, newValue: boolean) => {
    setLibraryDetails((prevDetails: any) => ({
      ...prevDetails,
      amenities: {
        ...prevDetails.amenities,
        [amenityKey]: newValue,
      },
    }));
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="flex  flex-1 flex-col gap-10  h-full overflow-y-auto px-10 py-6 bg-white rounded-lg">
      <div className="flex-col flex  gap-5  justify-start relative">
        <span className="text-red-600 absolute -top-3 left-28">*</span>
        <h2 className="text-md font-bold">Library Details</h2>

        <div className="flex  items-center justify-start">
          <label
            htmlFor="uploadLibraryCard"
            className="w-60 h-[50px] pl-1 flex rounded-l-xl items-center text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight  border-2"
          >
            Upload Library Card Image
          </label>

          <label
            // htmlFor="uploadAadharCard"
            className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
            text-center border border-gray-800 rounded-r-xl focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            Select File
            <input
              type="file"
              id="uploadLibraryCard" // ID to be renamed - tofix
              accept="image/*"
              multiple
              onChange={handleImgChange}
              style={{ display: "none", justifyContent: "center" }} // Hide the actual input
            />
          </label>
          {/* Preview Section */}
        </div>
        {preview && (
          <div className="mt-4">
            <p className="text-gray-700 font-mulish font-semibold text-md">
              Preview:
            </p>
            <img
              src={preview}
              alt="Library Card Preview"
              className="mt-2  object-cover border-2 border-gray-300 rounded-md"
            />
          </div>
        )}
        {errors.libraryCardImage && (
          <p className="text-red-500 text-sm -mt-3">
            {errors.libraryCardImage}
          </p>
        )}
      </div>

      <div className="flex-col  flex  justify-start relative">
        <span className="text-red-600 absolute -top-3 left-40">*</span>
        <h2 className="text-md font-bold mb-5">Library Slider Images</h2>

        <div>
          <div className="flex  items-center justify-start">
            <label
              htmlFor="uploadPanCard"
              className="w-60 h-[50px] pl-1 flex rounded-l-xl items-center text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight  border-2"
            >
              Upload Slider Images
            </label>

            <label
              htmlFor="uploadSliderImages"
              className="block w-32 bg-[#0077B6] py-2  rounded-r-xl text-white  h-[50px] justify-center items-center
            text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              Select File
              <input
                type="file"
                multiple
                id="uploadSliderImages"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none", justifyContent: "center" }} // Hide the actual input
              />
            </label>
          </div>

          <div className="w-full flex flex-col gap-2">
            <h3>Uploaded Files:</h3>
            <ul>
              {libraryDetails.librarySliders.map((file: any, index: any) => (
                <li key={index}>{file.name.slice(0, 35)}</li>
              ))}
            </ul>
          </div>
        </div>
        {errors.librarySliders && (
          <p className="text-red-500 text-sm mt-1">{errors.librarySliders}</p>
        )}
      </div>

      <div
        className="flex flex-col gap-1 w-full
        items-center justify-start relative"
      >
        <span className="text-red-600 absolute -top-3 left-32">*</span>

        <label
          htmlFor="halls"
          className="w-full text-gray-700 text-left font-mulish font-bold text-md leading-tight self-start"
        >
          Number. Of Halls
        </label>
        <input
          className="w-3/4 px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="number"
          id="halls"
          value={libraryDetails.halls}
          onChange={(e) =>
            setLibraryDetails({ ...libraryDetails, halls: e.target.value })
          }
          min={0}
          placeholder="10"
        />
      </div>
      {errors.halls && (
        <p className="text-red-500 text-sm -mt-8">{errors.halls}</p>
      )}
      <div className="flex gap-10 w-full items-center justify-start">
        <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
              >
                Amenities
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
              >
                Yes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-black-500 uppercase tracking-wider"
              >
                No
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {predefinedAmenities.map((amenity) => (
              <tr key={amenity}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {amenity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="radio"
                    name={amenity}
                    value="yes"
                    checked={libraryDetails.amenities?.[amenity] === true}
                    onChange={() => handleAmenityChange(amenity, true)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="radio"
                    name={amenity}
                    value="no"
                    checked={libraryDetails.amenities?.[amenity] === false}
                    onChange={() => handleAmenityChange(amenity, false)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errors.amenities && (
        <p className="text-red-500 text-sm -mt-5">{errors.amenities}</p>
      )}
      <div className="flex flex-row gap-40   -col items-center justify-between">
        <button
          className=" mt-1 bg-gradient-to-r from-sky-300 to-sky-400 text-white py-2 px-10 rounded-xl"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-16 rounded-xl"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
