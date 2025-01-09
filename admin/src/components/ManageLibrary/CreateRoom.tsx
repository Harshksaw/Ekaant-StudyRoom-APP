import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
// import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { GiEntryDoor } from "react-icons/gi";
import { HiOutlineSave } from "react-icons/hi";

import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";
import { getLibraryDataById } from "@/hooks/libraryData";
import { TbAirConditioning } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";

const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [libraryData, setLibraryData] = React.useState<any[]>([]);
  const [seatLayout, setSeatLayout] = React.useState({});

  const [loading, setLoading] = useState(false); // Step 1: Loading state
  // const [rooms, setRooms] = useState([]);
  const [progress, setProgress] = React.useState(13);
  const [selectedRoom, setSelectedRoom] = useState(0);

  const [selectedLibrary, setSelectedLibrary] = useState<any>(null);
  const [timeSlots, setTimeSlots] = useState<any[]>([
    { from: null, to: null, price: "" },
    { from: null, to: null, price: "" },
    { from: null, to: null, price: "" },
    { from: null, to: null, price: "" },
    { from: null, to: null, price: "" },
  ]);

  const [Ac, setAc] = useState(false);

  const [autoFill24Hr, setAutoFill24Hr] = useState(false);
  const [price24Hr, setPrice24Hr] = useState<string>("");
  const doorData = ["Left", "Left-Middle", "Middle", "Right-Middle", "Right"];

  const [doorPositions, setDoorPositions] = useState([0, 1, 0, 0, 0]);

  const handleSelectPosition = (index: number) => {
    const newPositions = doorPositions.map((pos, i) => (i === index ? 1 : 0));
    setDoorPositions(newPositions);
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await getLibraryDataById();
        // console.log(response.data.data, "--------");
        setLibraryData(response.data.data);
        setSelectedRoom(response.data.data?.rooms);
      } catch (error) {
        console.error("Error fetching library:", error);
        // Handle error
      }
    };
    fetchLibrary();
  }, []);

  useEffect(() => {
    // console.log(libraryData, "00000")
    const libraryObject = libraryData.find(
      (library) => library?.id === parseInt(libraryId)
    );

    setSelectedLibrary(libraryObject);
  }, [libraryId]);

  const handleSeatSelect = (seat: any) => {
    toast.success("Seat layout saved");
    setSeatLayout(seat);
  };
  const handleTimeChange = (index: any, type: any, newValue: any) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
    // console.log(updatedTimeSlots);
  };

  const handleLibraryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLibraryId(event.target.value);
    console.log(
      "🚀 ~ handleLibraryChange ~ event.target.value:",
      event.target.value
    );
  };

  function handlePriceChange(index: any, newValue: any) {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index].price = newValue;
    setTimeSlots(updatedTimeSlots); // Update your state with the new timeSlots array
  }

  const createRoom = async () => {
    const formattedTimeSlots = timeSlots.map((timeSlot) => ({
      ...timeSlot,
      from: timeSlot.from ? dayjs(timeSlot.from).format("hh:mm A") : null,
      to: timeSlot.to ? dayjs(timeSlot.to).format("hh:mm A") : null,
    }));

    try {
      if (!libraryId) {
        toast.error("Please select a library");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createRoom`,
        {
          libraryId: libraryId,

          seatLayout: seatLayout,
          timeSlot: formattedTimeSlots,

          ac: Ac,
          doorPositions: doorPositions,
        }
      );
      console.log(seatLayout, typeof seatLayout);
      console.log(response.data, "Room Created");
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

  const handleSubmit = async () => {
    console.log(price24Hr);
    try {
      if (autoFill24Hr && (price24Hr === null || price24Hr <= 0)) {
        alert("Please enter a valid price for the 24-hour time slot.");
        return;
      }
      if (!libraryId) {
        toast.error("Please relogin, NO library Exists");
      }
      if (Object.keys(seatLayout).length === 0) {
        toast.error("Please select a seat layout and save it!");
        return;
      }

      const filledTimeSlots = timeSlots.filter(
        (timeSlot) => timeSlot.from || timeSlot.to
      );
      if (
        filledTimeSlots.length > 0 &&
        filledTimeSlots.some((timeSlot) => !timeSlot.from || !timeSlot.to)
      ) {
        toast.error("Please select a time range for all filled time slots");
        return;
      }

      await createRoom();

      // await addDetails();
      toast.success("Room Created/updated Successfully");
      // window.location.reload();
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  React.useEffect(() => {
    if (
      timeSlots.some((slot) => slot.from === "00:00" && slot.to === "23:59")
    ) {
      setTimeSlots([
        {
          from: "00:00",
          to: "23:59",
          price: timeSlots.find(
            (slot) => slot.from === "00:00" && slot.to === "23:59"
          ).price,
        },
      ]);
    }
  }, [timeSlots]);
  if (loading) {
    return <Progress value={progress} className="w-[60%]" />;
  }

  const handleAutoFill24HrChange = () => {
    if (+price24Hr <= 0) {
      toast.error("Fill the price for 24 hr first");
      return;
    }
    setAutoFill24Hr(!autoFill24Hr);
    if (!autoFill24Hr) {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[4] = {
        from: dayjs().startOf("day"),
        to: dayjs().endOf("day"),
        price: price24Hr,
      }; // Set 24-hour period
      setTimeSlots(updatedTimeSlots);
    } else {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[4] = { from: null, to: null, price: 0 }; // Reset the fifth time slot
      setTimeSlots(updatedTimeSlots);
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 items-center min-h-screen p-5">
      <div className="w-full flex items-end gap-[1rem]">
        <div className="w-2/4">
          <label
            htmlFor="library"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Library
          </label>
          <select
            value={libraryId}
            onChange={(e) => handleLibraryChange(e)}
            id="library"
            className="bg-gray-50 h-[2.5rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {libraryData &&
              libraryData?.map((library: any) => (
                <option
                  key={library.id}
                  value={library.id}
                  className="bg-gray-500  rounded-lg mt-2 mb-5  p-10"
                >
                  {library.name}
                </option>
              ))}
          </select>
        </div>
        <label
          className={`flex justify-center gap-3 items-center px-5 h-[2.5rem] border-[1.4px] cursor-pointer ${
            Ac
              ? "border-blue-500 bg-blue-50 text-blue-500"
              : "border-neutral-500 bg-white"
          }`}
        >
          <input
            type="checkbox"
            checked={Ac}
            hidden
            onChange={() => setAc(!Ac)}
          />
          <TbAirConditioning />
          <span className="text-md">AC</span>
        </label>
        <div
          className={`flex justify-center items-center px-5 h-[2.5rem] border-[1.4px] cursor-pointer border-blue-500 bg-blue-50 text-blue-500 gap-3`}
        >
          <IoBedOutline />
          <span>Room Number: </span>
          <span className="text-lg bg-blue-600 px-5 rounded text-white">
            {selectedLibrary?.rooms ? selectedLibrary?.rooms.length + 1 : "1"}
          </span>
        </div>
      </div>

      <Seats onSeatSelect={handleSeatSelect} />

      {!!Object.keys(seatLayout).length && (
        <>
          <div className="flex justify-center rounded-lg flex-col w-full">
            <h2 className="text-xl font-semibold mb-4">
              Create Seating Layout
            </h2>

            <div className="door-layout flex space-x-4">
              {doorPositions.map((position, index) => (
                <button
                  key={index}
                  className={`door-position px-4 py-2 rounded-md transition-all ${
                    position == 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  onClick={() => handleSelectPosition(index)}
                >
                  <GiEntryDoor className="inline-block mr-2" />

                  {doorData[index]}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mt-10">
            <h2 className="text-xl font-semibold mb-4">Create Slots</h2>
            <div className="flex items-center gap-10 mb-5">
              <label className=" flex flex-row justify-center items-center gap-5">
                Price:
                <input
                  type="number"
                  value={price24Hr}
                  onChange={(e) => setPrice24Hr(e.target.value)}
                  required
                  placeholder="Enter Price"
                  className="!rounded-none"
                />
              </label>
              <label
                className={`flex justify-center gap-3 items-center px-5 h-[2.5rem] border-[1.4px] cursor-pointer ${
                  autoFill24Hr
                    ? "border-blue-500 bg-blue-50 text-blue-500"
                    : "border-neutral-500 bg-white"
                }`}
              >
                <input
                  className="mr-2 text-2xl "
                  type="checkbox"
                  // hidden
                  checked={autoFill24Hr}
                  onChange={handleAutoFill24HrChange}
                />
                <h2 className="text-xl">Auto-fill 24-hour Time Slot</h2>
              </label>
            </div>

            {timeSlots.map((timeRange, index) => (
              <div className="flex justify-center mt-2 gap-2" key={index}>
                <TimePicker
                  label="From"
                  className="w-1/3"
                  value={timeRange.from}
                  onChange={(newValue) =>
                    handleTimeChange(index, "from", newValue)
                  }
                />
                <TimePicker
                  label="To"
                  className="w-1/3"
                  value={timeRange.to}
                  onChange={(newValue) =>
                    handleTimeChange(index, "to", newValue)
                  }
                />
                <input
                  type="number"
                  className="form-input !rounded !w-[30rem]"
                  value={timeRange.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                  placeholder="Enter Price"
                />
              </div>
            ))}
          </div>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`mt-4 bg-blue-500 flex items-center gap-4 rounded text-white px-4 py-2
                        disabled:cursor-not-allowed disabled:opacity-80
                        `}
          >
            <HiOutlineSave /> {loading ? "Submitting..." : "Submit"}
          </button>
        </>
      )}
    </div>
  );
};

export default CreateRoom;
