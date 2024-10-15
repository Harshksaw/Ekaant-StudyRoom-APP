import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../../lib/utils';
import axios from 'axios';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Room {
    name: string;
    _id: string;
    approved: boolean;
    shortDescription: string;
    longDescription?: string; // Assuming this is optional
    RegistrationFees: string;
    cardimage: string;
    address: {
        line1: string;
        line2?: string; // Assuming line2 is optional
        city: string;
        state: string;
        pincode: string;
    };
    amenities?: string[]; // Assuming this is optional
    legal?: string; // Assuming this is optional
    images?: string[]; // Assuming this is optional
}

const ManageRooms = () => {
    const { lib_id } = useParams();
    const [room, setRoom] = React.useState<Room | null>(null);



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


    // const amenitiesList = Object.entries(room?.amenities)
    // .filter(([key, value]) => value)
    // .map(([key]) => key);
    console.log(position)
    return (
        <div className='p-8 flex flex-col gap-4  h-full overflow-y-auto'>
            {/* Top Banner Image */}
            <div className='flex flex-col items-center mb-6'>
        <div className='flex w-full'>
          <div className='w-1/2 pr-2'>
            <img 
              src={`${room?.cardimage}`} 
              alt={room?.name} 
              className='h-64 w-full object-cover rounded-lg mb-4' 
            />
            <p className='text-sm text-gray-500 '>This is the card image / thumbnail.</p>
          </div>
          <div className='w-1/2 pl-2 grid grid-cols-2 gap-2'>
            {room?.images?.slice(0, 4).map((image, index) => (
              <img 
                key={index} 
                src={`${image}`} 
                alt={`Room Image ${index + 1}`} 
                className='h-32 w-full object-cover rounded-lg' 
              />
            ))}
          </div>
        </div>
        <h1 className='text-3xl font-bold text-gray-800'>{room?.name}</h1>
        <p className='text-lg text-gray-600'>{room?.shortDescription}</p>
      </div>
            
            {/* Main Content */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <h2 className='text-xl font-bold text-gray-800'>Long Description</h2>
                    <p className='text-gray-600'>{room?.longDescription || "No long description available."}</p>
                </div>
                <div>
                    <h2 className='text-xl font-bold text-gray-800'>Address</h2>
                    <p className='text-gray-600'>{room?.address?.line1}</p>
                    <p className='text-gray-600'>{room?.address?.line2}</p>
                    <p className='text-gray-600'>{room?.address?.city}, {room?.address?.state} - {room?.address?.pincode}</p>
                </div>
                <div>
                    <h2 className='text-xl font-bold text-gray-800'>Amenities</h2>
                    <ul className='list-disc list-inside text-gray-600'>
                        {room?.amenities?.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        )) || <li>No amenities listed.</li>}
                    </ul>

                    {/* <ul className='list-disc list-inside text-gray-600'>
            {amenitiesList.length > 0 ? (
              amenitiesList.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))
            ) : (
              <li>No amenities listed.</li>
            )}
          </ul> */}
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
                 {/* Map Section */}
      <div className='mt-6 h-60 w-96'>
        <h2 className='text-xl font-bold text-gray-800'>Location on Map</h2>
                        {
            position && (     <MapContainer     center={position}

                zoom={13} className='h-64 w-full rounded-lg'>
               <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
     
               />
               <Marker position={position}>
               <Popup>
     
                    {room?.name}
                   </Popup>
               </Marker>
             </MapContainer>)
                        }
   
      </div>

     

            {/* Approve Button */}
            <div className='flex justify-center mt-8'>
                <button 
                    onClick={() => handleApprove(room?._id || '', room?.approved || false)} 
                    className={`px-4 py-2 rounded-lg font-semibold text-white ${room?.approved ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {room?.approved ? 'Disapprove' : 'Approve'}
                </button>
            </div>
        </div>
    );
};

export default ManageRooms;
