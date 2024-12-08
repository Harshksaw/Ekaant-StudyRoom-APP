import { BASEURL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Function to fetch all library bookings
const fetchLibraryBookings = async (id:string) => {
  console.log("🚀 ~ fetchLibraryBookings ~ id:", id)
  try {

    const response = await axios.post(`${BASEURL}/api/v1/booking/getBookingByLibId`, {
        lib_id: id, 
    });
    console.log("🚀 ~ fetchLibraryBookings ~ response", response.data.data);



    return response.data.data;   
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
};

// Component to display bookings
const LibraryBookings = () => {
    const { id } = useParams<{ id: string }>();
    const [librarybookings, setLibraryBookings] = useState<any[]>([]);

  useEffect(() => {
    const getBookings = async () => {
        const bookings = await fetchLibraryBookings(id);
      setLibraryBookings(bookings);
    };
    getBookings();
  }, [id]);

  return (
    <div className="flex-1 min-h-96 justify-center flex-col">
      <div className="text-xl">Bookings</div>
      <div className="overflow-y-auto">
        {librarybookings.map((item: any) => (
          <div
            key={item?.id}
            className="flex flex-1 border border-gray-600 shadow-md shadow-green-500 p-2 m-2"
          >
            <div>
              <div className="mx-10 text-left flex flex-col">
                <h2 className="text-xl font-bold mb-2">{item?.name}</h2>
                <p className="p-2 shadow-red-200">
                  <strong>Booked Seat:</strong> id - {item?.bookedSeat.id}, label - {item?.bookedSeat?.label}
                </p>
                <p className="p-2 shadow-red-200">
                  <strong>Booking Date:</strong> {item?.bookingDate.slice(0, 10)}
                </p>
                <p className="p-2 shadow-red-200">
                  <strong>Period/Months:</strong> {item?.bookingPeriod}
                </p>
                <p className="p-2 shadow-red-200">
                  <strong>Room No:</strong> {item?.roomNo}
                </p>
                <p className="p-2 shadow-red-200">
                  <strong>Price:</strong> Rs{item?.finalPrice}
                </p>
              </div>
              <div>
                Booked for - {item?.forFriend 
                  ? `${item?.forFriend?.name}  (Friend)` 
                  : `${item?.userId.username}(SELF)`}
                {item?.forFriend ? `Booked By (${item?.userId.username})` : ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryBookings;