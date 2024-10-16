import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../../lib/utils';
import axios from 'axios';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
interface Room {
    _id: string;
    libraryOwner: string;
    name: string;
    longDescription: string;
    shortDescription: string;
    thumbnail: string[];
    cardimage: string;
    images: string[];
    location: number[];
    address: {
      line1: string;
      line2: string;
      city: string;
      state: string;
      pincode: string;
    };
    deleted: boolean;
    amenities: {
      coldWater: boolean;
      wifi: boolean;
      ac: boolean;
      locker: boolean;
      separateWashroom: boolean;
      News: boolean;
      discussionArea: boolean;
      LunchArea: boolean;
      MovingChair: boolean;
      FloorMat: boolean;
      SeparateParking: boolean;
      CommonParking: boolean;
    };
    commingSoon: boolean;
    approved: boolean;
    legal: string;
    RegistrationFees: number;
    timeSlot: {
      from: string | null;
      to: string | null;
      price: number;
      _id: string;
    }[];
    rooms: {
      roomNo: number;
      seatLayout: {
        id: string;
        label: string;
      }[];
      _id: string;
      seatbooked: any[];
    }[];
    __v: number;
  }
const ManageRooms = () => {
    const { lib_id } = useParams();
    const [room, setRoom] = React.useState<Room | null>(null);
    const [activeTab, setActiveTab] = useState('userDetails');


    const [position, setPosition] = useState<[number, number] | null>(null);
    React.useEffect(() => {
        const fetchLibrary = async () => {
            const res = await axios.post(`${BASEURL}/api/v1/library/getLibraryById`, { id: lib_id });
            if (res.data.success) {
                console.log("🚀 ~ fetchLibrary ~ res:", res.data);
                setRoom(res.data.data);
                setPosition([res.data.data.location[0], res.data.data.location[1]]);
            }
        };
        fetchLibrary();
    }, [lib_id]);

    const handleApprove = async (id: string, status: boolean) => {
        const res = await axios.post(`${BASEURL}/api/v1/library/updateStatus`, { id, status: !status });
        if (res.data.success) {
            console.log(res.data);
            setRoom(res.data.data);
        }

    };
    const renderUserDetails = () => (
      <div>
        <h2 className='text-xl font-bold text-gray-800'>User Details</h2>
        {room ? (
          <>
            <p className='text-gray-600'>Username: {room.libraryOwner.username}</p>
            <p className='text-gray-600'>Email: {room.libraryOwner.email}</p>
            <p className='text-gray-600'>Phone Number: {room.libraryOwner.phoneNumber}</p>
            <p className='text-gray-600'>Address: {room.libraryOwner.address}</p>
          </>
        ) : (
          <p className='text-gray-600'>No user details available.</p>
        )}
      </div>
    );
    
    const renderLibraryDetails = () => (
      <div className='overflow-y-auto'>
        <h2 className='text-xl font-bold text-gray-800'>Library Details</h2>
        {room ? (
          <>
          <div className='p-8 flex flex-col gap-4 h-full overflow-y-auto'>
  {/* Top Banner Section */}
  <div className='flex flex-col items-center mb-6'>
    <div className='flex w-full'>
      <div className='w-1/2 pr-2'>
        <img
          src={room?.cardimage || "defaultCardImage.jpg"} // Default image if `cardimage` is unavailable
          alt={room?.name || "Library Card Image"}
          className='h-64 w-full object-cover rounded-lg mb-4'
        />
        <p className='text-sm text-gray-500'>This is the card image / thumbnail.</p>
      </div>
      <div className='w-1/2 pl-2 grid grid-cols-2 gap-2'>
        {room?.images?.slice(0, 4).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Room Image ${index + 1}`}
            className='h-32 w-full object-cover rounded-lg'
          />
        ))}
      </div>
    </div>
    <h1 className='text-3xl font-bold text-gray-800'>{room?.name || "Library Name"}</h1>
    <p className='text-lg text-gray-600'>{room?.shortDescription || "Short description of the library."}</p>
  </div>

  {/* Main Content Section */}
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <div>
      <h2 className='text-xl font-bold text-gray-800'>Long Description</h2>
      <p className='text-gray-600'>{room?.longDescription || "No long description available."}</p>
    </div>
    <div>
      <h2 className='text-xl font-bold text-gray-800'>Address</h2>
      <p className='text-gray-600'>{room?.address?.line1}</p>
      <p className='text-gray-600'>{room?.address?.line2}</p>
      <p className='text-gray-600'>
        {room?.address?.city}, {room?.address?.state} - {room?.address?.pincode}
      </p>
    </div>

    <div>
      <h2 className='text-xl font-bold text-gray-800'>Amenities</h2>
      <ul className='list-disc list-inside text-gray-600'>
      {Object.entries(room?.amenities || {})
          .filter(([_, value]) => value)
          .map(([key]) => (
            <li key={key}>{key.replace(/([A-Z])/g, ' $1')}</li>
          )) || <li className='text-2xl text-black'>No amenities listed.</li>}
      </ul>
    </div>

    <div>
      <h2 className='text-xl font-bold text-gray-800'>Legal</h2>
      <p className='text-gray-600'>{room?.legal || "No legal information available."}</p>
    </div>
    <div>
      <h2 className='text-xl font-bold text-gray-800'>Registration Fees</h2>
      <p className='text-gray-600'>{room?.RegistrationFees}</p>
    </div>
    <div>
      <h2 className='text-xl font-bold text-gray-800'>Status</h2>
      <p className={`font-bold ${room?.approved ? 'text-green-600' : 'text-red-600'}`}>
        {room?.approved ? 'Approved' : 'Pending'}
      </p>
    </div>
  </div>

</div>
          </>
        ) : (
          <p className='text-gray-600'>No library details available.</p>
        )}
      </div>
    );
    
    const renderRoomDetails = () => (
      <div>
        <h2 className='text-xl font-bold text-gray-800'>Room Details</h2>
        {room?.rooms.length ? (
          room.rooms.map((roomDetail, index) => (
            <div key={index}>
              <p className='text-gray-600'>Room No: {roomDetail.roomNo}</p>
              <p className='text-gray-600'>Seat Layout: {roomDetail.seatLayout.map(seat => seat.label).join(', ')}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-600'>No room details available.</p>
        )}
      </div>
    );
    
    

    return (
      <div className='p-8 flex flex-col gap-4 h-full '>
      {/* Tabs */}
      <div className='flex justify-center mb-4 rounded-lg'>
  <button
    className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === 'userDetails' ? 'bg-blue-600 text-white border-b-4 border-blue-800' : 'bg-gray-200 text-gray-800'}`}
    onClick={() => setActiveTab('userDetails')}
  >
    User Details
  </button>
  <button
    className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === 'libraryDetails' ? 'bg-blue-600 text-white border-b-4 border-blue-800' : 'bg-gray-200 text-gray-800'}`}
    onClick={() => setActiveTab('libraryDetails')}
  >
    Library Details
  </button>
  <button
    className={`px-4 py-2 mx-2 rounded-t-lg ${activeTab === 'roomDetails' ? 'bg-blue-600 text-white border-b-4 border-blue-800' : 'bg-gray-200 text-gray-800'}`}
    onClick={() => setActiveTab('roomDetails')}
  >
    Room Details
  </button>
</div>


      {/* Content */}
      <div className='bg-white p-6 rounded-lg shadow-md'>
            {activeTab === 'userDetails' && renderUserDetails()}
            {activeTab === 'libraryDetails' && renderLibraryDetails()}
            {activeTab === 'roomDetails' && renderRoomDetails()}
        </div>
    </div>     
    );
};

export default ManageRooms;
