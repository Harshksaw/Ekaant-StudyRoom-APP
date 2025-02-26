import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { BASEURL } from "../../lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

import RoomDetails from "./RoomDetails";


const ManageRooms = () => {
  const { lib_id } = useParams();
  const [room, setRoom] = React.useState<any>(null);
  console.log("🚀 ~ ManageRooms ~ room:", room)
  const [activeTab, setActiveTab] = useState<any>("userDetails");
  const [showAadhaar, setShowAadhaar] = useState<any>(false);
  const [showPanCard, setShowPanCard] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const [roomData, setRoomData] = useState<any>([]);
  const [expandedRoom, setExpandedRoom] = useState<any>(null); // Track expanded room
  // console.log("🚀 ~ ManageRooms ~ expandedRoom:", expandedRoom)
  // const [position, setPosition] = useState<[number, number] | null>(null);
  React.useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      const res = await axios.post(`${BASEURL}/api/v1/library/getLibraryById`, {
        id: lib_id,
      });
      if (res.data.success) {
        console.log("🚀 ~ fetchLibrary ~ res:", res.data.data);
        setRoom(res.data.data);
        setRoomData(res.data.data.rooms);
        // setPosition([res.data.data.location[0], res.data.data.location[1]]);
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [lib_id]);
  const handleApprove = async (id: string, status: boolean) => {
    const res = await axios.post(`${BASEURL}/api/v1/library/updateStatus`, {
      id,
      status: !status,
    });
    if (res.data.success) {
      console.log(res.data);
      toast.success(
        `Library ${!status ? "approved" : "disapproved"} successfully.`
      );
      window.location.reload();
      // setRoom(res.data.data);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-20 border-t-8 border-blue-800 h-32 w-32"></div>
      </div>
    );
  }

  // console.log(room.libraryOwner?.adhaarCardDetails.adhaarCardFile)
  const renderUserDetails = () => {
    const CLOUDINARY = import.meta.env.VITE_URL;
    // console.log("🚀 ~ renderUserDetails ~ CLOUDINARY:", CLOUDINARY);
    const transformUrl = (url: string) => {
      const newPrefix = CLOUDINARY;
      const urlParts = url.split("/admin");
      if (urlParts.length > 1) {
        return newPrefix + "/admin" + urlParts[1];
      }
      return url;
    };

    const address = room ? JSON.parse(room.libraryOwner.address) : null;
    const AddharCard = room?.libraryOwner?.adhaarCardDetails?.adhaarCardFile;
    const PanCard = room?.libraryOwner?.panCardDetails?.panCardFile;

    const AddharUrl = AddharCard ? transformUrl(AddharCard) : null;
    const PanUrl = PanCard ? transformUrl(PanCard) : null;

    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800">User Details</h2>
        {room ? (
          <>
            <div className="grid grid-cols-2 gap-4 ">
              <p className="text-gray-600">
                Username: {room.libraryOwner.username}
              </p>
              <p className="text-gray-600">Email: {room.libraryOwner.email}</p>
              <p className="text-gray-600">
                Phone Number: {room.libraryOwner.phoneNumber}
              </p>
              <p className="text-gray-600">
                Other Properties Length: {Object.keys(room.libraryOwner).length}
              </p>
            </div>

            <div className="flex gap-5 justify-around items-center">
              {/* Aadhaar Card Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Aadhaar Card</h2>
                <div className="flex items-center mt-2 flex-col">
                  <button
                    onClick={() => setShowAadhaar(!showAadhaar)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {showAadhaar ? "Hide Aadhaar" : "Show Aadhaar"}
                  </button>
                  {showAadhaar && (
                    <div className="ml-4">
                      <img
                        src={`${AddharUrl}`}
                        alt="Aadhaar Card"
                        className="w-72 h-60"
                      />
                      <p className="text-gray-800 text-center m-4 text-bold ">
                        {room?.libraryOwner?.adhaarCardDetails.adhaarNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* PAN Card Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold ">PAN Card</h2>
                <div className="flex items-center mt-2 flex-col ">
                  <button
                    onClick={() => setShowPanCard(!showPanCard)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {showPanCard ? "Hide PAN" : "Show PAN"}
                  </button>
                  {showPanCard && (
                    <div className="ml-4">
                      <img
                        src={`${PanUrl}`}
                        alt="PAN Card"
                        className="w-72 h-60"
                      />
                      <p className="text-gray-600 text-center m-4 text-bold">
                        {room?.libraryOwner?.panCardDetails?.panNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-lg font-semibold">Address</h2>
              <p className="text-gray-600">
                {address.line1}, {address.line2}, {address.city},{" "}
                {address.pincode}
              </p>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}
      </div>
    );
  };

  const renderLibraryDetails = () => (
    <div className="flex h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800">Library Details</h2>
      {room ? (
        <>
          <div className="p-8 flex flex-col gap-4 h-full overflow-y-auto">
            {/* Top Banner Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex w-full">
                <div className="w-1/2 pr-2">
                  <img
                    src={room?.cardimage || "defaultCardImage.jpg"} // Default image if `cardimage` is unavailable
                    alt={room?.name || "Library Card Image"}
                    className="h-64 w-full object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-gray-500">
                    This is the card image / thumbnail.
                  </p>
                </div>
                <div className="w-1/2 pl-2 grid grid-cols-2 gap-2">
                  {room?.images
                    ?.slice(0, 4)
                    .map(
                      (
                        image: string | undefined,
                        index: React.Key | Number
                      ) => (
                        <img
                          src={image}
                          alt={`Room Image ${Number(index) + 1}`}
                          className="h-32 w-full object-cover rounded-lg"
                        />
                      )
                    )}
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                {room?.name || "Library Name"}
              </h1>
              <p className="text-lg text-gray-600">
                {room?.shortDescription || "Short description of the library."}
              </p>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Long Description
                </h2>
                <p className="text-gray-600">
                  {room?.longDescription || "No long description available."}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Address</h2>
                <p className="text-gray-600">{room?.address?.line1}</p>
                <p className="text-gray-600">{room?.address?.line2}</p>
                <p className="text-gray-600">
                  {room?.address?.city}, {room?.address?.state} -{" "}
                  {room?.address?.pincode}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">Amenities</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {Object.entries(room?.amenities || {})
                    .filter(([_, value]) => value)
                    .map(([key]) => (
                      <li key={key}>{key.replace(/([A-Z])/g, " $1")}</li>
                    )) || (
                      <li className="text-2xl text-black">
                        No amenities listed.
                      </li>
                    )}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800">Legal</h2>
                <p className="text-gray-600">
                  {room?.legal || "No legal information available."}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Registration Fees
                </h2>
                <p className="text-gray-600">{room?.RegistrationFees}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Status</h2>
                <p
                  className={`font-bold ${room?.approved ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {room?.approved ? "Approved" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600">No library details available.</p>
      )}
    </div>
  );

  const toggleRoomExpansion = (roomId: string) => {
    console.log("🚀 ~ toggleRoomExpansion ~ roomId:", roomId)
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };
  // const renderRoomDetails = () => (
  //   <div className=" w-full h-full overflow-y-auto">
  //     <h2 className="text-xl font-bold text-gray-800">Room Details</h2>
  //     {roomData.length > 0 ? (
  //       roomData.map(
  //         (
  //           roomDetail: {
  //             _id: string;
  //             roomNo:
  //             | string
  //             | number
  //             | boolean
  //             | React.ReactElement<
  //               any,
  //               string | React.JSXElementConstructor<any>
  //             >
  //             | Iterable<React.ReactNode>
  //             | React.ReactPortal
  //             | null
  //             | undefined;
  //             seats: any[];
  //           },
  //           index: React.Key | null | undefined
  //         ) => (
  //           <div key={index} className="border-b border-gray-200 py-4">
  //             <div
  //               className="flex justify-between items-center cursor-pointer"
  //               onClick={() => toggleRoomExpansion(roomDetail._id)}
  //             >
  //               <p className="text-gray-600">Room No: {roomDetail.roomNo}</p>
  //               {expandedRoom === roomDetail._id ? (
  //                 <FaChevronUp />
  //               ) : (
  //                 <FaChevronDown />
  //               )}
  //             </div>
  //             {expandedRoom === roomDetail._id && (
  //               <div className="mt-2 ">
  //                 <div className="grid grid-cols-2 gap-4">
  //                   {roomDetail.seats.map(
  //                     (
  //                       seat: {
  //                         seatLabel:
  //                         | string
  //                         | number
  //                         | boolean
  //                         | React.ReactElement<
  //                           any,
  //                           string | React.JSXElementConstructor<any>
  //                         >
  //                         | Iterable<React.ReactNode>
  //                         | React.ReactPortal
  //                         | null
  //                         | undefined;
  //                         timeSlots: any[];
  //                       },
  //                       seatIndex: React.Key | null | undefined
  //                     ) => (
  //                       <div key={seatIndex} className="border p-2">
  //                         <p className="text-gray-600">
  //                           Seat: {seat.seatLabel}
  //                         </p>
  //                         {seat.timeSlots.map((slot: any, slotIndex: any) => (
  //                           <div key={slotIndex} className="ml-4">
  //                             <p className="text-gray-600">
  //                               Time Slot: {slot.from} - {slot.to}
  //                             </p>
  //                             <p className="text-gray-600">
  //                               Booked: {slot.booked ? "Yes" : "No"}
  //                             </p>
  //                             {slot.booked && (
  //                               <p className="text-gray-600">
  //                                 Booking End Date:{" "}
  //                                 {new Date(
  //                                   slot.bookingEndDate!
  //                                 ).toLocaleDateString()}
  //                               </p>
  //                             )}
  //                           </div>
  //                         ))}
  //                       </div>
  //                     )
  //                   )}
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         )
  //       )
  //     ) : (
  //       <p className="text-gray-600">No room details available.</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="p-8 flex h-full flex-col gap-4  overflow-y-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-4 rounded-lg">
        <button
          className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === "userDetails"
              ? "bg-blue-600 text-white border-b-4 border-blue-800"
              : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => setActiveTab("userDetails")}
        >
          User Details
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === "libraryDetails"
              ? "bg-blue-600 text-white border-b-4 border-blue-800"
              : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => setActiveTab("libraryDetails")}
        >
          Library Details
        </button>
        <button
          className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === "roomDetails"
              ? "bg-blue-600 text-white border-b-4 border-blue-800"
              : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => setActiveTab("roomDetails")}
        >
          Room Details
        </button>
      </div>

      {room && (
        <div className="col-span-2 flex justify-end gap-4">
          <button
            onClick={() => handleApprove(room.id, room?.approved)}
            className={`px-4 py-2 rounded-lg ${room.approved
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
              }`}
          >
            {room.approved ? "Disapprove" : "Approve"}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "userDetails" && renderUserDetails()}
        {activeTab === "libraryDetails" && renderLibraryDetails()}
        {activeTab === "roomDetails" && (
        <RoomDetails
        lib_id={lib_id}
          roomData={roomData}
          expandedRoom={expandedRoom}
          toggleRoomExpansion={toggleRoomExpansion}
        />
      )}
      </div>
    </div>
  );
};

export default ManageRooms;
