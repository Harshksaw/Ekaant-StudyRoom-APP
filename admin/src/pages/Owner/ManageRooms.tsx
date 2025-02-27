import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BASEURL } from "../../lib/utils";
import RoomDetails from "./RoomDetails";
import Loader from "@/components/Loader";

const CLOUDINARY = import.meta.env.VITE_CLOUDINARY as string;

const ManageRooms: React.FC = () => {
  const { lib_id } = useParams<{ lib_id: string }>();
  const [room, setRoom] = useState<any>(null);
  const [roomData, setRoomData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("userDetails");
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [showAadhaar, setShowAadhaar] = useState<boolean>(false);
  const [showPanCard, setShowPanCard] = useState<boolean>(false);

  const fetchLibrary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASEURL}/api/v1/library/getLibraryAdminById`, {
        id: lib_id,
      });
      if (res.data.success) {
        setRoom(res.data.data);
        setRoomData(res.data.data.rooms || []);
      }
    } catch (error) {
      console.error("Error fetching library:", error);
    } finally {
      setLoading(false);
    }
  }, [lib_id]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  const handleApprove = async (id: string, status: boolean) => {
    try {
      const res = await axios.post(`${BASEURL}/api/v1/library/updateStatus`, {
        id,
        status: !status,
      });
      if (res.data.success) {
        toast.success(`Library ${!status ? "approved" : "disapproved"} successfully.`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const transformUrl = useCallback(
    (url: string): string => {
      const [prefix, ...rest] = url.split("/admin");
      return rest.length ? `${CLOUDINARY}/admin${rest.join("")}` : url;
    },
    []
  );
  const UserDetails: React.FC = () => {
    const address = room ? JSON.parse(room.libraryOwner.address) : null;
    const aadhaarCard = room?.libraryOwner?.adhaarCardDetails?.aadharCardFile;
    const panCard = room?.libraryOwner?.panCardDetails?.panCardFile;
    const aadhaarUrl = aadhaarCard ? transformUrl(aadhaarCard) : "";
    const panUrl = panCard ? transformUrl(panCard) : "";
    console.log("Aadhaar URL:", aadhaarUrl);
    console.log("PAN URL:", panUrl);
  
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800">User Details</h2>
        {room ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-600">Username: {room.libraryOwner.username}</p>
              <p className="text-gray-600">Email: {room.libraryOwner.email}</p>
              <p className="text-gray-600">Phone Number: {room.libraryOwner.phoneNumber}</p>
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
                      {aadhaarUrl ? (
                        <img src={aadhaarUrl} alt="Aadhaar Card" className="w-72 h-60" />
                      ) : (
                        <p className="text-gray-500">No Aadhaar Card available.</p>
                      )}
                      <p className="text-gray-800 text-center m-4 font-bold">
                        {room.libraryOwner.adhaarCardDetails.adhaarNumber || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* PAN Card Section */}
              <div className="mt-6">
                <h2 className="text-lg font-semibold">PAN Card</h2>
                <div className="flex items-center mt-2 flex-col">
                  <button
                    onClick={() => setShowPanCard(!showPanCard)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {showPanCard ? "Hide PAN" : "Show PAN"}
                  </button>
                  {showPanCard && (
                    <div className="ml-4">
                      {panUrl ? (
                        <img src={panUrl} alt="PAN Card" className="w-72 h-60" />
                      ) : (
                        <p className="text-gray-500">No PAN Card available.</p>
                      )}
                      <p className="text-gray-600 text-center m-4 font-bold">
                        {room.libraryOwner.panCardDetails.panNumber || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {address && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold">Address</h2>
                <p className="text-gray-600">
                  {address.line1}, {address.line2}, {address.city}, {address.pincode}
                </p>
              </div>
            )}
          </>
        ) : (
          <div>
            <p className="text-gray-600">No user details available.</p>

          </div>
        )}
      </div>
    );
  };

  const LibraryDetails: React.FC = () => (
    <div className="flex h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800">Library Details</h2>
      {room ? (
        <div className="p-8 flex flex-col gap-4 h-full overflow-y-auto">
          <div className="flex flex-col items-center mb-6">
            <div className="flex w-full">
              <div className="w-1/2 pr-2">
                <img
                  src={room?.cardimage || "defaultCardImage.jpg"}
                  alt={room?.name || "Library Card Image"}
                  className="h-64 w-full object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-gray-500">This is the card image / thumbnail.</p>
              </div>
              <div className="w-1/2 pl-2 grid grid-cols-2 gap-2">
                {room?.images?.slice(0, 4).map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Room Image ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{room?.name || "Library Name"}</h1>
            <p className="text-lg text-gray-600">{room?.shortDescription || "No description available."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Long Description</h2>
              <p className="text-gray-600">{room?.longDescription || "No long description available."}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Address</h2>
              <p className="text-gray-600">{room?.address?.line1}</p>
              <p className="text-gray-600">{room?.address?.line2}</p>
              <p className="text-gray-600">
                {room?.address?.city}, {room?.address?.state} - {room?.address?.pincode}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Amenities</h2>
              <ul className="list-disc list-inside text-gray-600">
                {room?.amenities &&
                  Object.entries(room.amenities)
                    .filter(([_, value]) => value)
                    .map(([key]) => <li key={key}>{key.replace(/([A-Z])/g, " $1")}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Legal</h2>
              <p className="text-gray-600">
                {room?.legal || "No legal information available."}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Registration Fees</h2>
              <p className="text-gray-600">{room?.RegistrationFees}</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Status</h2>
              <p className={`font-bold ${room?.approved ? "text-green-600" : "text-red-600"}`}>
                {room?.approved ? "Approved" : "Pending"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No library details available.</p>
      )}
    </div>
  );

  const toggleRoomExpansion = (roomId: string) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader ease-linear rounded-full border-20 border-t-8 border-blue-800 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="p-8 flex h-full flex-col gap-4 overflow-y-auto">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-4 rounded-lg">
        {["userDetails", "libraryDetails", "roomDetails"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 mx-2 rounded-t-lg ${
              activeTab === tab ? "bg-blue-600 text-white border-b-4 border-blue-800" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "userDetails"
              ? "User Details"
              : tab === "libraryDetails"
              ? "Library Details"
              : "Room Details"}
          </button>
        ))}
      </div>
      {room && (
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={() => handleApprove(room.id, room.approved)}
            className={`px-4 py-2 rounded-lg ${
              room.approved ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {room.approved ? "Disapprove" : "Approve"}
          </button>
        </div>
      )}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === "userDetails" && <UserDetails />}
        {activeTab === "libraryDetails" && <LibraryDetails />}
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