import React, { useState, useEffect } from "react";
import Seats from "../seatinglayout/SeatLayout.tsx";
import { BASEURL } from "@/lib/utils.ts";
import LocationSelector from "./LocationSelector.tsx";
import axios from "axios";

const CreateLibrary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amenties, setAmenties] = useState([]);
  const [price, setPrice] = useState(100);
  const [location, setLocation] = useState(null);
  const [timeSlots, setTimeSlots] = useState([
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
    { from: "", to: "" },
  ]);
  const filledTimeSlots = timeSlots.filter((slot) => slot.from && slot.to);
  const [seatBooked, setSeatBooked] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [seatLayout, setSeatLayout] = useState(null);

  const [images, setImages] = useState([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(Array.from(event.target.files));
    }
  };

  const handleSeatSelect = (seat) => {
    setSeatLayout([]);
    setSeatLayout((prev) => [...prev, seat]);
  };

  useEffect(() => {
    console.log(seatLayout);
  }, [seatLayout]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const handleLocationSelect = (location) => {
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

  const handleAmenityClick = (event, amenity) => {
    event.preventDefault();
    if (amenties.includes(amenity)) {
      setAmenties(amenties.filter((a) => a !== amenity));
    } else {
      setAmenties([...amenties, amenity]);
    }
  };

  const savePlace = async (event) => {
    event.preventDefault();
    const files = event.target.images.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

    formData.append("name", JSON.stringify(title));
    formData.append("description", JSON.stringify(description));
    formData.append("location", JSON.stringify(location));
    formData.append("price", price.toString());
    formData.append("amenities", JSON.stringify(amenties));
    formData.append("seatLayout", JSON.stringify(seatLayout));
    formData.append("timeSlot", JSON.stringify(filledTimeSlots));

    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createLibrary`,
        formData
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
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
    <div className="m-2 ">
      {currentStep === 1 && (
        <form onSubmit={savePlace}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title, for example: My lovely apt"
          />
          {preInput("description", "description to this place")}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
          />

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
                    borderRadius: 10,
                    backgroundColor: amenties.includes(amenity)
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
              onChange={(e) => setPrice(e.target.value)}
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
            className="bg-blue-500  w-20 h-10 rounded-md absolute right-10  "
          >
            Back
          </button>
        </>
      )}
      {title && description && description && price ? (
        <div className="flex justify-center">
          <button
            className="bg-blue-300 w-20 h-5  rounded-md m-10 "
            onClick={savePlace}
          >
            Save
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
