import React from "react";
// import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "./Perks.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
// import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import LocationSelector from "./LocationSelector.tsx";
import Seats from "../seatinglayout/SeatLayout.tsx";
// import PhotosUploader from "./PhotosUploader.tsx";
// type Props = {};

const CreateLibrary = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const { id } = useParams();
  const [title, setTitle] = useState("");

  const [addedPhotos, setAddedPhotos] = useState([]);
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

  const [seatBooked, setSeatBooked] = useState([
    // Initial booked seats here
  ]);

  const [seatLayout, setSeatLayout] = useState([
    // Initial seat layout here
  ]);

  const handleSeatSelect = (seat) => {
    setSeatLayout([]);

    setSeatLayout((prev) => [...prev, seat]);
  };
  useEffect(() => {
    console.log(
      "------------------------------",
      seatLayout,
      location,
      "------------------------------"
    );
  }, [seatLayout, location]);

  // const [libraryData, setLibraryData] = useState({
  //   name: title,
  //   description:description,
  //   location: location ,
  //   price: price,

  //   timeSlots: timeSlots,

  // });

  // useEffect(() => {
  //   if (!id) {
  //     return;
  // //   }
  //   axios.get("/places/" + id).then((response) => {
  //     const { data } = response;
  //     setTitle(data.title);
  //     setdescription(data.description);
  //     setAddedPhotos(data.photos);
  //     setDescription(data.description);
  //     setPerks(data.perks);
  //     setExtraInfo(data.extraInfo);
  //     setCheckIn(data.checkIn);
  //     setCheckOut(data.checkOut);
  //     setMaxGuests(data.maxGuests);
  //     setPrice(data.price);
  //   });
  // }, [id]);
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

  // async function savePlace(e) {
  //   e.preentDefault();
  //   const placeData = {
  //     title,
  //     description,
  //     addedPhotos,
  //     description,
  //     price,
  //   };
  //   // if (id) {
  //   //   // update
  //   //   await axios.put("/places", {
  //   //     id,
  //   //     ...placeData,
  //   //   });
  //   //   setRedirect(true);
  //   // } else {
  //   //   // new place
  //   //   await axios.post("/places", placeData);
  //   //   setRedirect(true);
  //   // }
  // }

  // if (redirect) {
  //   // return <Navigate to={"/account/places"} />;
  // }
  const handleLocationSelect = (location) => {
    console.log("Selected Location:", location);
    setLocation(location);
    // Further processing or state updates with the selected location
  };


  const predefinedAmenities = [
    "Free WiFi",
    "Restrooms",
    "Study Rooms",
    "Computer Access",
    "Printing Services",
  ];

  // Step 4: Event handler to add/remove an amenity
  const handleAmenityClick = (event, amenity) => {
    event.preventDefault();
    if (amenties.includes(amenity)) {
      setAmenties(amenties.filter((a) => a !== amenity)); // Remove if already selected
    } else {
      setAmenties([...amenties, amenity]); // Add if not selected
    }
  };

  const savePlace = (event) => {
    event.preventDefault();
    // Save place logic here
    // After saving, you might want to navigate to the next step or show a success message
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
          {preInput("Photos", "more = better")}
          {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}

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
            {/* Other parts of your form */}
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
