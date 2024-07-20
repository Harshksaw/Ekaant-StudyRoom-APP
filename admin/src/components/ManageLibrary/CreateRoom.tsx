import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { toast } from "sonner";
const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [seatLayout, setSeatLayout] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [timeSlot, setTimeSlot] = React.useState("");
  const [location, setLocation] = React.useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state

  useEffect(() => { 
    const libraryId = localStorage.getItem("libraryId");
    if (libraryId) {
      setLibraryId(libraryId);
    }
  },[]);

  const [timeSlots, setTimeSlots] = useState([
    { from: null, to: null },
    { from: null, to: null },
    { from: null, to: null },
    { from: null, to: null },
  ]);

  const createRoom = async () => {
    try {
      setLoading(true); 
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createRoom`,
        {
          // libraryId:, //leave this we will figure or alter , we might have to send libraryId , when new  Admin is allwoed to create room
          seatLayout: seatLayout,
        }
      );

    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

  const addDetails = async () => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/v1/library/updateRoom`,
        {
          libraryId: libraryId,
          price: price,
          timeSlot: timeSlot,
          location: location,
        }
      );
      setLoading(false)
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

  const handleLocationSelect = (location: any) => {
    console.log("Selected Location:", location);
    setLocation(location);
  };

  const handleSeatSelect = (seat) => {
    // console.log(seat)

    setSeatLayout(seat);
    // console.log(seatLayout);
    // setSeatLayout((prev) => [...prev, seat]);
  };
  const handleTimeChange = (index, type, newValue) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
  };


  const handleSubmit = async () => {
    try {
      // if(!libraryId){
      //   toast.error("Please relogin, NO library Exists")
      // }
      
      const formattedTimeSlots = timeSlots.map((timeSlot) => ({
        ...timeSlot,
        from: timeSlot.from ? dayjs(timeSlot.from).format('hh:mm A') : null,
        to: timeSlot.to ? dayjs(timeSlot.to).format('hh:mm A') : null,
      }));

      console.log(formattedTimeSlots)
      console.log(seatLayout)
      // await createRoom();

      // await addDetails();
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };
  return (
    <div className="flex flex-col bg-gray-300  gap-y-20 overflow-y-scroll h-screen mb-20">


      <div className="mt-20  h-32">

        <h2 className="">Room N</h2>
        <Seats onSeatSelect={handleSeatSelect} />
      </div>

      <div className="w-[90%] mx-20 mt-20">
        <h2 className="text-center">Select Time Slots</h2>
        {timeSlots.map((timeRange, index) => (
          <div
            key={index}
            className="flex justify-evenly items-center bg-gray-200 p-2 rounded-lg mt-2 mb-5 rounded-xl"
          >
            <TimePicker
              label="From"
              value={timeRange.from}
              onChange={(newValue) => handleTimeChange(index, "from", newValue)}
            />
            <TimePicker
              label="To"
              value={timeRange.to}
              
              onChange={(newValue) => handleTimeChange(index, "to", newValue)}
            />
          </div>
        ))}
      </div>


      <div className="  h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div className="flex-col  h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
        <input
          type="number"
          placeholder="Price"
          className="border-2 border-gray-300 rounded-lg p-2"
          onChange={(e) => setPrice(e.target.value)}
        />
            <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Submitting...' : 'Submit'} {/* Step 3: Conditional rendering */}
        </button>
      </div>
      </div>
  

      


    </div>
  );
};

export default CreateRoom;
