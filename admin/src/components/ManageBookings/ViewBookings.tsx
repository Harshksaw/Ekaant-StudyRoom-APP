import { getLibraryDataById } from "@/hooks/libraryData";
import { BASEURL } from "@/lib/utils";
import axios from "axios";
import React from "react";

import { Link } from "react-router-dom";



const ViewBookings = () => {
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
        console.log("🚀 ~ fetchBookings ~ response", response.data.data[0]);

        const resp = await axios.post(
          `${BASEURL}/api/v1/booking/getBookingByLibId`,
          {
            lib_id: response.data.data[0]._id,
          }
        );

        // console.log("🚀 ~ fetchBookings ~ resp", resp.data);

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
        <div className="">Loading...</div>
      ) : (
        <div className="flex-col">
          {bookings.map((booking: any) => (
            <Link

                  to={`/manage-library/view-library/${booking?._id}`}
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
                  {/* <strong>Amenities:</strong> {booking?.amenities?.join(", ")} */}
                </p>
                <p>
                  <strong>Price:</strong> Rs {booking?.Price}
                </p>
              </div>
            </Link>
          ))}

         
        </div>
      )}
    </div>
  );
};

export default ViewBookings;
