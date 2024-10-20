import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASEURL } from '@/lib/utils';
import ClipLoader from 'react-spinners/ClipLoader';

interface Seat {
  id: string;
  label: string;
  booked: boolean;
  bookedBy?: string | null;
  bookingSource?: string | null;
}

interface Room {
  roomNo: number;
  seatLayout: Seat[];
}

interface Library {
  _id: string;
  name: string;
  rooms: Room[];
}

const AdminBookings = () => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const adminId = localStorage.getItem('userId');
  const [selectedLibrary, setSelectedLibrary] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | ''>('');
  const [rooms, setRooms] = useState<Room[]>([]);

  const fetchSeats = async (roomNo: number) => {
    setSelectedRoom(roomNo);
    try {
      console.log('🚀 ~ fetchSeats ~ roomNo', rooms[roomNo - 1]);
      setLoading(true);
      if (selectedLibrary && roomNo) {
        try {
          setSeats(rooms[roomNo - 1].seatLayout);
        } catch (error) {
          console.error('Error fetching seats:', error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${BASEURL}/api/v1/library/getAdminLibraries`, {
          userId: adminId,
        });

        setLibraries(response.data.data);
      } catch (error) {
        console.error('Error fetching libraries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, [adminId]);

  useEffect(() => {
    if (selectedLibrary) {
      const library = libraries.find((lib) => lib._id === selectedLibrary);
      if (library) {
        setRooms(library.rooms);
      }
      console.log('🚀 ~ useEffect ~ library?.rooms:');
    }
  }, [selectedLibrary, libraries]);

  const bookSeat = async (seatId: string, selectedRoom: number, label: string) => {
    setLoading(true);
    try {
      console.log('🚀 ~ bookSeat ~ seatId', selectedLibrary);
      const response = await axios.post(`${BASEURL}/api/v1/admin/bookSeat`, {
        libraryId: selectedLibrary,
        roomNo: selectedRoom,
        seatId,
        adminId,
        label,
      });
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, booked: true, bookedBy: adminId, bookingSource: 'admin' } : seat
        )
      );
      setLoading(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Error booking seat');
      console.error('Error booking seat:', error);
    }
  };

  const removeSeatBooking = async (seatId: string, selectedRoom: number) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASEURL}/api/v1/admin/removeSeatBooking`, {
        libraryId: selectedLibrary,
        roomNo: selectedRoom,
        seatId,
      });
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.id === seatId ? { ...seat, booked: false, bookedBy: null, bookingSource: null } : seat
        )
      );
      toast.success(response.data.message);
      setLoading(false);
    } catch (error) {
      toast.error('Error removing seat booking');
      console.error('Error removing seat booking:', error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ClipLoader color='#4A90E2' size={50} />
      </div>
    );
  }

  const groupedSeats: { [key: number]: Seat[] } = seats.reduce((acc, seat) => {
    const [row, col] = seat.id.split('-').map(Number);
    if (!acc[row]) acc[row] = [];
    acc[row][col] = { ...seat, id: seat.id };
    return acc;
  }, {} as { [key: number]: Seat[] });

  return (
    <div className='w-full h-full flex-1 '>
      <h2>Seat Management</h2>

      <div className='flex justify-center items-center gap-10 bg-blue-100 self-center w-auto rounded-md mb-10'>
        <label htmlFor='librarySelect'>Select Library:</label>
        <select
          id='librarySelect'
          value={selectedLibrary}
          onChange={(e) => setSelectedLibrary(e.target.value)}
        >
          <option value=''>Select a library</option>

          {libraries?.map((library) => (
            <option key={library?._id} value={library?._id}>
              {library?.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLibrary && rooms.length > 0 && (
        <div className='flex justify-center items-center gap-10 bg-blue-100 self-center w-auto rounded-md p-4 mt-4'>
          <label htmlFor='roomSelect'>Select Room:</label>
          <select
            id='roomSelect'
            value={selectedRoom}
            onChange={(e) => fetchSeats(Number(e.target.value))}
            className='p-2 border border-gray-300 rounded-md'
          >
            <option value=''>Select a room</option>
            {rooms.map((room) => (
              <option key={room?.roomNo} value={room?.roomNo}>
                Room {room?.roomNo}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className='seats-container flex justify-center mt-20 w-full h-full'>
        {selectedLibrary && selectedRoom && (
          <div>
            <div className='seats-container flex flex-col justify-between gap-10'>
              {Object.keys(groupedSeats).map((row) => (
                <div key={row} className='flex mx-20'>
                  {groupedSeats[Number(row)].map((seat, colIndex) => (
                    <div
                      key={colIndex}
                      className={`mx-5 seat ${seat.booked ? 'booked' : ''} bg-blue-300 flex flex-col justify-center items-center w-25 h-25 border border-gray-800 rounded-2xl p-4`}
                    >
                      <span>Seat {seat.label}</span>
                      {seat.booked ? (
                        <button onClick={() => removeSeatBooking(seat.id, selectedRoom)}>Remove Booking</button>
                      ) : (
                        <button onClick={() => bookSeat(seat.id, selectedRoom, seat.label)}>Book Seat</button>
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