import { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../lib/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    setBookingData({ name: '', email: '', phoneNumber: '', month: '', timeSlot: '' }); // Clear previous booking data
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
const bookSeat = async (seatId: string, bookingData: any) => {
  try {

    toast.loading('Booking seat...');

    const adminId = await localStorage.getItem("userId");
  const response = await axios.post(`${BASEURL}/api/v1/booking/adminBooking`, {
    libraryId:parseInt( selectedLibrary),
    adminId: parseInt(adminId),

    seatId,


    roomNo: parseInt(selectedRoom),
    name: bookingData.name,
    email: bookingData.email,
    phoneNumber: bookingData.phoneNumber,
    month: bookingData.month,
    timeSlot: parseInt(bookingData.timeSlot),

  });
  toast.dismiss()
  setSelectedRoom(null)
  setSelectedLibrary(null)

    return response.data.data;

  } catch (error) {
    toast.dismiss()

    toast.error('Error booking seat', error.response ? error.response.data : error.message, {
      autoClose: 5000,
    });
    console.error("Error booking seat:", error);
    return null;
  }
}
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await bookSeat(selectedSeat.id, bookingData);
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
      {/* <div className="text-xl mb-4">Bookings</div>
      <div className="overflow-y-auto max-h-96">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Booked Seat</th>
              <th className="py-2 px-4 border-b">Booking Date</th>
              <th className="py-2 px-4 border-b">Period/Months</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Room No</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Booked For</th>
            </tr>
          </thead>
          <tbody>
            {librarybookings.map((item: any) => (
              <tr key={item?.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{item?.userId.username}</td>
                <td className="py-2 px-4 border-b">
                  label - {item?.bookedSeat?.seatLabel}
                </td>
                <td className="py-2 px-4 border-b">
                  {item?.bookingDate.slice(0, 10)}
                </td>
                <td className="py-2 px-4 border-b">{item?.bookingPeriod}</td>
                <td className="py-2 px-4 border-b">
                  {item?.timeSlotDetails.map((slot: any, index: number) => (
                    <div key={index}>
                      {slot.from} - {slot.to}
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">{item?.roomNo}</td>
                <td className="py-2 px-4 border-b">Rs{item?.finalPrice}</td>
                <td className="py-2 px-4 border-b">
                  {item?.forFriend
                    ? `${item?.forFriend?.name}  (Friend)`
                    : `${item?.userId.username}(SELF)`}
                  {item?.forFriend
                    ? `Booked By (${item?.userId.username})`
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

<div className="flex flex-col items-center justify-center h-[80vh]  text-center">
     
     <h1 className="text-2xl ">Booki</h1>
               <p className="text-xl md:text-6xl font-bold  mb-8">
               Coming Soon!
               </p>
           <div
             className="w-32 h-32 md:w-40 md:h-40 bg-blue-500 rounded-full flex items-center justify-center animate-pulse"
           >
             <span className="text-white font-bold text-lg"></span>
           </div>
         </div>
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