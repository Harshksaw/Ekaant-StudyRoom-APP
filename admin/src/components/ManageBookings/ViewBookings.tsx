import { BASEURL } from "@/lib/utils";
import axios from "axios";
import React from "react";


const ViewBookings = () => {
  const [bookings, setBookings] = React.useState<any[]>([]); // Changed initial state to an empty array
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const resp = await axios.post(`${BASEURL}/api/v1/booking/getBookingByLibId`, {
          userId: userId,
        });

        console.log("🚀 ~ fetchBookings ~ resp", resp.data.data);
        setBookings(resp.data.data || []); // Ensure bookings is always an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="flex-1 h-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-full text-blue-500">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="overflow-y-auto flex-1 min-h-96 justify-center flex-col p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 h-full">
                <thead className="bg-white">
                  <tr>
                    <th className="py-2 px-4 border-b">Email/Phone Number</th>

                    <th className="py-2 px-4 border-b">Booked Seat</th>
                    <th className="py-2 px-4 border-b">Booking Date</th>
                    <th className="py-2 px-4 border-b">Months</th>
                    <th className="py-2 px-4 border-b w-2/12">Time</th>
                    <th className="py-2 px-4 border-b">Room No</th>
                    <th className="py-2 px-4 border-b">Price/(Payment Mode)</th>
                    <th className="py-2 px-4 border-b">Booked For</th>

                  </tr>
                </thead>
                <tbody className="text-gray-700 ">
                  {bookings.map((item: any, index: number) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">
                        <div title={item?.user?.email || "N/A"}>
                          {item?.user?.email ? item.user.email.length > 20 ? `${item.user.email.slice(0, 25)}...` : item.user.email : "N/A"}
                        </div>
                        <div>{item?.user?.phoneNumber || "N/A"}</div>
                      </td>
                      <td className="py-2 px-4 border-b text-center">{item?.bookedSeat?.seatLabel || "N/A"}</td>
                      <td className="py-2 px-4 border-b text-center">{item?.bookingDate?.slice(0, 10) || "N/A"}</td>
                      <td className="py-2 px-4 border-b text-center">{item?.bookingPeriod || "N/A"}</td>
                      <td className="py-2 px-4 border-b text-center">
                        {Array.isArray(item?.timeSlotDetails) ? (
                          <div>
                            {item?.timeSlotDetails.map((slot: any, idx: number) => (
                              <div key={idx}>
                                {slot?.from || "N/A"} - {slot?.to || "N/A"}
                              </div>
                            ))}
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="py-2 px-4 border-b text-center">{item?.roomNo || "N/A"}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <div>Rs {item?.finalPrice || "0"}</div>
                        <div>
                          {item.transactions[0]?.isOfflinePayment ? "Offline" : "Online"}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {item?.forFriend
                          ? `${item?.forFriend?.name || "N/A"} (Friend)`
                          : `${item?.user?.username || "SELF"} (SELF)`}
                        {item?.forFriend ? `Booked By (${item?.userId?.username || "N/A"})` : ""}
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
