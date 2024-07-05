import React, { useState, useEffect } from "react";
import Seats from "../seatinglayout/SeatLayout.tsx";
import { BASEURL } from "@/lib/utils.ts";
import LocationSelector from "./LocationSelector.tsx";
import axios from "axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// libraryOwner,
//       name,
//       description,

//       location,
//       price,

//       amenities,
//       seatLayout,
const CreateLibrary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [shortDescription, setshortDescription] = useState("");
  const [longDescription, setlongDescription] = useState("");
  const [Amenities, setAmenities] = useState<string[]>([]); //wrong spelling amenities/
  const [price, setPrice] = useState(1000);
  const [location, setLocation] = useState(null);
  const [timeSlots, setTimeSlots] = useState([
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
  ]);
  const filledTimeSlots = timeSlots.filter((slot) => slot.from && slot.to);
  // const [seatBooked, setSeatBooked] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [seatLayout, setSeatLayout] = useState({});

  // const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.files);
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
    }
    console.log(uploadedFiles);
  };

  //@ts-ignore
  const handleSeatSelect = (seat) => {
    // console.log(seat)

    setSeatLayout(seat);
    // console.log(seatLayout);
    // setSeatLayout((prev) => [...prev, seat]);
  };

  useEffect(() => {
    console.log(seatLayout);
  }, [seatLayout]);

  function inputHeader(text: string) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text: string) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header: string, description: string) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const handleLocationSelect = (location: any) => {
    console.log("Selected Location:", location);
    setLocation(location);
  };

  const predefinedAmenities = [
    "Free WiFi",
    "Restrooms",
    "Study Rooms",
    "Computer Access",
    "Printing Services",
  ];

  const handleAmenityClick = (event: React.MouseEvent, amenity: string) => {
    event.preventDefault();
    if (Amenities.includes(amenity)) {
      setAmenities(Amenities?.filter((a) => a !== amenity));
    } else {
      setAmenities([...Amenities, amenity]);
    }
  };

  ///api call to backend to save the place library data
  const savePlace = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(uploadedFiles);

    const AdminId = await localStorage.getItem("userId");
    const LibraryDataOBJ = {
      libraryOwner: AdminId,
      name: title,
      shortDescription: shortDescription,
      longDescription: longDescription,
      location: location,
      price: price,
      amenities: Amenities,
      seatLayout: seatLayout,
      timeSlot: filledTimeSlots,
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
        setTitle("");
        setshortDescription("");
        setlongDescription("");
        setAmenities([]);
        setPrice(0);
        setLocation(null);
        setTimeSlots([
          { from: "", to: "" },
          { from: "", to: "" },
          { from: "", to: "" },
          { from: "", to: "" },
        ]);
        // setSeatBooked(null);
        setUploadedFiles([]);
        setSeatLayout({});
        // setImages([]);

        navigate(`/manage-library/my-library`);
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Error:"

      );
    }
  };

  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="m-2 relative w-full">
      {currentStep === 1 && (
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            maxLength={15}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title, for example: My lovely apt"
          />
          {title.length > 5 && (
            <div style={{ color: "red" }} className="flex flex-row  gap-20">
              {title.length}
              Your Title is too long. Only 15 words allowed.
            </div>
          )}
          {preInput(
            "Short Description",
            "Description that will be displayed on Card Listed"
          )}
          <input
            type="text"
            maxLength={50}
            value={shortDescription}
            onChange={(e) => setshortDescription(e.target.value)}
            placeholder="description"
          />
          {shortDescription.length > 30 && (
            <div style={{ color: "red" }} className="flex flex-row  gap-20">
              {shortDescription.length}
              Your description is too long. Only 50 words allowed.
            </div>
          )}
          {preInput(
            "long Description",
            "Description that will be displayed on the detail page of the library"
          )}
          <textarea
            minLength={50}
            maxLength={200}
            value={longDescription}
            onChange={(e) => setlongDescription(e.target.value)}
            placeholder="description of the library in detail "
          />
          {longDescription.length < 50 && (
            <div style={{ color: "red" }}>
              Your description is too short. Please provide more details.
            </div>
          )}

          <div className="">
            <h2>Select Time Slots</h2>
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                className="flex flex-row gap-10 bg-violet-500 justify-center p-2 m-2 rounded-sm items-center"
              >
                <label className="text-white font-bold">
                  Time Slot {index + 1}
                </label>
                <div>
                  {" "}
                  <input
                    type="text"
                    placeholder="From"
                    value={slot.from}
                    onChange={(e) =>
                      setTimeSlots(
                        timeSlots.map((s, idx) =>
                          idx === index ? { ...s, from: e.target.value } : s
                        )
                      )
                    }
                  />
                </div>
                <div>
                  {" "}
                  <input
                    type="text"
                    placeholder="To"
                    value={slot.to}
                    onChange={(e) =>
                      setTimeSlots(
                        timeSlots.map((s, idx) =>
                          idx === index ? { ...s, to: e.target.value } : s
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className=" bg-green-400 justify-center rounded-sm p-2 m-2">
            <h2>Select Amenities</h2>
            <div className="flex flex-row gap-10 bg-green-400 justify-center p-2 m-2 rounded-sm items-center">
              {predefinedAmenities.map((amenity) => (
                <button
                  key={amenity}
                  onClick={(e) => handleAmenityClick(e, amenity)}
                  style={{
                    margin: "5px",
                    padding: "5px",
                    borderRadius: 10,

                    backgroundColor: Amenities.includes(amenity)
                      ? "#FFFF00"
                      : "#add8ee",
                  }}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-10 bg-violet-400 justify-center p-2 m-2 rounded-sm items-center">
            <h2 className="mt-1 -mb-1">Price</h2>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <button
            type="button"
            onClick={goToNextStep}
            className="bg-blue-500  w-20 h-10 rounded-md absolute right-10  "
          >
            Next
          </button>
        </form>
      )}
      {currentStep === 2 && (
        <>
          <div>
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Photos (more = better)
            </label>
            <div className="m-10">
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
            </div>
            <div>
              <h3>Uploaded Files:</h3>
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <LocationSelector onLocationSelect={handleLocationSelect} />
          <div className="mt-20 bg-gray-200">
            <Seats onSeatSelect={handleSeatSelect} />
          </div>
          <button
            type="button"
            onClick={goToPreviousStep}
            className="bg-blue-500  w-20 h-10 rounded-md   "
          >
            Back
          </button>
        </>
      )}
      {title && shortDescription && longDescription && price ? (
        <div className="flex justify-center">
          <button
            className="rounded-lg  w-32   text-white bg-gradient-to-br  from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium  text-3xl py-5 text-center "
            onClick={() =>
              !loading &&
              savePlace({
                preventDefault: () => {},
              } as React.FormEvent<HTMLFormElement>)
            }
            disabled={loading}
            aria-label="Save library information"
          >
            {loading ? <Loader className="animate-spin h-10 w-10" /> : "Save"}
          </button>
        </div>
      ) : (
        <div className="m-10 p-5 ">
          <p className="text-red-500 align-center">
            Please fill all the fields
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateLibrary;
