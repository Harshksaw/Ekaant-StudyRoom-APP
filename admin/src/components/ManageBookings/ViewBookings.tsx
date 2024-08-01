import { getBookings, getLibraryDataById } from "@/hooks/libraryData";
import { BASEURL } from "@/lib/utils";
import axios from "axios";
import React from "react";

type Props = {};

const ViewBookings = (props: Props) => {
  const [bookings, setBookings] = React.useState([]);
  const [librarybookings, setLibraryBookings] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(true);
    const fetchBookings = async () => {
      try {
        const response = await getLibraryDataById();
        // const response = await getBookings();

        // getBookingByLibId
        setBookings(response.data.data);
        // console.log("🚀 ~ fetchBookings ~ response", response.data.data[0]._id);

        const resp = await axios.post(
          `${BASEURL}/api/v1/booking/getBookingByLibId`,
          {
            lib_id: response.data.data[0]._id,
          }
        );

        console.log("🚀 ~ fetchBookings ~ resp", resp.data);

        setLibraryBookings(resp.data.data);
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
        <div>Loading...</div>
      ) : (
        <div className="flex-col">
          {bookings.map((booking: any) => (
            <div
              key={booking?._id}
              className="flex flex-1 border border-gray-200 p-5 m-5"
            >
              <div className="w-1/5 h-1/5">
                <img src={booking?.images[0]} alt={booking?.name} />
              </div>

              <div className="mx-10">
                <h2>{booking?.name}</h2>
                {/* <p>{booking?.longDescription}</p> */}
                <p>
                  <strong>Address:</strong> {booking?.address?.line1},{" "}
                  {booking?.address?.city}, {booking?.address?.pincode}
                </p>
                <p>
                  <strong>Amenities:</strong> {booking?.amenities?.join(", ")}
                </p>
                <p>
                  <strong>Price:</strong> ${booking?.price}
                </p>
              </div>
            </div>
          ))}

          <div className="flex-1 min-h-96 justify-center flex-col">
            <div className="text-xl">Bookings </div>

            <div className="overflow-y-auto">
              {librarybookings.map((item: any) => (
                <div
                  key={item?.id}
               className="flex flex-1 border border-gray-600 shadow-md shadow-green-500 p-2 m-2 ">
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
                        ? `${item?.forFriend?.name}  (Friend)` : `${item?.userId.username}(SELF)` }{
                        item?.forFriend ? `Booked By (${item?.userId.username})` : ""
                        }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
