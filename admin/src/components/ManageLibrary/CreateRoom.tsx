import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "@/lib/utils";
import LocationSelector from "./LocationSelector";
import Seats from "../seatinglayout/SeatLayout";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Progress } from "@/components/ui/progress"
import { toast } from "react-toastify";
import { getLibraryDataById } from "@/hooks/libraryData";


const CreateRoom: React.FC = () => {
  const [libraryId, setLibraryId] = React.useState("");
  const [libraryData, setLibraryData] = React.useState<any[]>([]);
  const [seatLayout, setSeatLayout] = React.useState({});

  const [location, setLocation] = React.useState(null);
  const [loading, setLoading] = useState(false); // Step 1: Loading state
  // const [rooms, setRooms] = useState([]);
  const [progress, setProgress] = React.useState(13)
  const [selectedRoom, setSelectedRoom] = useState(0);

  const [selectedLibrary, setSelectedLibrary] = useState<any>(null);
  const [timeSlots, setTimeSlots] = useState<any[]>([
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
    { from: null, to: null, price: 0 },
  ]);
  const [autoFill24Hr, setAutoFill24Hr] = useState(false);
  const [price24Hr, setPrice24Hr] = useState<number | null>(null);
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await getLibraryDataById();
        console.log(response.data.data);
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
    const libraryObject = libraryData.find(library => library?._id === libraryId);
    setSelectedLibrary(libraryObject);

  }, [libraryId]);



  const handleLocationSelect = (location: any) => {

    setLocation(location);
  };

  const handleSeatSelect = (seat: any) => {


    setSeatLayout(seat);
    // console.log(seatLayout);
    // setSeatLayout((prev) => [...prev, seat]);
  };
  const handleTimeChange = (index: any, type: any, newValue: any) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[index][type] = newValue;
    setTimeSlots(updatedTimeSlots);
    // console.log(updatedTimeSlots);
  };

  const handleLibraryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLibraryId(event.target.value);

    // setRooms(libraryData?.rooms)

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
    console.log("Creating Room", libraryId, seatLayout, selectedRoom, selectedLibrary);
    try {
      setLoading(true);
      const response = await axios.post(
        `${BASEURL}/api/v1/library/createRoom`,
        {
          libraryId: libraryId,

          seatLayout: seatLayout,
          timeSlot: formattedTimeSlots,
          location: location,
        }
      );
      console.log(seatLayout, typeof seatLayout)
      console.log(response.data, "Room Created");
    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };


  // const addDetails = async () => {

  //   const formattedTimeSlots = timeSlots.map((timeSlot) => ({
  //     ...timeSlot,
  //     from: timeSlot.from ? dayjs(timeSlot.from).format("hh:mm A") : null,
  //     to: timeSlot.to ? dayjs(timeSlot.to).format("hh:mm A") : null,
  //   }));

  //   console.log(formattedTimeSlots);
  //   // console.log(seatLayout);

  //   console.log("Adding Details", libraryId,  location);
  //   try {
  //        await axios.post(
  //       `${BASEURL}/api/v1/library/updateRoom`,
  //       {
  //         libraryId: libraryId,

  //         timeSlot: formattedTimeSlots,
  //         location: location,
  //       }
  //     );
  //     toast.success("Room Created/updated Successfully")
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error creating room:", error);
  //     // Handle error
  //   }
  // };




  const handleSubmit = async () => {
    try {
      if (autoFill24Hr && (price24Hr === null || price24Hr <= 0)) {
        alert("Please enter a valid price for the 24-hour time slot.");
        return;
      }
      if (!libraryId) {
        toast.error("Please relogin, NO library Exists")
      }
      if (Object.keys(seatLayout).length === 0) {
        toast.error("Please select a seat layout and save it!");
        return;
      }
      if (location === null) {
        toast.error("Please select a location");
        return;
      }
      const filledTimeSlots = timeSlots.filter((timeSlot) => timeSlot.from || timeSlot.to);
      if (filledTimeSlots.length > 0 && filledTimeSlots.some((timeSlot) => !timeSlot.from || !timeSlot.to)) {
        toast.error("Please select a time range for all filled time slots");
        return;
      }



      await createRoom();

      // await addDetails();
      toast.success("Room Created/updated Successfully")
      // window.location.reload();

    } catch (error) {
      console.error("Error creating room:", error);
      // Handle error
    }
  };
  // console.log(selectedRoom)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Progress value={progress} className="w-[60%]" />
  }

  const handleAutoFill24HrChange = ({price}:Number) => {
    setAutoFill24Hr(!autoFill24Hr);
    if (!autoFill24Hr) {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[4] = { from: dayjs().startOf('day'), to: dayjs().endOf('day'), price: price24Hr || 0 };// Set 24-hour period
      setTimeSlots(updatedTimeSlots);
    } else {
      const updatedTimeSlots = [...timeSlots];
      updatedTimeSlots[4] = { from: null, to: null, price: 0 }; // Reset the fifth time slot
      setTimeSlots(updatedTimeSlots);
    }
  };


  return (
    <div className="flex flex-col bg-gray-100 items-center  gap-y-25 overflow-y-scroll h-screen mb-20">
      <div className="mt-20 ">
        <select value={libraryId} onChange={handleLibraryChange}>
          <option value="">Select a Library</option>
          {libraryData?.map((library: any) => (
            <option
              key={library._id}
              value={library._id}
              className="bg-gray-500  rounded-lg mt-2 mb-5  p-10"
            >
              {library.name}
            </option>
          ))}
        </select>

      </div>
      <div className="mt-10 flex-col 
      justify-center items-center  gap-y-5
      ">
        <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', margin: '20px 10px' }}>
          You are creating Room no
          <span style={{ background: '#4CAF50', color: '#fff', padding: '5px 15px', borderRadius: '5px' }}>
            {selectedLibrary?.rooms.length + 1}
          </span>
        </h2>



      </div>

      <div className="mt-20 mb-48  h-[60vh] ">

        <Seats onSeatSelect={handleSeatSelect} />




      </div>

      <div className="w-[90%] mx-20 mt-60 flex flex-col  ">
      <h2 className="text-center bg-blue-200 p-2  rounded-md text-3xl">Select Time Slots</h2>
          <div className="flex  justify-center items-center gap-10 ">
          <label className="flex justify-center items-center ">
          <input
          className="mr-2 text-2xl "
            type="checkbox"
            checked={autoFill24Hr}
            onChange={handleAutoFill24HrChange}
          />
          <h2 className="text-2xl">

          Auto-fill 24-hour time slot
          </h2>
        </label>
        {autoFill24Hr && (
          <label className=" flex flex-row justify-center items-center gap-5">
            Price 
            <input
              type="number"
              value={price24Hr || ""}
              onChange={(e) => setPrice24Hr(Number(e.target.value))}
              required
            />
          </label>
        )}
          </div>

        {timeSlots.map((timeRange, index) => (
          <div className="flex-col  justify-center items-center">
            <div
              key={index}
              className="flex justify-evenly items-center bg-gray-200 p-2 mt-2 mb-5 rounded-xl"
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
            <div className="max-w-[30%] flex  flex-col  justify-center items-cente">

              <input
                type="number"
                className="form-input rounded-md ml-60"
                value={timeRange.price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
                placeholder="Price"
              />
            </div>
          </div>
        ))}
      </div>

      <div className=" w-full h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">
        <LocationSelector onLocationSelect={handleLocationSelect} />
      </div>
      <div className="flex-col  h-96 mt-20 mb-20 flex justify-center items-center rounded-lg">


        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit"}{" "}

          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
