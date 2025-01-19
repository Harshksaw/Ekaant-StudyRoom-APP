import { BASEURL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Function to fetch all library bookings
const fetchLibraryBookings = async (id: string) => {
  console.log("🚀 ~ fetchLibraryBookings ~ id:", id);
  try {
    const response = await axios.post(
      `${BASEURL}/api/v1/booking/getBookingByLibId`,
      {
        lib_id: id,
      }
    );
    console.log("🚀 ~ fetchLibraryBookings ~ response", response.data.data);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
};

// Component to display bookings
const LibraryBookings = () => {
  const { id } = useParams<{ id: string }>();
  const [librarybookings, setLibraryBookings] = useState<any[]>([]);

  useEffect(() => {
    const getBookings = async () => {
      if (id) {
        const bookings = await fetchLibraryBookings(id);
        setLibraryBookings(bookings);
      }
    };
    getBookings();
  }, [id]);

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
     
     <h1 className="text-2xl ">Bookings</h1>
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

export default LibraryBookings;
