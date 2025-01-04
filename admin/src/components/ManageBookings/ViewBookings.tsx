
import { BASEURL } from "@/lib/utils";
import axios from "axios";
import React from "react";



const ViewBookings = () => {
  const [bookings, setBookings] = React.useState([null]);

  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {

      try {
        // const response = await getLibraryDataById();
        // console.log("🚀 ~ fetchBookings ~ response:", response)
        // const response = await getBookings();

        // getBookingByLibId
        // setBookings(response.data.data);

        const userId = localStorage.getItem("userId");
        // console.log("🚀 ~ fetchBookings ~ response", response.data.data[0]);

        const resp = await axios.post(
          `${BASEURL}/api/v1/booking/getBookingByLibId`,
          {
            userId : userId,
          }
        );

        console.log("🚀 ~ fetchBookings ~ resp",  resp.data.data);

        setBookings(resp.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Handle error
      }
    };

    fetchBookings();
  }, []);

  return (
    
    <div className="flex-1 h-full">
      {isLoading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="flex-col h-full">

           <div className="flex-1 min-h-96 justify-center flex-col p-4">
           <div className="text-xl mb-4">Bookings</div>
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
               {Object.entries(bookings).map(([key, item]: [string, any]) => (
                   <tr key={item?.id} className="hover:bg-gray-100">
                     <td className="py-2 px-4 border-b">{item?.userId.username}</td>
                     <td className="py-2 px-4 border-b">{item?.bookedSeat?.seatLabel}</td>
                     <td className="py-2 px-4 border-b">{item?.bookingDate.slice(0, 10)}</td>
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
           </div>
         </div>

        </div>
      )}
    </div>
  );
};

export default ViewBookings;
