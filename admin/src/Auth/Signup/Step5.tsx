export const StepFive = ({ nextStep, prevStep, libraryDetails, setLibraryDetails }:any) => {
    //images  - Register 5

    const handleAmenityChange = (amenityKey, newValue) => {
        setLibraryDetails(prevDetails => ({
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
                        className="w-60 h-[50px] text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight border border-2"
                    >
                        Upload Pan Card
                    </label>


                    <label htmlFor="uploadAadharCard" className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
          text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
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
                                        uploadAadharCard: file,
                                    });
                                }
                            }}
                            style={{ display: 'none', justifyContent: 'center' }} // Hide the actual input
                        />
                    </label>
                </div>

            </div>

            <div className="flex-col flex  justify-start">
                <h2 className="text-md text-bold mb-5">Library Slider Images</h2>

                <div className="flex  items-center justify-start">


                    <label
                        htmlFor="uploadPanCard"
                        className="w-60 h-[50px] text-gray-700  border-black  py-2 text-left font-mulish font-bold text-md leading-tight border border-2"
                    >
                        Upload Pan Card
                    </label>


                    <label htmlFor="uploadAadharCard" className="block w-32 bg-[#0077B6] py-2  text-white  h-[50px] justify-center items-center
          text-center border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer">
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
                                        uploadAadharCard: file,
                                    });
                                }
                            }}
                            style={{ display: 'none', justifyContent: 'center' }} // Hide the actual input
                        />
                    </label>
                </div>
            </div>

            <div className="flex gap-10 w-32 items-center justify-start">
                <label
                    htmlFor="halls"
                    className="w-1/4 text-gray-700 text-left font-mulish font-bold text-md leading-tight"
                >
                    Halls
                </label>
                <input className="w-20 px-3 py-2  border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                <table>
                    <thead>
                        <tr>
                            <th>Amenities</th>
                            <th>Yes</th>
                            <th>No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(libraryDetails.amentities).map(([key, value]) => (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>
                                    <input
                                        type="radio"
                                        id={`${key}-yes`}
                                        name={key}
                                        value="yes"
                                        checked={value === true}
                                        onChange={() => handleAmenityChange(key, true)}
                                    />
                                    <label htmlFor={`${key}-yes`}>Yes</label>
                                </td>
                                <td>
                                    <input
                                        type="radio"
                                        id={`${key}-no`}
                                        name={key}
                                        value="no"
                                        checked={value === false}
                                        onChange={() => handleAmenityChange(key, false)}
                                    />
                                    <label htmlFor={`${key}-no`}>No</label>
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
                    className=" center  mt-1 bg-gradient-to-r from-sky-500 to-sky-300 text-white py-2 px-32 rounded-full"
                    onClick={nextStep}
                >
                    Next
                </button>
            </div>

        </div>



    )
}
