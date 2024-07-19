import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [seatLayout, setSeatLayout] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [timeSlot, setTimeSlot] = React.useState("");
  const [location, setLocation] = React.useState(null);

  const [value, setValue] = React.useState<Date | null>();

  //@GourishMarkan same time in createlibrary , to select time
  const [timeSlots, setTimeSlots] = useState([
    { from: null, to: null },
    { from: null, to: null },
    { from: null, to: null },
    { from: null, to: null },
  ]);

  const createRoom = async () => {
    try {
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
    const updatedTimeSlots = [...TimeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="flex flex-col   gap-y-36 overflow-y-scroll h-screen mb-20">


      <div className="mt-20  h-32">
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
    </div>
  );
};

export default CreateRoom;
