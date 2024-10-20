
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASEURL } from '@/lib/utils';



const AdminBookings = ({ libraryId, roomNo }) => {
  const [seats, setSeats] = useState([]);
  const adminId = localStorage.getItem("userId");
  const [selectedLibrary, setSelectedLibrary] = useState('');
  const [Loading, setLoading] = useState(false);
  const [libraries, setLibraries] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [rooms, setRooms] = useState([]);

  const fetchSeats = async (roomNo) => {
    setSelectedRoom(roomNo);
    try {
      console.log("🚀 ~ fetchSeats ~ roomNo", rooms[roomNo-1])
      setLoading(true);
      if (selectedLibrary && roomNo) {
        try {

          // const response = await axios.get(`${BASEURL}/api/v1/library/${selectedLibrary}/room/${roomNo}/seats`);
          setSeats(rooms[roomNo -1].seatLayout);
        } catch (error) {
          console.error("Error fetching seats:", error);
        } finally {
          setLoading(false);
        }
      }


      
      // const response = await axios.get(`/api/library/${libraryId}/room/${roomNo}/seats`);
      // setSeats(response.data.seats);
      // if (response.status === 200) {
      //   setLoading(false);
      // }
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };
  useEffect(() => {
    // Fetch libraries data from the backend
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${BASEURL}/api/v1/library/getAdminLibraries`, {
          userId: adminId
        });

        setLibraries(response.data.data);
      } catch (error) {
        console.error("Error fetching libraries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, [adminId]);

  useEffect(() => {
    if (selectedLibrary) {
      const library = libraries.find(lib => lib._id === selectedLibrary);
      if (library) {


        setRooms(library?.rooms);
      }
      console.log("🚀 ~ useEffect ~ library?.rooms:")
    }
  }, [selectedLibrary]);


  const bookSeat = async (seatId) => {
    try {
      const response = await axios.post("/api/bookSeat", {
        libraryId,
        roomNo,
        seatId,
        adminId,
      });
      toast.success(response.data.message);
      setSeats(seats.map(seat => seat.id === seatId ? { ...seat, booked: true, bookedBy: adminId, bookingSource: "admin" } : seat));
    } catch (error) {
      toast.error("Error booking seat");
      console.error("Error booking seat:", error);
    }
  };

  const removeSeatBooking = async (seatId) => {
    try {
      const response = await axios.post("/api/removeSeatBooking", {
        libraryId,
        roomNo,
        seatId,
      });
      toast.success(response.data.message);
      setSeats(seats.map(seat => seat.id === seatId ? { ...seat, booked: false, bookedBy: null, bookingSource: null } : seat));
    } catch (error) {
      toast.error("Error removing seat booking");
      console.error("Error removing seat booking:", error);
    }
  };


  if (Loading) {
    return <div className='
    flex justify-center items-center text-2xl font-bold text-gray-800'>Loading...</div>

  }

  const groupedSeats = seats.reduce((acc, seat) => {
    const [row, col] = seat.id.split('-').map(Number);
    if (!acc[row]) acc[row] = [];
    acc[row][col] = seat;
    return acc;
  }, {});

  return (
    <div className='w-full h-full flex-1 '>
      <h2>Seat Management</h2>

      <div className='flex justify-center items-center gap-10 bg-blue-100 self-center w-auto rounded-md mb-10'>
        <label htmlFor="librarySelect">Select Library:</label>
        <select
          id="librarySelect"
          value={selectedLibrary}
          onChange={(e) => setSelectedLibrary(e.target.value)}
        >
          <option value="">Select a library</option>

          {libraries?.map(library => (
            <option key={library?._id} value={library?._id}>
              {library?.name}
            </option>
          ))}
        </select>

      </div>

      {selectedLibrary && Object.keys(rooms).length > 0 && (
        <div className="flex justify-center items-center gap-10 bg-blue-100 self-center w-auto rounded-md p-4 mt-4">
          <label htmlFor="roomSelect">Select Room:</label>
          <select
            id="roomSelect"
            value={selectedRoom}
            onChange={(e) => fetchSeats(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a room</option>
            {Object.values(rooms).map(room => (
              <option key={room?.roomNo} value={room?.roomNo}>
                Room {room?.roomNo}
              </option>
            ))}
          </select>
        </div>
      )}



      <div className="seats-container flex   justify-center  mt-20 w-full h-full">
      {selectedLibrary && selectedRoom && (
        <div>

          <div className="seats-container flex flex-col justify-between  gap-10">
          {Object.keys(groupedSeats).map(row => (
                <div key={row} className="flex mx-20   ">
                  {groupedSeats[row].map((seat, colIndex) => (
                    <div key={colIndex} className={`mx-5 seat ${seat.booked ? 'booked' : ''}  bg-blue-300
                    flex flex-col justify-center items-center w-25 h-25 border border-gray-800 rounded-2xl p-4

                    `}
                    
                    >
                      <span>Seat {seat.label}</span>
                      {seat.booked ? (
                        <button onClick={() => removeSeatBooking(seat.id)}>Remove Booking</button>
                      ) : (
                        <button onClick={() => bookSeat(seat.id)}>Book Seat</button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default AdminBookings;