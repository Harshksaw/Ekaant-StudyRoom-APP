import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../lib/utils";
import { toast } from "react-toastify";

// Function to fetch all libraries
const fetchLibraries = async () => {
  try {
    const response = await axios.get(`${BASEURL}/api/v1/library/getAllLibraries`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching libraries:", error);
    return [];
  }
};

// Function to fetch rooms by library ID
const fetchRoomsByLibraryId = async (libraryId: string) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/room/getRoomsByLibraryId`, { libraryId });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

// Function to fetch seats by room ID
const fetchSeatsByRoomId = async (roomId: string) => {
  try {
    const response = await axios.post(`${BASEURL}/api/v1/seat/getSeatsByRoomId`, { roomId });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
};

// Component to display bookings
const LibraryBookings = () => {
  const [libraries, setLibraries] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [seats, setSeats] = useState<any[]>([]);
  const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

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
        setRooms(rooms);
      };
      getRooms();
    }
  }, [selectedLibrary]);

  useEffect(() => {
    if (selectedRoom) {
      const getSeats = async () => {
        const seats = await fetchSeatsByRoomId(selectedRoom);
        setSeats(seats);
      };
      getSeats();
    }
  }, [selectedRoom]);

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
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">Seat Layout</h2>
          <div className="grid grid-cols-4 gap-4">
            {seats.map((seat) => (
              <div key={seat.id} className="border p-4">
                <p>Seat: {seat.seatLabel}</p>
                <p>Booked: {seat.booked ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryBookings;