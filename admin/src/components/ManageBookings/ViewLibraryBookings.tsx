import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../lib/utils";
import { toast } from "react-toastify";
import { Navigate, Router, useNavigate } from "react-router-dom";

const fetchLibraries = async () => {
  try {
    const adminId = localStorage.getItem("userId");
    const response = await axios.post(`${BASEURL}/api/v1/library/getAdminLibraries`, {
      userId: adminId,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching libraries:", error);
    return [];
  }
};

// Function to fetch rooms by library ID
const fetchRoomsByLibraryId = async (libraryId: string) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/library/getLibraryById`, { id: libraryId });
    console.log("🚀 ~ fetchRoomsByLibraryId ~ response.data.data:", response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

// Function to fetch seats by room ID
// const fetchSeatsByRoomId = async (roomId: string) => {
//   try {
//     const response = await axios.post(`${BASEURL}/api/v1/seat/getSeatsByRoomId`, { roomId });
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching seats:", error);
//     return [];
//   }
// };

// Component to display bookings
const LibraryBookings = () => {
  const [libraries, setLibraries] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);

  const [seats, setSeats] = useState<any[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  console.log("🚀 ~ LibraryBookings ~ selectedSeat:", selectedSeat)
  const [bookingData, setBookingData] = useState<any>({ name: '', email: '', phoneNumber: '', month: '', timeSlot: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getLibraries = async () => {
      const libraries = await fetchLibraries();
      setLibraries(libraries);
    };
    getLibraries();
  }, []);

  useEffect(() => {
    if (selectedLibrary) {
      const getRooms = async () => {
        const rooms = await fetchRoomsByLibraryId(selectedLibrary);

        if(rooms.rooms.length === 0) {
          toast.error('No rooms found for this library');
          setTimeout(() => {
            toast.info('create room') 
            navigate('/manage-library/create-room')

          }, 3000);
          return;
        }
        setRooms(rooms.rooms);
      };
      getRooms();
    }
  }, [selectedLibrary]);

  useEffect(() => {
    if (selectedRoom) {
      const getSeats = async () => {
        const room = rooms.find((room) => room.id == selectedRoom);
        const seats = room ? room.seats : [];
        console.log("🚀 ~ getSeats ~ seats:", seats)
        setSeats(seats);
      };
      getSeats();
    }
  }, [selectedRoom]);

  const handleBookSeat = (seat: any) => {
    setSelectedSeat(seat);
    setIsModalOpen(true);
  };
  

  const handleUnbookSeat = async (seatId: string) => {
    try {
      // await unbookSeat(seatId);
      toast.success('Seat unbooked successfully');
      // Refresh seats
      // const seats = await fetchSeatsByRoomId(selectedRoom!);
      setSeats(seats);
    } catch (error) {
      toast.error('Error unbooking seat');
    }
  };
  const getSeatMatrix = () => {
    if (!seats || seats.length === 0) return [];

    const maxRow = Math.max(...seats.map((seat) => parseInt(seat.seatId.split('-')[0])));
    const maxCol = Math.max(...seats.map((seat) => parseInt(seat.seatId.split('-')[1])));

    const matrix = Array.from({ length: maxRow + 1 }, () => Array(maxCol + 1).fill(null));

    seats.forEach((seat) => {
      const [row, col] = seat.seatId.split('-').map(Number);
      matrix[row][col] = seat;
    });

    return matrix;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await bookSeat(selectedSeat.id, bookingData);
      toast.success('Seat booked successfully');
      setIsModalOpen(false);
      // Refresh seats
      // const seats = await fetchSeatsByRoomId(selectedRoom!);
      setSeats(seats);
    } catch (error) {
      toast.error('Error booking seat');
    }
  };

  return (
    <div className="flex-1 min-h-96 justify-center flex-col p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="library">
          Select Library
        </label>
        <select
          id="library"
          value={selectedLibrary || ""}
          onChange={(e) => setSelectedLibrary(e.target.value)}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>Select a library</option>
          {libraries.map((library) => (
            <option key={library.id} value={library.id}>
              {library.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLibrary && (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="room">
            Select Room
          </label>
          <select
            id="room"
            value={selectedRoom || ""}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="block appearance-none w-full bg-white border
             border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow 
             leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room No: {room.roomNo}
              </option>
            ))}
          </select>
        </div>
      )}

{selectedRoom && (
        <div className="mt-4 bg-blue-50 rounded-md">
          <h2 className="text-xl font-bold mb-4 text-center ">Seat Layout</h2>
            <div className="overflow-x-auto"></div>
            {getSeatMatrix().map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 justify-center overflow-auto  ">
              {row.map((seat, colIndex) => (
                <div key={colIndex} className={`border p-4 h-32 m-5 w-32 flex flex-col items-center justify-center rounded-md border-black ${!seat ? 'invisible' : ''}`}>
                {seat ? (
                <>
                <p className="font-bold">Seat: {seat.seatLabel}</p>
                <p className="text-sm">Booked: {seat.timeSlots[0].booked ? "Yes" : "No"}</p>
                {seat.timeSlots[0].booked ? (
                  <button
                  onClick={() => handleUnbookSeat(seat.id)}
                  className="px-4 py-2 mt-2 bg-red-500 text-white rounded"
                  >
                  Unbook
                  </button>
                ) : (
                  <button
                  onClick={() => handleBookSeat(seat)}
                  className="px-4 py-2 mt-2 bg-green-500 text-white rounded"
                  >
                  Book
                  </button>
                )}
                </>
                ) : (
                <div className="border p-4"></div>
                )}
                </div>
              ))}
              </div>
            ))}
            </div>

      )}

<CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBookingSubmit}
        bookingData={bookingData}
        setBookingData={setBookingData}
        timeSlots={selectedSeat ? selectedSeat.timeSlots : []}
      />
    </div>
  );
};

const CustomModal = ({ isOpen, onClose, onSubmit, bookingData, setBookingData , timeSlots}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Book Seat</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={bookingData.name}
            onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={bookingData.email}
            onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={bookingData.phoneNumber}
            onChange={(e) => setBookingData({ ...bookingData, phoneNumber: e.target.value })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="month">
            Month
          </label>
          <select
            id="month"
            value={bookingData.month || ""}
            onChange={(e) => setBookingData({ ...bookingData, month: e.target.value })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="" disabled>Select a month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timeSlot">
            Time Slot
          </label>
          <select
            id="timeSlot"
            value={bookingData.timeSlot || ""}
            onChange={(e) => setBookingData({ ...bookingData, timeSlot: e.target.value })}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="" disabled>Select a time slot</option>
            {timeSlots.map((slot: any) => (
              <option key={slot.id} value={slot.id}>
                {slot.from} - {slot.to}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Book
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};


export default LibraryBookings;