export const StepFive = ({
  nextStep,
  prevStep,
  libraryDetails,
  setLibraryDetails,
}: any) => {
  //images  - Register 5

  const handleAmenityChange = (amenityKey, newValue) => {
    setLibraryDetails((prevDetails) => ({
      ...prevDetails,
      amentities: {
        ...prevDetails.amentities,
        [amenityKey]: newValue,
      },
    }));
  };

  return (
    <div className="flex  flex-1 flex-col gap-10  h-full overflow-y-auto px-10 py-6 bg-white rounded-lg">
      <div className="flex-col flex  gap-5  justify-start">
        <h2 className="text-md text-bold">Library Details</h2>

        <div className="flex  items-center justify-start">
          <label
            htmlFor="uploadPanCard"
            className="w-60 h-[50px] pl-1 flex items-center text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight  border-2"
          >
            Upload Library Card Image
          </label>

          <label
            htmlFor="uploadAadharCard"
            className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
          text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            Select File
            <input
              type="file"
              id="uploadAadharCard" // ID to be renamed - tofix
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setLibraryDetails({
                    ...libraryDetails,
                    librayCardImage: file, // these field doesnt exist in the state : tofix
                  });
                }
              }}
              style={{ display: "none", justifyContent: "center" }} // Hide the actual input
            />
          </label>
        </div>
      </div>

      <div className="flex-col flex  justify-start">
        <h2 className="text-md text-bold mb-5">Library Slider Images</h2>

        <div className="flex  items-center justify-start">
          <label
            htmlFor="uploadPanCard"
            className="w-60 h-[50px] pl-1 flex items-center text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight  border-2"
          >
            Upload Slider Images
          </label>

          <label
            htmlFor="uploadAadharCard"
            className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
          text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
          >
            Select File
            <input
              type="file"
              id="uploadAadharCard"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : null;
                if (file) {
                  setLibraryDetails({
                    ...libraryDetails,
                    uploadSliders: file, // tofix
                  });
                }
              }}
              style={{ display: "none", justifyContent: "center" }} // Hide the actual input
            />
          </label>
        </div>
      </div>

      <div
        className="flex flex-col gap-1 w-full
       items-center justify-start"
      >
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
          placeholder="DOB"
        />
      </div>
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
            {Object.entries(libraryDetails.amentities).map(([key, value]) => (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <input
                    type="radio"
                    id={`${key}-yes`}
                    name={key}
                    value="yes"
                    checked={value === true}
                    onChange={() => handleAmenityChange(key, true)}
                  />
                  <label htmlFor={`${key}-yes`} className="ml-2">
                    Yes
                  </label>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <input
                    type="radio"
                    id={`${key}-no`}
                    name={key}
                    value="no"
                    checked={value === false}
                    onChange={() => handleAmenityChange(key, false)}
                  />
                  <label htmlFor={`${key}-no`} className="ml-2">
                    No
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row gap-40   -col items-center justify-between">
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
  );
};
